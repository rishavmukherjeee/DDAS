import 'dotenv/config';

export default {
  expo: {
    name: 'Alokh Vision',
    slug: 'expo-firebase',
    privacy: 'public',
    platforms: ['ios', 'android'],
    version: '0.15.0',
    orientation: 'portrait',
    icon: './images/eye.png',
    splash: {
      image: './images/bg.png',
      resizeMode: 'cover',
      
      
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: {
        projectId: "7a91c17d-529e-4433-be41-3a616475e31c"
      }
    },
      android: {
        package: "com.dds.alokhvision"
      }
    
  }
};
