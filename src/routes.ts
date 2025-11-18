import {type RouteConfig, route, layout, index, prefix,} from "@react-router/dev/routes"
import "react-router"
declare module "react-router"{
    interface AppLoadContext {
    }
}

export default [
    layout("./components/Layout.tsx", [
        route('/',"./components/Landing.tsx",[
            index("./components/Home.tsx")
        ]),
        route("character", "./components/Character.tsx", [
            index("./components/character/MyCharacters.tsx"),
        ]),
        route("campaign", "./components/Campaign.tsx", [
            index("./components/nonAuth/PublicCampaign.tsx"),
        ]),
        route("notebook","./components/Notebook.tsx", [
            index("./components/nonAuth/PublicNotebook.tsx"),
            route("profile/", "./components/notebook/Profile.tsx"),
        ]),
        route("world", "./components/World.tsx", [
            index( "./components/nonAuth/PublicWorld.tsx"),
        ]),
        ...prefix("world", [
            route("borodir", "./components/world/Borodir.tsx",),
            route("draconia", "./components/world/Draconia.tsx"),
            route("dramir", "./components/world/Dramir.tsx"),
            route("elandir", "./components/world/Elandir.tsx"),
            route("faena", "./components/world/Faena.tsx"),
            route("praetor", "./components/world/Praetor.tsx"),
            route("rokesh", "./components/world/Rokesh.tsx"),
            route("wildlands", "./components/world/Wildlands.tsx"),
        ]),
        route("lore", "./components/Lore.tsx", [
            index("./components/nonAuth/PublicLore.tsx"),
        ]),
        route("homebrew", "./components/Homebrew.tsx", [
            index("./components/homebrew/VaultDoor.tsx"),
        ]),
    ]),
    route("login", "./components/utils/Login.tsx", {id:"login"}),
    route("*?", "./components/Loading.tsx", {id:"catchall"}),
] satisfies RouteConfig