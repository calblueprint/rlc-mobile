import { Platform } from "react-native";
import { BASE_URL } from "react-native-dotenv";

/**
 * Determines URL based on whether in production or dev environment
 */
if (process.env.NODE_ENV === "production") {
  // TODO @Johnathan, work on developing
  // the env variables for production.
  console.log("production");
} else {
  console.log("staging");
  URL = Platform.select({
    ios: "http://micah.dev.calblueprint.org:3000/",
    android: "http://10.0.2.2:3000"
  });
}
export const settings = {
  env: process.env.NODE_ENV,
  URL
};

export default settings;
