import {type RouteConfig, route, layout, index,} from "@react-router/dev/routes"
import "react-router"
declare module "react-router"{
    interface AppLoadContext {
    }
}

export default [
    // Cover and default route
    layout("./components/Layout.tsx", [
        index("./components/Home.tsx"),
        route("character", "./components/Character.tsx"),
        route("campaign", "./components/Campaign.tsx"),
        route("notebook", "./components/Notebook.tsx"),
        route("world", "./components/World.tsx"),
        route("lore", "./components/Lore.tsx"),
        route("homebrew", "./components/Homebrew.tsx"),
        route("wildlands", "./components/Wildlands.tsx")
    ]),
    route("*?", "./components/Loading.tsx", {id:"catchall"}),
] satisfies RouteConfig