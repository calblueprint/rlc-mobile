import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import Styles from "../../constants/Styles";
import Sizes from "../../constants/Sizes.js";
import { normalize } from "../../utils/Normalize";
import { CheckBox } from "react-native-elements";

import Colors from "../../constants/Colors";

export default class locTab extends React.Component {
  selLoc = (item) => {
    return (
      <View style={styles.selLocCont}>
        <TouchableOpacity style={styles.selLocButton}>
          <Text style={{ ...styles.selObj, color: "white" }}>{item.text}</Text>
          <Icon name="x" color="white" style={styles.selObj} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{ ...Styles.container, ...styles.container }}
      >
        {/* <View style={styles.secCont}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.props.updateSearch}
                        value={this.props.searchVal}
                        containerStyle={{
                            backgroundColor: "#EEEEEE", borderBottomColor: 'transparent',
                            borderTopColor: 'transparent'
                        }}
                        inputContainerStyle={{ backgroundColor: "#FFFFFF" }}
                    />
                </View> */}
        <View style={{ ...styles.secCont }}>
          <ScrollView horizontal={true}>
            <View style={styles.selLocCont}>
              {this.props.locOptions
                .filter((item) => {
                  return item.selected === true;
                })
                .map((loca, i) => (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={{ ...styles.selLocButton, flexDirection: "row" }}
                      onPress={this.props.updateLoc(loca.selected, loca.id)}
                    >
                      <Icon name="close" color="white" size={20} />
                      <Text
                        style={{
                          color: "white",
                          paddingLeft: Sizes.width * 0.015,
                        }}
                      >
                        {loca.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            borderBottomColor: "#CCCCCC",
            borderBottomWidth: 2,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            padding: "0%",
          }}
        >
          <TouchableOpacity
            style={{
              width: "80%",
              marginHorizontal: "10%",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={this.props.getCurrLoc}
          >
            <Icon
              name="location-searching"
              color="#517fa4"
              style={styles.selObj}
            />
            <Text style={{ ...styles.selObj, fontSize: normalize(15) }}>
              {" "}
              Current Location
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 6 }}>
          <View style={styles.locResultsContainer}>
            {this.props.fetchingLoc ? (
              <View style={{ paddingVertical: "10%" }}>
                <ActivityIndicator size="large" color={Colors.mainBlue} />
              </View>
            ) : (
              <FlatList
                data={this.props.locOptions}
                renderItem={({ item }) => (
                  <View style={styles.secSelContainer}>
                    <Text style={{ ...styles.selObj, fontSize: normalize(14) }}>
                      {item.name}
                    </Text>
                    <CheckBox
                      checked={item.selected}
                      onPress={this.props.updateLoc(item.selected, item.id)}
                      style={{ ...styles.selObj, paddingHorizontal: "0%" }}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  secCont: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    padding: "5%",
    paddingBottom: 0,
    width: "100%",
  },

  selObj: {
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: "3%",
  },

  selLocCont: {
    flex: 1,
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: Sizes.width * 0.015,
  },
  selLocButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#38A5DB",
    borderRadius: Sizes.width * 0.15,
    height: "75%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.width * 0.025,
  },

  //location results [same as timeTab.js]
  locResultsContainer: {
    flex: 1,
    flexDirection: "column",
    width: "80%",
    marginHorizontal: "10%",
  },
  secSelContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#EEEEEE",
  },
});
