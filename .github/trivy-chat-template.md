## 🔒 Trivy Security Scan Results

**Scan Summary:**

-  🎯 Severity Filter: `CRITICAL`, `HIGH`
-  📦 Total Vulnerabilities: `{{VULN_COUNT}}`
-  ⚠️ Critical: `{{CRITICAL_COUNT}}`
-  🔶 High: `{{HIGH_COUNT}}`
-  📅 Scan Time: `{{SCAN_TIME}}`

---

{{#if HAS_VULNERABILITIES}}

### 📋 Vulnerability Details

{{VULNERABILITY_TABLE}}

### 🔧 Recommendations

1. Review all CRITICAL vulnerabilities immediately
2. Update affected packages to fixed versions
3. Check for available patches or workarounds

{{else}}

### ✅ No vulnerabilities found!

Your code is looking good! All dependencies are up to date.
{{/if}}

---

<sub>🤖 Automated by Trivy Scanner | Run #{{RUN_ID}} | [View Workflow]({{WORKFLOW_URL}})</sub>
