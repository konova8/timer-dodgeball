export type TeamLogo = keyof typeof teamLogos

export const teamLogos = {
    "aidb-quadrato": "/images/logos/aidb-quadrato.jpg",
    aidb: "/images/logos/aidb.png",
    ghinea: "/images/logos/ghinea.png",
    goblins: "/images/logos/goblins.png",
    lions: "/images/logos/lions.png",
    lugo: "/images/logos/lugo.png",
    oragiobat: "/images/logos/oragiobat.png",
    "shamrock-nuovo-verde": "/images/logos/shamrock-nuovo-verde.jpg",
    "shamrock-nuovo": "/images/logos/shamrock-nuovo.jpg",
    "shamrock-vecchio": "/images/logos/shamrock-vecchio.png",
    "springout-nuovo": "/images/logos/springout-nuovo.png",
    "springout-vecchio": "/images/logos/springout-vecchio.png",
    swarm: "/images/logos/swarm.png",
} as const

export const teamName: Record<TeamLogo, string> = {
    "aidb-quadrato": "AIDB Quadrato",
    aidb: "AIDB",
    ghinea: "Ghinea",
    goblins: "Goblins",
    lions: "Lions",
    lugo: "Lugo",
    oragiobat: "Oragiobat",
    "shamrock-nuovo-verde": "Shamrock",
    "shamrock-nuovo": "Shamrock",
    "shamrock-vecchio": "Shamrock",
    "springout-nuovo": "Springout",
    "springout-vecchio": "Springout",
    swarm: "Swarm",
}
