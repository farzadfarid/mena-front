const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve('android/app/src/main/AndroidManifest.xml');
const networkConfigPath = path.resolve('android/app/src/main/res/xml/network_security_config.xml');

// === PATCH AndroidManifest.xml ===
if (!fs.existsSync(manifestPath)) {
  console.warn('⛔ AndroidManifest.xml not found!');
  process.exit(1);
}

let manifest = fs.readFileSync(manifestPath, 'utf8');

// Add usesCleartextTraffic and networkSecurityConfig if missing
if (!manifest.includes('usesCleartextTraffic')) {
  manifest = manifest.replace(
    '<application',
    '<application android:usesCleartextTraffic="true" android:networkSecurityConfig="@xml/network_security_config"'
  );
  fs.writeFileSync(manifestPath, manifest, 'utf8');
  console.log('✅ Patched AndroidManifest.xml');
} else {
  console.log('ℹ️ AndroidManifest.xml already contains usesCleartextTraffic');
}

// === CREATE network_security_config.xml ===
if (!fs.existsSync(networkConfigPath)) {
  const xmlDir = path.dirname(networkConfigPath);
  fs.mkdirSync(xmlDir, { recursive: true });

  const configContent = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
  <domain-config cleartextTrafficPermitted="true">
    <domain includeSubdomains="true">192.168.1.205</domain>
  </domain-config>
</network-security-config>`;

  fs.writeFileSync(networkConfigPath, configContent, 'utf8');
  console.log('✅ Created network_security_config.xml');
} else {
  console.log('ℹ️ network_security_config.xml already exists');
}
