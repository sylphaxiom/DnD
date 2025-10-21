import {type RouteConfig, route, layout, index,} from "@react-router/dev/routes"
import "react-router"
declare module "react-router"{
    interface AppLoadContext {
    }
}

export default [
    // Cover and default route
    index("./components/Layout.tsx", {id:"topLayout"}),
    route("*?", "./components/Loading.tsx", {id:"catchall"}),
] satisfies RouteConfig