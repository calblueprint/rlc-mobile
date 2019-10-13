import { Platform } from 'react-native'

/**
 * Determines URL based on whether in production or dev environment
 */
 // TODO (Kelsey): test whether if check actually works
if (process.env.NODE_ENV === 'production') {
  console.log('production');
//   URL = 'https://dream-rails-herokoconnect.herokuapp.com';
} else {
  console.log('staging');
  URL = Platform.select({
    ios: "http://localhost:3000",
    // For Android Emulator
    android: "http://10.0.2.2:3000"
  });
}

export const settings = {
  env: process.env.NODE_ENV,
  URL,
};

export default settings;