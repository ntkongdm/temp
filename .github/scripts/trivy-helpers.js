/**
 * Parse Trivy JSON results
 */
function parseVulnerabilities(jsonResults) {
  let vulnCount = 0;
  let criticalCount = 0;
  let highCount = 0;
  let vulnerabilities = [];

  jsonResults.Results?.forEach(result => {
    result.Vulnerabilities?.forEach(vuln => {
      vulnCount++;
      if (vuln.Severity === 'CRITICAL') criticalCount++;
      if (vuln.Severity === 'HIGH') highCount++;
      vulnerabilities.push(vuln);
    });
  });

  return { vulnCount, criticalCount, highCount, vulnerabilities };
}

/**
 * Generate markdown table from vulnerabilities
 */
function generateVulnerabilityTable(vulnerabilities) {
  if (vulnerabilities.length === 0) return '';

  const rows = vulnerabilities.map(vuln => {
    const severity = vuln.Severity === 'CRITICAL' ? '🔴 CRITICAL' : '🟠 HIGH';
    const fixedVersion = vuln.FixedVersion || 'N/A';
    const title = (vuln.Title || 'N/A').substring(0, 80);

    return `| ${severity} | \`${vuln.VulnerabilityID}\` | \`${vuln.PkgName}\` | \`${vuln.InstalledVersion}\` | \`${fixedVersion}\` | ${title} |`;
  });

  return `| Severity | CVE/ID | Package | Current | Fixed | Description |\n|----------|--------|---------|---------|-------|-------------|\n${rows.join('\n')}`;
}

/**
 * Replace template placeholders
 */
function replaceTemplatePlaceholders(template, replacements) {
  let result = template;
  Object.entries(replacements).forEach(([key, value]) => {
    result = result.replace(new RegExp(key, 'g'), value);
  });
  return result;
}

/**
 * Handle conditional template blocks
 */
function handleConditionals(template, hasVulnerabilities) {
  if (hasVulnerabilities) {
    return template.replace(/{{#if HAS_VULNERABILITIES}}([\s\S]*?){{else}}[\s\S]*?{{\/if}}/g, '$1');
  } else {
    return template.replace(/{{#if HAS_VULNERABILITIES}}[\s\S]*?{{else}}([\s\S]*?){{\/if}}/g, '$1');
  }
}

module.exports = {
  parseVulnerabilities,
  generateVulnerabilityTable,
  replaceTemplatePlaceholders,
  handleConditionals
};