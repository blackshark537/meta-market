import { CapacitorConfig } from '@capacitor/cli';
import { environment } from './src/environments/environment.prod'

const config: CapacitorConfig = {
  appId: environment.appId,
  appName: environment.appName,
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  }
};

export default config;
