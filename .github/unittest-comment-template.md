## 🧪 Unit Test Results

**Test Summary:**

-  {{STATUS_EMOJI}} **Status:** `{{STATUS_TEXT}}`
-  📊 **Total Tests:** `{{TOTAL_TESTS}}`
-  ✅ **Passed:** `{{PASSED_TESTS}}`
-  ❌ **Failed:** `{{FAILED_TESTS}}`
-  ⏭️ **Skipped:** `{{SKIPPED_TESTS}}`
-  ⚠️ **Errors:** `{{ERROR_TESTS}}`
-  📈 **Pass Rate:** `{{PASS_RATE}}%`
-  🎯 **Threshold:** {{THRESHOLD_STATUS}}
-  ⏱️ **Duration:** `{{DURATION}}s`
-  📅 **Test Time:** `{{SCAN_TIME}}`

---

### 📋 Test Details

{{TEST_DETAILS}}

---

### 📊 Pass Rate Analysis

```
Pass Rate: {{PASS_RATE}}%
Required:  80.00%
Status:    {{STATUS_TEXT}}
```

**Verdict:**
{{#if MEETS_THRESHOLD}}
✅ **All checks passed!** Your code meets the quality threshold.

### 💡 Next Steps

✨ All tests are passing! Great job!
{{else}}
❌ **Quality check failed.** The pass rate must be at least 80% to proceed.

**Action Required:**

-  Review and fix failing tests
-  Ensure all tests pass before merging
-  Current pass rate: {{PASS_RATE}}% (need ≥80%)

### 💡 Next Steps

1. 🔍 Review the failed test cases above
2. 🐛 Fix the issues causing test failures
3. ✅ Re-run tests to verify fixes
4. 🔄 Push changes to update this PR
   {{/if}}

---

<sub>🤖 Automated by GitHub Actions | Run #{{RUN_ID}} | [View Workflow]({{WORKFLOW_URL}})</sub>
