const fs = require('fs');

/**
 * Handle conditional blocks in template ({{#if}}/{{else}}/{{/if}})
 */
function handleConditionals(template, condition) {
  // Match {{#if CONDITION}}...{{else}}...{{/if}} or {{#if CONDITION}}...{{/if}}
  const ifElseRegex = /{{#if\s+\w+}}([\s\S]*?)(?:{{else}}([\s\S]*?))?{{\/if}}/g;

  return template.replace(ifElseRegex, (match, ifContent, elseContent) => {
    if (condition) {
      return ifContent || '';
    } else {
      return elseContent || '';
    }
  });
}

/**
 * Replace template placeholders
 */
function replaceTemplatePlaceholders(template, replacements) {
  let result = template;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(new RegExp(key, 'g'), value);
  }
  return result;
}

module.exports = async ({ github, context, core }) => {
  try {
    // Read template
    const template = fs.readFileSync('.github/unittest-comment-template.md', 'utf8');

    // Read test results
    let testResults = {};
    let testDetails = '';

    try {
      testResults = JSON.parse(fs.readFileSync('test-results.json', 'utf8'));
    } catch (error) {
      console.log('⚠️ Could not read test-results.json:', error.message);
    }

    try {
      testDetails = fs.readFileSync('test-details.md', 'utf8');
    } catch (error) {
      console.log('⚠️ Could not read test-details.md:', error.message);
      testDetails = '_No test details available_';
    }

    // Parse test statistics
    const summary = testResults.summary || {};
    const total = summary.total || 0;
    const passed = summary.passed || 0;
    const failed = summary.failed || 0;
    const skipped = summary.skipped || 0;
    const errors = summary.error || 0;
    const duration = testResults.duration || 0;

    // Calculate pass rate
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : '0.00';
    const meetsThreshold = parseFloat(passRate) >= 80;

    // Handle conditional sections
    let commentBody = handleConditionals(template, meetsThreshold);

    // Replace placeholders
    commentBody = replaceTemplatePlaceholders(commentBody, {
      '{{TOTAL_TESTS}}': total,
      '{{PASSED_TESTS}}': passed,
      '{{FAILED_TESTS}}': failed,
      '{{SKIPPED_TESTS}}': skipped,
      '{{ERROR_TESTS}}': errors,
      '{{PASS_RATE}}': passRate,
      '{{DURATION}}': duration.toFixed(2),
      '{{STATUS_EMOJI}}': meetsThreshold ? '✅' : '❌',
      '{{STATUS_TEXT}}': meetsThreshold ? 'PASSED' : 'FAILED',
      '{{THRESHOLD_STATUS}}': meetsThreshold ? '✅ Met (≥80%)' : '❌ Not Met (≥80% required)',
      '{{TEST_DETAILS}}': testDetails,
      '{{RUN_ID}}': context.runId,
      '{{WORKFLOW_URL}}': `https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`,
      '{{SCAN_TIME}}': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    });

    // Find existing comment
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    });

    const botComment = comments.find(c =>
      c.user.type === 'Bot' && c.body.includes('🧪 Unit Test Results')
    );

    // Update or create comment
    if (botComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody
      });
      console.log('✅ Updated existing comment');
    } else {
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: commentBody
      });
      console.log('✅ Created new comment');
    }

    // Set outputs
    core.setOutput('total', total);
    core.setOutput('passed', passed);
    core.setOutput('failed', failed);
    core.setOutput('pass_rate', passRate);
    core.setOutput('meets_threshold', meetsThreshold);

    return {
      total,
      passed,
      failed,
      skipped,
      errors,
      passRate,
      meetsThreshold,
      commentBody
    };

  } catch (error) {
    console.error('❌ Error:', error);
    core.setFailed(error.message);
    throw error;
  }
};

