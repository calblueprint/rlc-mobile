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
    backgroundColor: "white"
  },
  // Logo
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: "25%",
    maxHeight: "25%"
  },
  logo: {
    width: "29%",
    height: Sizes.width * 0.26
  },
  // Text
  title: {
    color: "#000000",
    marginTop: "3.4%",
    marginBottom: "2%",
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.9,
    fontSize: normalize(20)
  },
  subtext: {
    color: "#ff0000",
    marginVertical: "1.2%",
    textAlign: "center",
    fontWeight: "normal",
    opacity: 0.85,
    fontSize: normalize(16)
  }
});
