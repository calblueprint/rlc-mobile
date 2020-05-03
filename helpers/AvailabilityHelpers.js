import { APIRoutes } from "../config/routes.js";
import { putRequest } from "../lib/requests.js";

const availability_template = {
  sunday_morning: 0,
  sunday_afternoon: 0,
  sunday_evening: 0,
  sunday_night: 0,
  sunday_all: 0,
  monday_morning: 0,
  monday_afternoon: 0,
  monday_evening: 0,
  monday_night: 0,
  monday_all: 0,
  tuesday_morning: 0,
  tuesday_afternoon: 0,
  tuesday_evening: 0,
  tuesday_night: 0,
  tuesday_all: 0,
  wednesday_morning: 0,
  wednesday_afternoon: 0,
  wednesday_evening: 0,
  wednesday_night: 0,
  wednesday_all: 0,
  thursday_morning: 0,
  thursday_afternoon: 0,
  thursday_evening: 0,
  thursday_night: 0,
  thursday_all: 0,
  friday_morning: 0,
  friday_afternoon: 0,
  friday_evening: 0,
  friday_night: 0,
  friday_all: 0,
  saturday_morning: 0,
  saturday_afternoon: 0,
  saturday_evening: 0,
  saturday_night: 0,
  saturday_all: 0,
};

const id_to_key = {
  1: "monday_all",
  2: "monday_morning",
  3: "monday_afternoon",
  4: "monday_evening",
  5: "monday_night",

  6: "tuesday_all",
  7: "tuesday_morning",
  8: "tuesday_afternoon",
  9: "tuesday_evening",
  10: "tuesday_night",

  11: "wednesday_all",
  12: "wednesday_morning",
  13: "wednesday_afternoon",
  14: "wednesday_evening",
  15: "wednesday_night",

  16: "thursday_all",
  17: "thursday_morning",
  18: "thursday_afternoon",
  19: "thursday_evening",
  20: "thursday_night",

  21: "friday_all",
  22: "friday_morning",
  23: "friday_afternoon",
  24: "friday_evening",
  25: "friday_night",

  26: "saturday_all",
  27: "saturday_morning",
  28: "saturday_afternoon",
  29: "saturday_evening",
  30: "saturday_night",

  31: "sunday_all",
  32: "sunday_morning",
  33: "sunday_afternoon",
  34: "sunday_evening",
  35: "sunday_night",
};

const availability_selectors = [
  {
    name: "Select all times",
    id: 0,
    times: [],
  },
  {
    name: "Monday",
    id: 1,
    times: [
      { name: "9am to 12pm", id: 2 },
      { name: "12pm to 4pm", id: 3 },
      { name: "4pm to 8pm", id: 4 },
      { name: "8pm to 12 am", id: 5 },
    ],
  },
  {
    name: "Tuesday",
    id: 6,
    times: [
      { name: "9am to 12pm", id: 7 },
      { name: "12pm to 4pm", id: 8 },
      { name: "4pm to 8pm", id: 9 },
      { name: "8pm to 12 am", id: 10 },
    ],
  },
  {
    name: "Wednesday",
    id: 11,
    times: [
      { name: "9am to 12pm", id: 12 },
      { name: "12pm to 4pm", id: 13 },
      { name: "4pm to 8pm", id: 14 },
      { name: "8pm to 12 am", id: 15 },
    ],
  },
  {
    name: "Thursday",
    id: 16,
    times: [
      { name: "9am to 12pm", id: 17 },
      { name: "12pm to 4pm", id: 18 },
      { name: "4pm to 8pm", id: 19 },
      { name: "8pm to 12 am", id: 20 },
    ],
  },
  {
    name: "Friday",
    id: 21,
    times: [
      { name: "9am to 12pm", id: 22 },
      { name: "12pm to 4pm", id: 23 },
      { name: "4pm to 8pm", id: 24 },
      { name: "8pm to 12 am", id: 25 },
    ],
  },
  {
    name: "Saturday",
    id: 26,
    times: [
      { name: "9am to 12pm", id: 27 },
      { name: "12pm to 4pm", id: 28 },
      { name: "4pm to 8pm", id: 29 },
      { name: "8pm to 12 am", id: 30 },
    ],
  },
  {
    name: "Sunday",
    id: 31,
    times: [
      { name: "9am to 12pm", id: 32 },
      { name: "12pm to 4pm", id: 33 },
      { name: "4pm to 8pm", id: 34 },
      { name: "8pm to 12 am", id: 35 },
    ],
  },
];

async function create_availability_static(availabilityArr) {
  let new_availability = { ...availability_template };

  availabilityArr.map((id) => {
    new_availability[id_to_key[id]] = 1;
  });
}

export {
  availability_template,
  id_to_key,
  availability_selectors,
  create_availability_static,
};
