# 🚀 Quick Reference - Unit Test Workflow

## 📝 Cheat Sheet

### Pass Rate Formula

```
Pass Rate = (Passed Tests / Total Tests) × 100
```

### Quality Gate

```
✅ Pass Rate ≥ 80% → SUCCESS
❌ Pass Rate < 80% → FAILED
```

---

## 🔧 Common Tasks

### Change Pass Rate Threshold

**File:** `.github/workflows/unit_test_python.yml`

**Find and replace `80` with your desired threshold:**

```yaml
# Line ~70
if (( $(echo "$PASS_RATE >= 80" | bc -l) )); then

# Line ~189
echo "::error::Test pass rate ... below the required threshold of 80%"
```

**Also update:** `.github/unittest-comment-template.md`

---

### Run Tests Locally

```bash
# Basic run
pytest tests/ -v

# With JSON report (like workflow)
pytest tests/ \
  --json-report \
  --json-report-file=test-results.json \
  --cov=. \
  --cov-report=json:coverage.json \
  -v

# Check results
cat test-results.json | jq '.summary'
```

---

### Validate Workflow Syntax

```bash
# Check YAML syntax
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/unit_test_python.yml'))"

# Check JavaScript syntax
node -c .github/scripts/unittest-comment.js
```

---

### Debug PR Comments

1. Check workflow logs in GitHub Actions
2. Verify permissions: `pull-requests: write`
3. Confirm it's a PR event (not push)
4. Check template file exists
5. Verify test results JSON is valid

---

## 📊 Test Result Status

| Symbol | Status  | Description                |
| ------ | ------- | -------------------------- |
| ✅     | Passed  | Test executed successfully |
| ❌     | Failed  | Test failed with error     |
| ⏭️     | Skipped | Test was skipped           |
| ⚠️     | Error   | Test had runtime error     |

---

## 🔍 File Locations

```
.github/
├── workflows/
│   └── unit_test_python.yml          # Main workflow
├── scripts/
│   └── unittest-comment.js            # Comment handler
├── unittest-comment-template.md       # Comment template
├── UNITTEST_WORKFLOW.md               # Full documentation
├── COMMENT_EXAMPLE.md                 # Visual examples
├── IMPLEMENTATION_SUMMARY.md          # Implementation details
└── QUICK_REFERENCE.md                 # This file
```

---

## 🎯 Workflow Triggers

### Pull Requests

-  Branches: `main`, `master`, `develop`, `demo/*`
-  Changed files: `*.py`, `requirements.txt`, `tests/**`

### Push Events

-  Branches: `main`, `master`, `develop`
-  Changed files: `*.py`, `requirements.txt`, `tests/**`

---

## 💬 PR Comment Sections

1. **Summary** - Overall statistics
2. **Test Details** - Per-test breakdown
3. **Pass Rate Analysis** - Visual comparison
4. **Verdict** - Clear pass/fail status
5. **Next Steps** - Action items

---

## 🛠️ Customization Points

### Modify Comment Template

**File:** `.github/unittest-comment-template.md`

-  Change emoji usage
-  Modify section order
-  Add/remove information

### Modify Comment Script

**File:** `.github/scripts/unittest-comment.js`

-  Change conditional logic
-  Modify data parsing
-  Add custom formatting

### Modify Workflow

**File:** `.github/workflows/unit_test_python.yml`

-  Change Python version
-  Add/remove dependencies
-  Modify test commands
-  Change artifact retention

---

## 📈 Common Pass Rates

| Tests | Passed | Pass Rate | Status  |
| ----- | ------ | --------- | ------- |
| 5     | 5      | 100%      | ✅ PASS |
| 10    | 9      | 90%       | ✅ PASS |
| 10    | 8      | 80%       | ✅ PASS |
| 10    | 7      | 70%       | ❌ FAIL |
| 20    | 16     | 80%       | ✅ PASS |
| 20    | 15     | 75%       | ❌ FAIL |

---

## 🚨 Troubleshooting

### Issue: Workflow not triggering

-  Check file paths match trigger conditions
-  Verify branch names
-  Check workflow is enabled

### Issue: Tests failing locally work in CI

-  Check Python version consistency
-  Verify all dependencies installed
-  Check environment variables

### Issue: Comment not updating

-  Verify PR event (not push)
-  Check bot comment detection logic
-  Verify GitHub token permissions

---

## 📞 Quick Links

-  **Full Docs:** `.github/UNITTEST_WORKFLOW.md`
-  **Examples:** `.github/COMMENT_EXAMPLE.md`
-  **Summary:** `.github/IMPLEMENTATION_SUMMARY.md`
-  **Main README:** `README.md`

---

## ⚡ Quick Commands

```bash
# Run tests
pytest tests/ -v

# Generate coverage
pytest tests/ --cov=. --cov-report=term

# Check pass rate
python3 << 'EOF'
import json
with open('test-results.json') as f:
    d = json.load(f)['summary']
    print(f"{d['passed']}/{d['total']} = {d['passed']/d['total']*100:.2f}%")
EOF

# Validate files
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/unit_test_python.yml'))"
node -c .github/scripts/unittest-comment.js
```

---

**Last Updated:** October 28, 2025  
**Version:** 1.0
