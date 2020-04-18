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
    ios: "http://johnathan.dev.calblueprint.org:3000/",
<<<<<<< HEAD
    android: BASE_URL
=======
    android: BASE_URL,
>>>>>>> eb5b15af1c98c45fb12a219dd5c0ba2fed2b8220
  });
}
export const settings = {
  env: process.env.NODE_ENV,
  URL,
};

export default settings;
