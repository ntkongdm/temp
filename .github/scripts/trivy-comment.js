const fs = require('fs');
const https = require('https');
const {
  parseVulnerabilities,
  generateVulnerabilityTable,
  replaceTemplatePlaceholders,
  handleConditionals
} = require('./trivy-helpers.js');

module.exports = async ({ github, context }) => {
  try {
    // Đọc files
    const template = fs.readFileSync('.github/trivy-comment-template.md', 'utf8');
    const jsonResults = JSON.parse(fs.readFileSync('trivy-results.json', 'utf8'));
    const rawOutput = fs.readFileSync('trivy-results.txt', 'utf8');

    // Parse data
    const { vulnCount, criticalCount, highCount, vulnerabilities } = parseVulnerabilities(jsonResults);
    const vulnerabilityTable = generateVulnerabilityTable(vulnerabilities);

    // Build comment
    let commentBody = handleConditionals(template, vulnCount > 0);
    commentBody = replaceTemplatePlaceholders(commentBody, {
      '{{VULN_COUNT}}': vulnCount,
      '{{CRITICAL_COUNT}}': criticalCount,
      '{{HIGH_COUNT}}': highCount,
      '{{SCAN_TIME}}': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      '{{VULNERABILITY_TABLE}}': vulnerabilityTable,
      '{{RAW_OUTPUT}}': rawOutput,
      '{{RUN_ID}}': context.runId,
      '{{WORKFLOW_URL}}': `https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`
    });

    // Post/update comment
    const { data: comments } = await github.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
    });

    const botComment = comments.find(c =>
      c.user.type === 'Bot' && c.body.includes('Trivy Security Scan Results')
    );

    if (botComment) {
      await github.rest.issues.updateComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: botComment.id,
        body: commentBody
      });
    } else {
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: commentBody
      });
    }

    const chatBody = replaceTemplatePlaceholders(fs.readFileSync('.github/trivy-chat-template.md', 'utf8'), {
      '{{VULN_COUNT}}': vulnCount,
      '{{CRITICAL_COUNT}}': criticalCount,
      '{{HIGH_COUNT}}': highCount,
      '{{SCAN_TIME}}': new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      '{{VULNERABILITY_TABLE}}': vulnerabilityTable,
      '{{RAW_OUTPUT}}': rawOutput,
      '{{RUN_ID}}': context.runId,
      '{{WORKFLOW_URL}}': `https://github.com/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`
    });

    const webhook = process.env.WEBHOOK_URL;
    if (webhook) {
      const payload = chatBody; // raw string

      await new Promise((resolve, reject) => {
        const req = https.request(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' }, // raw body
        }, res => {
          res.on('data', () => { }); // ignore
          res.on('end', resolve);
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
      });
    }

    return { vulnCount, criticalCount, highCount, hasVulnerabilities: vulnCount > 0, commentBody };

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
};