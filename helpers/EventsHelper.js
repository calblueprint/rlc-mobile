import { getRequest } from "../lib/requests";
import { APIRoutes } from "../config/routes";
import LocalStorage from "../helpers/LocalStorage";

async function get_event_details(id) {

    let event_details = {}

    await getRequest(
        APIRoutes.getEventDetailsPath(id), (fetchedDetails) => {
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
        APIRoutes.getEventsPath(user_id, "attended"),
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

    await Promise.all(attended_events.map(async item => item.details = get_event_details(item.id))).then(
        LocalStorage.storeItem('attended_events', attended_events) // Put attended events in Local Storage
    );

    await Promise.all(upcoming_events.map(async item => item.details = get_event_details(item.id))).then(
        LocalStorage.storeItem('upcoming_events', upcoming_events) // Put upcoming events in Local Storage
    )

    return { upcoming: upcoming_events, attended : attended_events }
    
}

export default get_event_lists