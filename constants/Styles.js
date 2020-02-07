import React from "react";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import Sizes from "../constants/Sizes";
import { normalize } from "../utils/Normalize";

// Useful constants

export default StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center"
  }
});
