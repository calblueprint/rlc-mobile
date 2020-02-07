import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
};
