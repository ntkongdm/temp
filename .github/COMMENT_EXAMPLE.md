# 📝 Unit Test PR Comment Example

This document shows examples of what the automated PR comments will look like.

---

## ✅ Example: All Tests Passing (100% Pass Rate)

---

## 🧪 Unit Test Results

**Test Summary:**

-  ✅ **Status:** `PASSED`
-  📊 **Total Tests:** `5`
-  ✅ **Passed:** `5`
-  ❌ **Failed:** `0`
-  ⏭️ **Skipped:** `0`
-  ⚠️ **Errors:** `0`
-  📈 **Pass Rate:** `100.00%`
-  🎯 **Threshold:** ✅ Met (≥80%)
-  ⏱️ **Duration:** `0.17s`
-  📅 **Test Time:** `28/10/2025, 10:30:45`

---

### 📋 Test Details

| Test Name                                                       | Status    | Duration |
| --------------------------------------------------------------- | --------- | -------- |
| `tests/test_calculator.py::TestCalculator::test_add`            | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_divide`         | ✅ Passed | 0.000s   |
| `tests/test_calculator.py::TestCalculator::test_divide_by_zero` | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_multiply`       | ✅ Passed | 0.000s   |
| `tests/test_calculator.py::TestCalculator::test_subtract`       | ✅ Passed | 0.001s   |

---

### 📊 Pass Rate Analysis

```
Pass Rate: 100.00%
Required:  80.00%
Status:    PASSED
```

**Verdict:**
✅ **All checks passed!** Your code meets the quality threshold.

### 💡 Next Steps

✨ All tests are passing! Great job!

---

<sub>🤖 Automated by GitHub Actions | Run #12345678 | [View Workflow](https://github.com/owner/repo/actions/runs/12345678)</sub>

---

## ❌ Example: Some Tests Failing (70% Pass Rate)

---

## 🧪 Unit Test Results

**Test Summary:**

-  ❌ **Status:** `FAILED`
-  📊 **Total Tests:** `10`
-  ✅ **Passed:** `7`
-  ❌ **Failed:** `3`
-  ⏭️ **Skipped:** `0`
-  ⚠️ **Errors:** `0`
-  📈 **Pass Rate:** `70.00%`
-  🎯 **Threshold:** ❌ Not Met (≥80% required)
-  ⏱️ **Duration:** `0.45s`
-  📅 **Test Time:** `28/10/2025, 10:30:45`

---

### 📋 Test Details

| Test Name                                                       | Status    | Duration |
| --------------------------------------------------------------- | --------- | -------- |
| `tests/test_calculator.py::TestCalculator::test_add`            | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_subtract`       | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_multiply`       | ❌ Failed | 0.002s   |
| `tests/test_calculator.py::TestCalculator::test_divide`         | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_divide_by_zero` | ✅ Passed | 0.001s   |
| `tests/test_advanced.py::TestAdvanced::test_power`              | ❌ Failed | 0.003s   |
| `tests/test_advanced.py::TestAdvanced::test_sqrt`               | ✅ Passed | 0.001s   |
| `tests/test_advanced.py::TestAdvanced::test_modulo`             | ✅ Passed | 0.001s   |
| `tests/test_advanced.py::TestAdvanced::test_abs`                | ❌ Failed | 0.002s   |
| `tests/test_advanced.py::TestAdvanced::test_floor`              | ✅ Passed | 0.001s   |

---

### 📊 Pass Rate Analysis

```
Pass Rate: 70.00%
Required:  80.00%
Status:    FAILED
```

**Verdict:**
❌ **Quality check failed.** The pass rate must be at least 80% to proceed.

**Action Required:**

-  Review and fix failing tests
-  Ensure all tests pass before merging
-  Current pass rate: 70.00% (need ≥80%)

### 💡 Next Steps

1. 🔍 Review the failed test cases above
2. 🐛 Fix the issues causing test failures
3. ✅ Re-run tests to verify fixes
4. 🔄 Push changes to update this PR

---

<sub>🤖 Automated by GitHub Actions | Run #12345679 | [View Workflow](https://github.com/owner/repo/actions/runs/12345679)</sub>

---

## 🎯 Example: Exactly at Threshold (80% Pass Rate)

---

## 🧪 Unit Test Results

**Test Summary:**

-  ✅ **Status:** `PASSED`
-  📊 **Total Tests:** `10`
-  ✅ **Passed:** `8`
-  ❌ **Failed:** `2`
-  ⏭️ **Skipped:** `0`
-  ⚠️ **Errors:** `0`
-  📈 **Pass Rate:** `80.00%`
-  🎯 **Threshold:** ✅ Met (≥80%)
-  ⏱️ **Duration:** `0.35s`
-  📅 **Test Time:** `28/10/2025, 10:30:45`

---

### 📋 Test Details

| Test Name                                                       | Status    | Duration |
| --------------------------------------------------------------- | --------- | -------- |
| `tests/test_calculator.py::TestCalculator::test_add`            | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_subtract`       | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_multiply`       | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_divide`         | ✅ Passed | 0.001s   |
| `tests/test_calculator.py::TestCalculator::test_divide_by_zero` | ✅ Passed | 0.001s   |
| `tests/test_advanced.py::TestAdvanced::test_power`              | ❌ Failed | 0.003s   |
| `tests/test_advanced.py::TestAdvanced::test_sqrt`               | ✅ Passed | 0.001s   |
| `tests/test_advanced.py::TestAdvanced::test_modulo`             | ✅ Passed | 0.001s   |
| `tests/test_advanced.py::TestAdvanced::test_abs`                | ❌ Failed | 0.002s   |
| `tests/test_advanced.py::TestAdvanced::test_floor`              | ✅ Passed | 0.001s   |

---

### 📊 Pass Rate Analysis

```
Pass Rate: 80.00%
Required:  80.00%
Status:    PASSED
```

**Verdict:**
✅ **All checks passed!** Your code meets the quality threshold.

### 💡 Next Steps

✨ All tests are passing! Great job!

---

<sub>🤖 Automated by GitHub Actions | Run #12345680 | [View Workflow](https://github.com/owner/repo/actions/runs/12345680)</sub>

---

## 📝 Notes

-  The comment is **automatically updated** when you push new commits
-  Only **one comment** is created per PR (not multiple)
-  The workflow **fails** if pass rate < 80%, preventing merge
-  Test details show **individual test results** with timing
-  Links to **workflow run** for detailed logs
