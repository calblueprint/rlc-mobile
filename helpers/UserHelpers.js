import { postRequest } from "../lib/requests.js"
import { APIRoutes } from "../config/routes";
import LocalStorage from "../helpers/LocalStorage";

// User Login expects { email, password, remember_me }
const fetchUser = (params, errorFunc) => {
  if (params.email == "" || params.password == "") {
    throw new Error();
  }

  return postRequest(
    APIRoutes.loginPath(),
    (user) => {
      const userJSON = {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        occupation: user.occupation,
        telephone: user.telephone,
        address: user.address,
        city: "",
        state: "",
        zip_code: user.zip_code,
        email: user.email,
        preferred_region_id: user.preferred_region_id,
        preferred_location_id: user.preferred_location_id,
        availability: "",
      };
      LocalStorage.storeItem("user", userJSON);
    },
    errorFunc,
    params
  );
};

export { fetchUser };
