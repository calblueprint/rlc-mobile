import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";
import Styles from "../../constants/Styles";

import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";
import { normalize } from "../../utils/Normalize";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ ...styles.container, ...this.props.style }}>
        <TouchableOpacity
          style={styles.sides}
          onPress={() => {
            this.props.onPressBack();
          }}
        >
          <Icon
            name="left"
            type="antdesign"
            color="#38A5DB"
            style={{
              height: 15,
              width: 15,
              alignSelf: "left"
            }}
          />
        </TouchableOpacity>
        <Text style={{ ...styles.center, ...styles.title }}>
          {this.props.centerTitle}
        </Text>
        {this.props.rightSide ? <TouchableOpacity
          style={{ ...styles.sides, flex: 2 }}
          onPress={() => {
            this.props.onPressHandler();
          }}
        >
          <Text style={{ ...Styles.title, ...styles.subtitle }}>
            {this.props.actionTitle}
          </Text>
        </TouchableOpacity> : <View style={{ ...styles.sides }}></View>
        }
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingTop: Sizes.height * 0.07,
    paddingBottom: Sizes.height * 0.03,
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginHorizontal: "0.5%"
  },
  sides: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  center: {
    flex: 2,
    flexGrow: 3,
    textAlign: "center"
  },
  title: {
    color: Colors.regularText,
    fontWeight: "600",
    fontSize: 20,
    marginTop: "0%",
    marginBottom: "0%"
  },
  subtitle: {
    color: Colors.mainBlue,
    textAlign: "center",
    fontWeight: "bold",
    opacity: 0.9,
    fontSize: normalize(15)
  }
});
