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
            route("herzog", "./components/world/Herzog.tsx",),
            ...prefix("herzog", [
                route("grummond", "./components/world/Grummond.tsx",),
                route("durinhast", "./components/world/DurinHast.tsx"),
                route("breitdecke", "./components/world/Breitdecke.tsx"),
                route("hukschtein", "./components/world/Hukschtein.tsx"),
            ]),
            route("draconia", "./components/world/Draconia.tsx"),
            ...prefix("draconia", [
                route("pyrus", "./components/world/Pyrus.tsx",),
            ]),
            route("dramir", "./components/world/Dramir.tsx"),
            route("elandir", "./components/world/Elandir.tsx"),
            ...prefix("elandir", [
                route("taishta", "./components/world/Taishta.tsx",),
                route("valeus", "./components/world/Valeus.tsx"),
            ]),
            route("faena", "./components/world/Faena.tsx"),
            ...prefix("faena", [
                route("wither", "./components/world/Wither.tsx",),
                route("lythe", "./components/world/Lythe.tsx"),
            ]),
            route("praetor", "./components/world/Praetor.tsx"),
            ...prefix("praetor", [
                route("seagate", "./components/world/Seagate.tsx",),
                route("promisory", "./components/world/Promisory.tsx"),
                route("halfhall", "./components/world/HalfHall.tsx"),
                route("schism", "./components/world/Schism.tsx"),
            ]),
            route("rokesh", "./components/world/Rokesh.tsx"),
            ...prefix("rokesh", [
                route("makdur", "./components/world/MakDur.tsx",),
            ]),
            route("wildlands", "./components/world/Wildlands.tsx"),
            ...prefix("wildlands", [
                route("pon", "./components/world/Pon.tsx",),
            ]),
        ]),
        route("lore", "./components/Lore.tsx", [
            index("./components/nonAuth/PublicLore.tsx"),
        ]),
        ...prefix("lore", [            
            route("portal", "./components/lore/Portal.tsx"),
            route("creators", "./components/lore/Creators.tsx"),
        ]),
        route("homebrew", "./components/Homebrew.tsx", [
            index("./components/homebrew/VaultDoor.tsx"),
        ]),
    ]),
    route("login", "./components/utils/Login.tsx", {id:"login"}),
    route("result", "./components/Result.tsx", {id:"result"}),
    route("*?", "./components/Loading.tsx", {id:"catchall"}),
    route("error", "./components/Error.tsx", {id:"error"}),
] satisfies RouteConfig