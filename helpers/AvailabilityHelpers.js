const availability_template = {
  //Empty availability params for future POST request.
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

const availability_selectors = [
  //Selectors for Sectioned MultiSelect
  {
    name: "Monday",
    id: "monday_all",
    times: [
      { name: "9am to 12pm", id: "monday_morning" },
      { name: "12pm to 4pm", id: "monday_afternoon" },
      { name: "4pm to 8pm", id: "monday_evening" },
      { name: "8pm to 12 am", id: "monday_night" },
    ],
  },
  {
    name: "Tuesday",
    id: "tuesday_all",
    times: [
      { name: "9am to 12pm", id: "tuesday_morning" },
      { name: "12pm to 4pm", id: "tuesday_afternoon" },
      { name: "4pm to 8pm", id: "tuesday_evening" },
      { name: "8pm to 12 am", id: "tuesday_night" },
    ],
  },
  {
    name: "Wednesday",
    id: "wednesday_all",
    times: [
      { name: "9am to 12pm", id: "wednesday_morning" },
      { name: "12pm to 4pm", id: "wednesday_afternoon" },
      { name: "4pm to 8pm", id: "wednesday_evening" },
      { name: "8pm to 12 am", id: "wednesday_night" },
    ],
  },
  {
    name: "Thursday",
    id: "thursday_all",
    times: [
      { name: "9am to 12pm", id: "thursday_morning" },
      { name: "12pm to 4pm", id: "thursday_afternoon" },
      { name: "4pm to 8pm", id: "thursday_evening" },
      { name: "8pm to 12 am", id: "thursday_night" },
    ],
  },
  {
    name: "Friday",
    id: "friday_all",
    times: [
      { name: "9am to 12pm", id: "friday_morning" },
      { name: "12pm to 4pm", id: "friday_afternoon" },
      { name: "4pm to 8pm", id: "friday_evening" },
      { name: "8pm to 12 am", id: "friday_night" },
    ],
  },
  {
    name: "Saturday",
    id: "saturday_all",
    times: [
      { name: "9am to 12pm", id: "saturday_morning" },
      { name: "12pm to 4pm", id: "saturday_afternoon" },
      { name: "4pm to 8pm", id: "saturday_evening" },
      { name: "8pm to 12 am", id: "saturday_night" },
    ],
  },
  {
    name: "Sunday",
    id: "sunday_all",
    times: [
      { name: "9am to 12pm", id: "sunday_morning" },
      { name: "12pm to 4pm", id: "sunday_afternoon" },
      { name: "4pm to 8pm", id: "sunday_evening" },
      { name: "8pm to 12 am", id: "sunday_night" },
    ],
  },
];

function create_availability_static(slotIds) {
  /**
   * [ For sectioned multi select parses slot ids into new availability object ]
   * @param {Array} slotIds - array of ids for selected time slots ex. ["monday_all", "tuesday_morning"]
   */
  let new_availability = { ...availability_template };

  slotIds.map((id) => {
    new_availability[id] = 1;
  });

  return new_availability;
}

async function fetch_availability() {
  /**
   * [ Fetch availability object for current user session or null if none. ]
   */
  let fetched_availability = await LocalStorage.getItem("availability");
  if (fetched_availability == null) {
    await getRequest(
      APIRoutes.getAvailabilityPath(),
      (availability) => {
        if (availability != null) {
          fetched_availability = availability;
          LocalStorage.storeItem("availability", availability);
        } else {
          return null
        }
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  } else {
    getRequest(
      APIRoutes.getAvailabilityPath(),
      (availability) => {
        LocalStorage.storeItem("availability", availability);
      },
      (error) => {
        alert(error);
        console.log(error);
      }
    );
  }
  return fetched_availability;
}

export {
  availability_template,
  availability_selectors,
  create_availability_static,
  fetch_availability,
};
