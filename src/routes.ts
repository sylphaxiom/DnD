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
        route("notebook", "./components/Notebook.tsx", [
            route("profile", "./components/notebook/Profile.tsx")
        ]),
        route("world", "./components/World.tsx", [
            route("borodir", "./components/world/Borodir.tsx"),
            route("draconia", "./components/world/Draconia.tsx"),
            route("dramir", "./components/world/Dramir.tsx"),
            route("elandir", "./components/world/Elandir.tsx"),
            route("faena", "./components/world/Faena.tsx"),
            route("praetor", "./components/world/Praetor.tsx"),
            route("rokesh", "./components/world/Rokesh.tsx"),
            route("wildlands", "./components/world/Wildlands.tsx"),
        ]),
        route("lore", "./components/Lore.tsx"),
        route("homebrew", "./components/Homebrew.tsx"),
    ]),
    route("*?", "./components/Loading.tsx", {id:"catchall"}),
] satisfies RouteConfig