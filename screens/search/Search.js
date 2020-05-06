
import React, { Component } from "../../node_modules/react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { EventRegister } from "react-native-event-listeners";

import Sizes from "../../constants/Sizes.js";
import Styles from "../../constants/Styles";
import Colors from "../../constants/Colors";
import { getRequest } from "../../lib/requests";
import LocalStorage from "../../helpers/LocalStorage.js";

//curr location
import * as Location from "expo-location";
import {
  fetch_regions,
  fetch_locations,
  fetch_locations_by_ids,
  fetch_locations_by_region,
  parseCurrentLocation,
} from "../../helpers/LocationHelpers.js";

import TimeOrLoc from "../../components/search/timeOrLoc.js";
import SuggestedEventsList from "../../components/search/SuggestedEventsList.js";

const dayOptions = [
  {
    key: "monday",
    text: "Monday",
    offset: 1,
  },
  {
    key: "tuesday",
    text: "Tuesday",
    offset: 2,
  },
  {
    key: "wednesday",
    text: "Wednesday",
    offset: 3,
  },
  {
    key: "thursday",
    text: "Thursday",
    offset: 4,
  },
  {
    key: "friday",
    text: "Friday",
    offset: 5,
  },
  {
    key: "saturday",
    text: "Saturday",
    offset: 6,
  },
  {
    key: "sunday",
    text: "Sunday",
    offset: 0,
  },
];

const numOfTimes = 4;
const totalTimes = 28;
const hour_ms = 60 * 60 * 1000;

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.selectAll = this.selectAll.bind(this);
    this.flipState = this.flipState.bind(this);
    //const properLocations = this.props.location.map(loc => ({ ...loc, selected: false }));

    this.state = {
      user: null,
      hasCompletedPreferences: false,
      selectedDay: "monday",
      selectedAll: false,
      numTimes: 0,

      numLocs: 0,
      search: "",
      fetchingLoc: true,
      locations: [],

      monday: {
        all: {
          key: "monday_all",
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
          key: "tuesday_all",
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
          key: "wednesday_all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "wednesday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "wednesday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "wednesday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "wednesday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
      thursday: {
        all: {
          key: "thursday_all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "thursday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "thursday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "thursday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "thursday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
      friday: {
        all: {
          key: "friday_all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "friday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "friday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "friday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "friday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
      saturday: {
        all: {
          key: "saturday_all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "saturday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "saturday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "saturday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "saturday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
      sunday: {
        all: {
          key: "sunday_all",
          text: "Select the entire day",
          value: false,
        },
        morn: {
          key: "sunday_morning",
          text: "9AM-12PM",
          value: false,
        },
        afternoon: {
          key: "sunday_afternoon",
          text: "12PM-3PM",
          value: false,
        },
        evening: {
          key: "sunday_evening",
          text: "3PM-6PM",
          value: false,
        },
        night: {
          key: "sunday_night",
          text: "6PM-9PM",
          value: false,
        },
      },
    };
  }

  async componentDidMount() {
    this.listener = EventRegister.addEventListener('reloadSearch', () => {
      this.setState({
        hasCompletedPreferences: false,
      })
    })
    let user = await LocalStorage.getNonNullItem("user");
    this.setState({ user: user });

    console.log("got user");
    console.log(this.state.user);

    let preferred_locations = await fetch_locations_by_ids(this.state.user.preferred_location_id);
    this.setState({
      locations: preferred_locations.map((item) => ({ ...item, selected: true })),
      fetchingLoc: false,
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  //LOCATION FUNCTIONS

  getCurrLocation = () => {
    this.setState({ fetchingLoc: true });
    this.setCurrentRegion();
    console.log("current location indeed");
  }

  //helpers for current location

  setCurrentRegion = async () => {
    let Locpermissions = await Location.requestPermissionsAsync();
    if (Locpermissions.status != "granted") {
      await Location.requestPermissionsAsync();
    } else {
      let user_coordinates = await Location.getCurrentPositionAsync({
        accuracy: 4,
      });

      let preferred_region = await parseCurrentLocation(
        user_coordinates.coords
      );

      await this.onPreferredRegionChange([preferred_region.id]);
    }
  };

  onPreferredRegionChange = async (preferred_region_id) => {
    let included_locations = await fetch_locations_by_region(
      preferred_region_id[0]
    );
    console.log(included_locations);
    this.setState((prevState) => ({
      preferred_region_id: preferred_region_id,
      preferred_location_id: [],
      locations:
        included_locations === undefined || included_locations.length == 0
          ? []
          : [...prevState.locations, ...included_locations.map((item) => ({ ...item, selected: false }))],

      fetchingLoc: false,
    }));
  };


  updateSearch = (val) = () => {
    this.setState({ search: val });
  };

  handleSelect = (val, id) => () => {
    val === true ? this.addLoc(-1) : this.addLoc(1);
    const nextState = this.state.locations.map((loc) =>
      loc.id === id ? { ...loc, selected: !loc.selected } : loc
    );
    this.setState({ locations: nextState });
  };

  addLoc = (val) => {
    this.setState((prevState) => ({ numLocs: prevState.numLocs + val }));
    if (this.state.numLocs < 0) {
      this.setState({ numLocs: 0 });
    }
  };

  resultLocs = () => {
    const loc_preferences = this.state.locations.filter((item) => {
      return item.selected === true;
    });
    return loc_preferences;
  };

  //TIME FUNCTIONS 
  format_api_times = () => {
    const curr_date = new Date();
    curr_date.setHours(0, 0, 0, 0);
    const curr_date_ms = curr_date.getTime();
    const day_of_week = curr_date.getDay();
    const intervals = []
    dayOptions.map((day) => {
      const curr_day_periods = this.state[day.key];
      // Calculate the number of days from now that this day of the week will occur
      const adjusted_offset = (day.offset - day_of_week + 7) % 7
      // Get beginning of current day 
      adjusted_date_ms = curr_date_ms + 24 * hour_ms * adjusted_offset;
      // Get time interval to search for on each day
      if (curr_day_periods["all"]["value"] === true) {
        const start_time = new Date(adjusted_date_ms + 9 * hour_ms);
        const end_time = new Date(adjusted_date_ms + 21 * hour_ms);
        intervals.push({ 'start': start_time, 'end': end_time })
      }
      else {
        Object.keys(curr_day_periods).map((period) => {
          if (period !== "all") {
            // Get ending time from current period
            let curr_end_hours = curr_day_periods[period].text.split("-")[1].slice(0, -2);
            // Parse number of hours
            curr_end_hours = parseInt(curr_end_hours) % 12 + 12;
            curr_start_hours = curr_end_hours - 3;
            const start_time = new Date(adjusted_date_ms + curr_start_hours * hour_ms);
            const end_time = new Date(adjusted_date_ms + curr_end_hours * hour_ms);
            intervals.push({ 'start': start_time, 'end': end_time })
          }
        })
      }
    })
    return intervals;
  }

  compile_times = () => {
    const time_preferences = [
      this.state.monday,
      this.state.tuesday,
      this.state.wednesday,
      this.state.thursday,
      this.state.friday,
      this.state.saturday,
      this.state.sunday,
    ];
    return time_preferences;
  };

  selectAll = () => {
    const checked = !this.state.selectedAll; // get the value
    checked ? this.setState({ numTimes: totalTimes }) : this.setState({ numTimes: 0 });

    this.setState((prevState) => ({ selectedAll: !prevState.selectedAll })); // set value

    dayOptions.map((day) =>
      this.setState((prevState) => {
        //set for each day
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
    var numToAdd = 0; //number to change the number of selected times

    this.setState((prevState) => {
      let selDay = { ...prevState[day] };

      //if selecting all times in a day
      if (time == "all") {
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
        //add on or subtract the remaining times
        if (checked) {
          numToAdd = numOfTimes - alreadySame;
        } else {
          numToAdd = alreadySame - numOfTimes;
        }
        //update all times in that day
        Object.keys(selDay).map((timeObj) => (selDay[timeObj].value = checked));

        //else only selecting one time 
      } else {
        selDay[time].value
          ? numToAdd = -1
          : numToAdd = 1;
        selDay[time].value = !selDay[time].value;
      }
      return selDay;
    });

    this.setState((prevState) => ({
      numTimes: prevState.numTimes + numToAdd,
    }))

  };

  search = () => {
    //props are the selected locations and selected times
    this.setState({ hasCompletedPreferences: true }, () => { this.render() });
  };

  goBackToSearch = () => {
    this.setState({ hasCompletedPreferences: false }, () => { this.render() });
  }

  render() {
    if (this.state.hasCompletedPreferences) {
      return (
        <View style={styles.container}>
          <SuggestedEventsList navigation={this.props.navigation}
            preferredLocations={this.state.locations}
            preferredTimes={this.format_api_times()}
            goBack={this.goBackToSearch}
          />
        </View>
      );
    } else {
      return (
        <View style={{ ...Styles.container, ...styles.container }}>
          <View style={styles.header}>
            <Text style={Styles.title}>Search for an Event </Text>
          </View>
          <View style={{ flex: 13 }}>
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
              getCurrLoc={this.getCurrLocation}
              fetchingLoc={this.state.fetchingLoc}
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
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "10%",
    backgroundColor: "white",
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
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
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
