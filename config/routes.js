/**
 * Class for defining API routes
 */
export class APIRoutes {
  // Use to build api routes
  static createRoute(route) {
    return `/api/${route}`;
  }

  static deviseRoute(route) {
    return `/users/${route}`;
  }

  // Signup and Login
  static signupPath() {
    return `/users`;
  }
  static loginPath() {
    return APIRoutes.deviseRoute(`sign_in`);
  }

  // Reset Password
  static UserPasswordPath() {
    return APIRoutes.deviseRoute(`password`);
  }

  // Availiability
  static updateAvailabilityPath() {
    return APIRoutes.createRoute(`users/update_availability`);
  }

  // Events
  static getEventsPath(id, type) {
    return APIRoutes.deviseRoute(`${id}/events/${type}`);
  }

  static getEventDetailsPath(id) {
    return APIRoutes.createRoute(`show_event/${id}`);
  }

  //Locations
  static getRegionsPath() {
    return APIRoutes.createRoute("get_regions");
  }

  static getRegionPath(id) {
    return APIRoutes.createRoute(`get_region/${id}`);
  }

  static getLocationsPath() {
    return APIRoutes.createRoute("get_locations");
  }

  static getLocationsByRegionPath(id) {
    return APIRoutes.createRoute(`get_locations/${id}`);
  }

  static getLocationPath(id) {
    return APIRoutes.createRoute(`get_location/${id}`);
  }
}
