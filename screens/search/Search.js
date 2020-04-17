// Place Holder for Search Feature
import React, { Component } from "../../node_modules/react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Sizes from "../../constants/Sizes.js";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";

import TimeOrLoc from "../../components/search/timeOrLoc.js";
import SuggestedEventsList from "../../components/search/SuggestedEventsList.js"

const dayOptions = [
  {
    key: "monday",
    text: "Monday",
  },
  {
    key: "tuesday",
    text: "Tuesday",
  },
  {
    key: "wednesday",
    text: "Wednesday",
  },
  {
    key: "thursday",
    text: "Thursday",
  },
  {
    key: "friday",
    text: "Friday",
  },
  {
    key: "saturday",
    text: "Saturday",
  },
  {
    key: "sunday",
    text: "Sunday",
  },
];

const numOfTimes = 4;
const totalTimes = 28;
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.selectAll = this.selectAll.bind(this);
    this.flipState = this.flipState.bind(this);
    //const properLocations = this.props.location.map(loc => ({ ...loc, selected: false }));

    this.state = {
      selectedDay: "monday",
      selectedAll: false,
      numTimes: 0,

      numLocs: 0,
      search: '',
      locations: [{
        id: 27,
        name: "Bowery",
        selected: false
      },
      {
        id: 28,
        name: "Chelsea",
        selected: false

      },
      {
        id: 29,
        name: "Downtown",
        selected: false
      },
      {
        id: 30,
        name: "Chelsea",
        selected: false

      },
      {
        id: 31,
        name: "Downtown",
        selected: false
      },
      {
        id: 32,
        name: "Chelsea",
        selected: false

      },
      {
        id: 33,
        name: "Downtown",
        selected: false
      },
      {
        id: 34,
        name: "Chelsea",
        selected: false

      },
      {
        id: 35,
        name: "Downtown",
        selected: false
      },
      {
        id: 36,
        name: "Chelsea",
        selected: false

      },
      {
        id: 37,
        name: "Downtown",
        selected: false
      },],

      monday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "monday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "monday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "monday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "monday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
      tuesday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "tuesday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "tuesday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "tuesday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "tuesday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
      wednesday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "9_12",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "12_3",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "3_6",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "6_9",
          text: "6PM-9PM",
          value: false,
        },
      },
      thursday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "9_12",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "12_3",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "3_6",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "6_9",
          text: "6PM-9PM",
          value: false,
        },
      },
      friday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "9_12",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "12_3",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "3_6",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "6_9",
          text: "6PM-9PM",
          value: false,
        },
      },
      saturday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "9_12",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "12_3",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "3_6",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "6_9",
          text: "6PM-9PM",
          value: false,
        },
      },
      sunday: {
        all: {
          key: "all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "9_12",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "12_3",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "3_6",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "6_9",
          text: "6PM-9PM",
          value: false,
        },
      },


    };
  }

  //LOCATION FUNCTIONS

  updateSearch = (val) = () => {
    this.setState({ search: val });
  };

  handleSelect = (val, id) => () => {
    val === true ? this.addLoc(-1) : this.addLoc(1);
    const nextState = this.state.locations.map(loc => loc.id === id ? { ...loc, selected: !loc.selected } : loc);
    this.setState({ locations: nextState });
  }

  addLoc = (val) => {
    this.setState(prevState => ({ numLocs: prevState.numLocs + val }));
    if (this.state.numLocs < 0) {
      this.setState({ numLocs: 0 })
    }
  }

  resultLocs = () => {
    const loc_preferences = this.state.locations.filter((item) => { return item.selected === true });
    return loc_preferences;
  }



  //TIME FUNCTIONS 
  compile_times = () => {
    const time_preferences = [this.state.monday, this.state.tuesday, this.state.wednesday, this.state.thursday, this.state.friday, this.state.saturday, this.state.sunday];
    return time_preferences;
  }

  selectAll = () => {
    const checked = !this.state.selectedAll; // get the value
    checked ? this.countTime(totalTimes, true) : this.countTime(0, true)

    this.setState((prevState) => ({ selectedAll: !prevState.selectedAll })); // set value

    dayOptions.map((day) =>
      this.setState((prevState) => { //set for each day
        let selDay = { ...prevState[day.key] };
        Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked));
        return selDay;
      })
    );
  };

  updateDay = (newDay) => () => {
    this.setState({ selectedDay: newDay });
  };

  flipState = (day, time) => () => {
    this.setState((prevState) => {
      let selDay = { ...prevState[day] };

      if (time == "all") {
        //if selecting all
        const checked = !selDay[time].value;
        var alreadySame = 0;
        for (const timeObj of Object.keys(selDay)) {
          if (selDay[timeObj].value == checked) {
            alreadySame++;
          }
        }
        //safety check
        if (alreadySame > numOfTimes) {
          alreadySame = numOfTimes;
        }

        if (checked) {
          this.countTime(numOfTimes - alreadySame, false)
        } else {
          this.countTime(alreadySame - numOfTimes, false)
        }
        Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked));
      } else {
        selDay[time].value ? this.countTime(-1, false) : this.countTime(1, false)
        selDay[time].value = !selDay[time].value;
      }
      return selDay;
    });
  };

  countTime = (val, selAll) => {
    if (selAll) {
      this.setState({ numTimes: val });
    } else {
      this.setState(prevState => ({
        numTimes: prevState.numTimes + val
      }));
    }
  }

  search = () => {
    //props are the selected locations and selected times
  };




  render() {
    return (
      <View style={{ ...Styles.container, ...styles.container }}>
        {/* <View style={styles.header}>
          <Text style={Styles.title}>Search for an Event </Text>
        </View>
        <View style={{ flex: 14 }}>
          <TimeOrLoc
            updateOneTime={this.flipState}
            updateSelectAll={this.selectAll}
            selAllVal={this.state.selectedAll}
            selectedDay={this.state.selectedDay}
            updateSelDay={this.updateDay}
            dayops={dayOptions}
            timeops={this.state[this.state.selectedDay]}
            numTimes={this.state.numTimes}

            locOptions={this.state.locations}
            updateLoc={this.handleSelect}
            searchVal={this.state.search}
            updateSearch={this.updateSearch}
            numLocs={this.state.numLocs}

          />
        </View>
        <View
          style={{ flex: 1, marginHorizontal: "10%", marginVertical: "3%" }}
        >
          <TouchableOpacity
            style={{ ...styles.button, ...styles.buttonText }}
            onPress={this.search}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.container}>
          <SuggestedEventsList navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flex: 1,
    flexDirection: "column",
    alignContent: "space-around",
    width: Sizes.width,
  },
  header: {
    flex: 1,
    marginHorizontal: "10%",
  },
  button: {
    backgroundColor: "#38A5DB",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    height: 50,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
