import { APIRoutes } from "../config/routes.js";
import { getRequest } from "../lib/requests.js";
import LocalStorage from "./LocalStorage.js";

//Utils
import * as Location from "expo-location";

// Stale while revalidate fetch of location data.
async function fetch_regions() {
  let fetched_regions = await LocalStorage.getItem("regions");
  if (fetched_regions == null) {
    await getRequest(
      APIRoutes.getRegionsPath(),
      (regions) => {
        fetched_regions = regions;
        LocalStorage.storeItem("regions", regions);
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  } else {
    getRequest(
      APIRoutes.getRegionsPath(),
      (regions) => {
        LocalStorage.storeItem("regions", regions);
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  }
  return fetched_regions;
}

async function fetch_regions_by_ids(idArr) {
  let fetched_regions = await fetch_regions();
  let filtered_regions = [];
  for (let i = 0; i < fetched_regions.length; i++) {
    let region = fetched_regions[i];
    if (idArr.includes(region.id)) {
      filtered_regions.push(region);
    }
  }
  return filtered_regions;
}

async function fetch_locations() {
  let fetched_locations = await LocalStorage.getItem("locations");
  if (fetched_locations == null) {
    await getRequest(
      APIRoutes.getLocationsPath(),
      (locations) => {
        fetched_locations = locations;
        LocalStorage.storeItem("locations", locations);
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  } else {
    getRequest(
      APIRoutes.getLocationsPath(),
      (locations) => {
        LocalStorage.storeItem("locations", locations);
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  }
  return fetched_locations;
}

async function fetch_locations_by_ids(idArr) {
  let fetched_locations = await fetch_locations();
  let filtered_locations = [];
  for (let i = 0; i < fetched_locations.length; i++) {
    let location = fetched_locations[i];
    if (idArr.includes(location.id)) {
      filtered_locations.push(location);
    }
  }
  return filtered_locations;
}

async function fetch_locations_by_region(region_id) {
  let fetched_locations = [];
  await getRequest(
    APIRoutes.getLocationsByRegionPath(region_id),
    (locations) => {
      fetched_locations = locations;
    },
    (error) => {
      alert(error);
      console.log(error);
    }
  );
  return fetched_locations;
}

const find_nearest_region = async (cooridnates) => {
  let regions = await fetch_regions();
  let nearest_region = {};
  let nearest_distance = Infinity;

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
};

//Returns the Region object with relevant regions nested in a list.
async function parseCurrentLocation(user_coordinates) {
  // let user_coordinates = read_location.coords
  let parsed = null;

  let geocoded = await Location.reverseGeocodeAsync(user_coordinates);
  let decodedRegion = `${geocoded.city}, ${geocoded.region}`;

  let fetched_regions = await fetch_regions();

  for (let i = 0; i < fetched_regions.length; i++) {
    if (fetched_regions[i].name == decodedRegion) {
      parsed = fetched_regions[i];
    }
  }

  if (parsed == null) {
    parsed = await find_nearest_region(user_coordinates);
  }

  return parsed;
}

export {
  fetch_regions,
  fetch_regions_by_ids,
  fetch_locations,
  fetch_locations_by_ids,
  fetch_locations_by_region,
  parseCurrentLocation,
};
