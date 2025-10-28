# 🧪 Unit Test Workflow Documentation

## Overview

This GitHub Actions workflow automatically runs Python unit tests on pull requests and provides detailed reporting with an 80% pass rate requirement.

## Features

-  ✅ **Automated Testing**: Runs on every PR and push to main branches
-  📊 **Detailed Reporting**: Shows pass/fail counts, duration, and individual test results
-  🎯 **Quality Gate**: Requires 80% pass rate to succeed
-  💬 **PR Comments**: Automatically posts test results as PR comments
-  📈 **Coverage Tracking**: Includes code coverage analysis
-  🔄 **Smart Updates**: Updates existing PR comments instead of creating duplicates

## Workflow Triggers

The workflow runs when:

1. **Pull Requests** targeting:

   -  `main`
   -  `master`
   -  `develop`
   -  `demo/*` branches

2. **Push events** to:

   -  `main`
   -  `master`
   -  `develop`

3. **Modified files**:
   -  Any `.py` file
   -  `requirements.txt`
   -  Files in `tests/` directory
   -  The workflow file itself

## Workflow Steps

### 1. Setup Environment

-  Checks out code
-  Sets up Python 3.10
-  Installs dependencies (pip, pytest, pytest-json-report, pytest-cov)
-  Installs project dependencies from `requirements.txt`

### 2. Run Tests

-  Executes pytest with JSON reporting
-  Generates coverage report
-  Captures test output

### 3. Parse Results

-  Extracts test statistics (total, passed, failed, skipped, errors)
-  Calculates pass rate percentage
-  Determines if 80% threshold is met

### 4. Generate Report

-  Creates detailed test table with individual test results
-  Formats test names, status, and duration

### 5. Post PR Comment

-  Uses the helper script (`unittest-comment.js`)
-  Applies the comment template
-  Posts or updates PR comment with results

### 6. Upload Artifacts

-  Saves test results, coverage data, and reports
-  Available for 30 days

### 7. Check Threshold

-  ✅ **Pass**: If pass rate ≥ 80%
-  ❌ **Fail**: If pass rate < 80%

## Pass Rate Calculation

```
Pass Rate = (Passed Tests / Total Tests) × 100
```

**Example:**

-  Total Tests: 10
-  Passed: 8
-  Failed: 2
-  Pass Rate: 80% → ✅ PASSED

## PR Comment Template

The workflow posts a comment on PRs with:

-  **Summary Section**: Overall statistics and pass rate
-  **Test Details Table**: Individual test results with status and duration
-  **Pass Rate Analysis**: Visual comparison with threshold
-  **Verdict**: Clear pass/fail status
-  **Action Items**: Guidance on what to do next

### Template Variables

| Variable               | Description                 |
| ---------------------- | --------------------------- |
| `{{TOTAL_TESTS}}`      | Total number of tests       |
| `{{PASSED_TESTS}}`     | Number of passed tests      |
| `{{FAILED_TESTS}}`     | Number of failed tests      |
| `{{SKIPPED_TESTS}}`    | Number of skipped tests     |
| `{{ERROR_TESTS}}`      | Number of tests with errors |
| `{{PASS_RATE}}`        | Pass rate percentage        |
| `{{DURATION}}`         | Total test duration         |
| `{{STATUS_EMOJI}}`     | ✅ or ❌ based on result    |
| `{{STATUS_TEXT}}`      | PASSED or FAILED            |
| `{{THRESHOLD_STATUS}}` | Threshold met status        |
| `{{TEST_DETAILS}}`     | Detailed test table         |
| `{{SCAN_TIME}}`        | Test execution time         |
| `{{RUN_ID}}`           | GitHub Actions run ID       |
| `{{WORKFLOW_URL}}`     | Link to workflow run        |

## File Structure

```
.github/
├── workflows/
│   └── unit_test_python.yml          # Main workflow file
├── scripts/
│   └── unittest-comment.js            # Comment posting script
└── unittest-comment-template.md       # PR comment template
```

## Customization

### Changing the Pass Rate Threshold

Edit the workflow file at line ~70:

```yaml
# Change 80 to your desired threshold
if (( $(echo "$PASS_RATE >= 80" | bc -l) )); then
```

And update the template to reflect the new threshold.

### Modifying the Comment Template

Edit `.github/unittest-comment-template.md` to customize:

-  Report format
-  Emoji usage
-  Section order
-  Additional information

### Adding More Test Frameworks

To support additional test frameworks:

1. Install the framework in the dependency step
2. Update the test execution command
3. Modify the parsing logic to read results

## Troubleshooting

### Tests not running

**Check:**

-  Python version compatibility
-  All dependencies in `requirements.txt`
-  Test file naming (must start with `test_`)
-  Test directory structure

### PR comment not posting

**Check:**

-  Workflow has `pull-requests: write` permission
-  Event is a pull request (not a push)
-  Template file exists at correct path
-  GitHub token has proper scopes

### Pass rate calculation incorrect

**Check:**

-  JSON report is being generated
-  `jq` command is parsing correctly
-  No syntax errors in calculation logic

## Example Output

### Passing Tests (≥80%)

```
🧪 Unit Test Results
Status: ✅ PASSED
Total Tests: 10
Passed: 9
Failed: 1
Pass Rate: 90.00%
Threshold: ✅ Met (≥80%)
```

### Failing Tests (<80%)

```
🧪 Unit Test Results
Status: ❌ FAILED
Total Tests: 10
Passed: 7
Failed: 3
Pass Rate: 70.00%
Threshold: ❌ Not Met (≥80% required)
```

## Best Practices

1. **Write Good Tests**: Ensure tests are meaningful and cover critical functionality
2. **Keep Tests Fast**: Optimize slow tests to improve CI/CD speed
3. **Fix Flaky Tests**: Address intermittent failures immediately
4. **Maintain Coverage**: Aim for high code coverage along with high pass rate
5. **Review Failures**: Don't merge PRs with failing tests

## Dependencies

-  **pytest**: Test framework
-  **pytest-json-report**: JSON output for parsing
-  **pytest-cov**: Coverage reporting
-  **jq**: JSON parsing in bash
-  **bc**: Floating-point calculations

## Support

For issues or questions:

1. Check workflow logs in GitHub Actions
2. Review test output artifacts
3. Verify template syntax
4. Check script error messages

## Version History

-  **v1.0**: Initial release with 80% threshold and PR comments
