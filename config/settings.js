import { Platform } from "react-native";

/**
 * Determines URL based on whether in production or dev environment
 */
if (process.env.NODE_ENV === "production") {
  console.log("production");
} else {
  console.log("staging");
  URL = Platform.select({
    ios: "http://localhost:3000",
    // For Android Emulator
    android: "http://10.0.2.2:3000"
  });
}

export const settings = {
  env: process.env.NODE_ENV,
  URL
};

export default settings;
