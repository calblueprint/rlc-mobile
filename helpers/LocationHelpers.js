import React, { useEffect } from 'react'
import { Platform, Text, View, StyleSheet, Modal, TouchableHighlight } from 'react-native';

//Utils
import * as Location from 'expo-location';


// These need to become functions that fetch from db. They will get called whenever we need a list of regions / locations ex. SignupScreen
const fetched_regions = [
    {
        address: "Washington DC",
        description: "Washington DC needs volun..." ,
        id: 4,
        latitude: 38.9071923,
        longitude: -77.0368707,
        name: "Washington DC",
        disabled_at: "",
    }
]

const fetched_locations = [
    {id:69, name: "Arlington VA", region_id: 4},
    {id:127, name: "Evoke", region_id: 4},
    {id:128, name: "Dupont Circle", region_id: 4},
]

const find_nearest = (current_location => {
    let nearest_region = {}
    let nearest_distance = Infinity
    
    for (let i = 0; i < fetched_regions_locations.length; i++) {
        let region = fetched_regions_locations[i];

        let latt_diff = region.latitude - current_location.latitude;
        let long_diff = region.longitude - current_location.longitude;
        let distance = Math.sqrt(latt_diff * latt_diff + long_diff * long_diff);

        if (distance < nearest_distance) {
            nearest_region = region;
            nearest_distance = distance;
        }
    }

    return nearest_region;
});


//Returns the Region object with relevant regions nested in a list.
const parseCurrentLocation = async (locationArr) => {
    let location = locationArr[0]
    let parsed = null;

    let geocoded = await Location.reverseGeocodeAsync(location);
    let decodedRegion = `${geocoded.city}, ${geocoded.region}`

    for (let i = 0; i < fetched_regions_locations.length; i++) {
        if (fetched_regions_locations[i].name == decodedRegion) {
            parsed = fetched_regions_locations[i];
        }
    }

    if (parsed == null) {
        parsed = find_nearest(location);
    }

    return parsed
}

export default parseCurrentLocation;