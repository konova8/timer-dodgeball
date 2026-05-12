export const teamLogos = [
    "aidb-quadrato",
    "aidb",
    "ghinea",
    "goblins",
    "lions",
    "lugo",
    "oragiobat",
    "shamrock-nuovo-verde",
    "shamrock-nuovo",
    "shamrock-vecchio",
    "springout-nuovo",
    "springout-vecchio",
    "faenza-gryphons",
    "swarm",
] as const
export type TeamLogo = (typeof teamLogos)[number]

export const isTeamLogo = (str: string): str is TeamLogo =>
    teamLogos.some(logo => logo === str)

export type TeamLogoData = {
    imagePath: string
    logoName: string
}

export const teamLogoData: Record<TeamLogo, TeamLogoData> = {
    "aidb-quadrato": {
        imagePath: "/images/logos/aidb-quadrato.jpg",
        logoName: "AIDB Quadrato",
    },
    aidb: { imagePath: "/images/logos/aidb.png", logoName: "AIDB" },
    ghinea: { imagePath: "/images/logos/ghinea.png", logoName: "Ghinea" },
    goblins: { imagePath: "/images/logos/goblins.png", logoName: "Goblins" },
    lions: { imagePath: "/images/logos/lions.png", logoName: "Lions" },
    lugo: { imagePath: "/images/logos/lugo.png", logoName: "Lugo" },
    oragiobat: {
        imagePath: "/images/logos/oragiobat.png",
        logoName: "OraGioBat",
    },
    "shamrock-nuovo-verde": {
        imagePath: "/images/logos/shamrock-nuovo-verde.jpg",
        logoName: "Shamrock Nuovo Verde",
    },
    "shamrock-nuovo": {
        imagePath: "/images/logos/shamrock-nuovo.jpg",
        logoName: "Shamrock Nuovo",
    },
    "shamrock-vecchio": {
        imagePath: "/images/logos/shamrock-vecchio.png",
        logoName: "Shamrock Vecchio",
    },
    "springout-nuovo": {
        imagePath: "/images/logos/springout-nuovo.png",
        logoName: "Springout Nuovo",
    },
    "springout-vecchio": {
        imagePath: "/images/logos/springout-vecchio.png",
        logoName: "Springout Vecchio",
    },
    "faenza-gryphons": {
        imagePath: "/images/logos/faenza-gryphons.jpg",
        logoName: "Faenza Gryphons",
    },
    swarm: { imagePath: "/images/logos/swarm.png", logoName: "Swarm" },
}
