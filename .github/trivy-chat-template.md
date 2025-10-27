<h2>🔒 Trivy Security Scan Results</h2>

<p>
  <a href="{{WORKFLOW_URL}}">View Workflow</a> · Run #{{RUN_ID}}
</p>

<p><strong>Scan Summary:</strong></p>
<ul>
  <li>Severity Filter: <code>CRITICAL</code>, <code>HIGH</code></li>
  <li>Total Vulnerabilities: <strong>{{VULN_COUNT}}</strong></li>
  <li>Critical: <strong>{{CRITICAL_COUNT}}</strong></li>
  <li>High: <strong>{{HIGH_COUNT}}</strong></li>
  <li>Scan Time: <strong>{{SCAN_TIME}}</strong></li>
</ul>

<hr/>

{{#if HAS_VULNERABILITIES}}

<h3>📋 Vulnerability Details</h3>
{{{VULNERABILITY_TABLE}}}

<h3>🔧 Recommendations</h3>
<ol>
  <li>Handle <strong>CRITICAL</strong> vulnerabilities immediately.</li>
  <li>Update affected packages to fixed versions.</li>
  <li>Apply patches or workarounds if available.</li>
</ol>

{{else}}

<h3>✅ No vulnerabilities found</h3>
<p>All dependencies look good and up to date.</p>

{{/if}}

<hr/>

<p><sub>Automated by Trivy Scanner</sub></p>
