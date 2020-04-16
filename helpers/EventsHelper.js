import { getRequest } from "../lib/requests";
import { APIRoutes } from "../config/routes";
import LocalStorage from "../helpers/LocalStorage";

async function get_event_details(event_id) {

    let event_details = {}

    await getRequest(
        APIRoutes.getEventDetailsPath(event_id), (fetchedDetails) => {
            event_details = fetchedDetails
        },
        (error) => {
            alert(error)
            console.log(error)
        }
    );

    return event_details
}

export async function get_event_lists(user_id) {
    let attended_events = []
    let upcoming_events = []
    
    await getRequest(
        APIRoutes.getEventsPath(user_id, "unfinished"),
        (fetchedAttended) => {
          attended_events = fetchedAttended
        },
        (error) => {
          alert(error)
          console.log(error)
        }
      );
    await getRequest(
        APIRoutes.getEventsPath(user_id, "upcoming"),
        (fetchedUpcoming) => {
            upcoming_events = fetchedUpcoming
        },
        (error) => {
            alert(error)
            console.log(error)
        }
    );

    let attended_details = await Promise.all(attended_events.map(item => get_event_details(item.id)));
    // console.log(attended_details)
    attended_events = attended_events.map((item, index) => ({ ...item, details: attended_details[index]}));
    LocalStorage.storeItem('attended_events', attended_events) // Put attended events in Local Storage

    let upcoming_details = await Promise.all(upcoming_events.map(item => get_event_details(item.id)));
    // console.log(upcoming_details)
    upcoming_events = upcoming_events.map((item, index) => ({ ...item, details: upcoming_details[index]}));
    LocalStorage.storeItem('upcoming_events', upcoming_events) // Put attended events in Local Storage

    return { upcoming: upcoming_events, attended : attended_events }
    
}

export default get_event_lists