// Type definitions for wpapi 1.2
// Project: https://github.com/wp-api/node-wpapi
// Definitions by: Josh Pollock <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = wpapi;

declare class wpapi {
    constructor(options: any);

    auth(credentials: any): any;

    bootstrap(routes: any): any;

    namespace(namespace: any): any;

    registerRoute(namespace: any, restBase: any, options: any): any;

    root(relativePath: any): any;

    setHeaders(headers: any, value: any): any;

    transport(transport: any): any;

    url(url: any): any;

    static discover(url: any): any;

    static site(endpoint: any, routes: any): any;

}

declare namespace wpapi {
    namespace transport {
        function get(wpreq: any, callback: any): any;

        function head(wpreq: any, callback: any): any;

        function post(wpreq: any, data: any, callback: any): any;

        function put(wpreq: any, data: any, callback: any): any;

    }

}

