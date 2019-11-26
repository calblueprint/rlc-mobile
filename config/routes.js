/**
 * Class for defining API routes
 */
export class APIRoutes {
    // Use to build api routes
    static createRoute(route)           { return `/api/${route}` }
    static deviseRoute(route)           { return `/users/${route}` }

    // Login
    static signupPath()                 { return `/sign_up` }
    static loginPath()                  { return APIRoutes.deviseRoute(`sign_in`) }

    // Events
    static getEventsPath(id, type)             { return APIRoutes.deviseRoute(`${id}/events/${type}`) }
}
