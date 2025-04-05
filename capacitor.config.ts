import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mena',
  webDir: 'www',
  android: {
    allowMixedContent: true
  },
  server: {
    url: "http://192.168.1.205:8100",
    cleartext: true
  }
};

export default config; 
