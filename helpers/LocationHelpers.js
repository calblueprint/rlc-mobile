import React, { useEffect } from 'react'
import { Platform, Text, View, StyleSheet, Modal, TouchableHighlight } from 'react-native';

import {APIRoutes} from '../config/routes.js'
import {getRequest} from '../lib/requests.js'

//Utils
import * as Location from 'expo-location';

// These need to become functions that fetch from db. They will get called whenever we need a list of regions / locations ex. SignupScreen
const fetch_regions = async () => getRequest(
    APIRoutes.getRegionsPath(), 
    (regions) => { return regions},
    (error) => {
      alert(error)
      console.log(error)
    }
  );

const fetch_locations = async () => getRequest(
    APIRoutes.getLocationsPath(), 
    (regions) => { return regions},
    (error) => {
      alert(error)
      console.log(error)
    }
  );

const fetch_locations_by_region = async (region_id) => getRequest(
    APIRoutes.getLocationsByRegionPath(region_id), 
    (regions) => { return regions},
    (error) => {
      alert(error)
      console.log(error)
    }
)

const find_nearest_region = (cooridnates, regions => {
    let nearest_region = {}
    let nearest_distance = Infinity
    
    for (let i = 0; i < regions.length; i++) {
        let region = regions[i];

        let latt_diff = region.latitude - cooridnates.latitude;
        let long_diff = region.longitude - cooridnates.longitude;
        let distance = Math.sqrt(latt_diff * latt_diff + long_diff * long_diff);

        if (distance < nearest_distance) {
            nearest_region = region;
            nearest_distance = distance;
        }
    }

    return nearest_region;
});


//Returns the Region object with relevant regions nested in a list.
const parseCurrentLocation = async (coordinate_arr) => {
    let user_coordinates = coordinate_arr[0]
    let parsed = null;

    let geocoded = await Location.reverseGeocodeAsync(user_coordinates);
    let decodedRegion = `${geocoded.city}, ${geocoded.region}`

    let fetched_regions = await fetch_regions()

    for (let i = 0; i < fetched_regions.length; i++) {
        if (fetched_regions[i].name == decodedRegion) {
            parsed = fetched_regions[i];
        }
    }

    if (parsed == null) {
        parsed = find_nearest_region(user_coordinates);
    }

    return parsed
}

export default parseCurrentLocation;