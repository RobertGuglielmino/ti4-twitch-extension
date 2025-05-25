
export const COLOR_NAME_TO_HEX = {
    white: "#FFFFFF",
    blue: "#00a8cc", //"#6EC1E4",
    purple: "#c147e9", //"#9161a8",
    yellow: "#ffde17",
    red: "#e94f64", //"#e46d72",
    green: "#00a14b",
    orange: "#FF781F",
    pink: "#FF69B4",
    "-": "unset",
};
export const ALT_COLOR_NAME_TO_HEX = {
    white: "#BBBBBB",
    blue: "#07B2FF",
    purple: "#7400B7",
    yellow: "#D6B700",
    red: "#CB0000",
    green: "#007306",
    orange: "#F3631C",
    pink: "#F46FCD",
};
export const UNKNOWN_COLOR_NAME = "-";
export const UNKNOWN_COLOR_HEX = "#ffffff";

export const FACTION_WHITELIST = new Set([
    "arborec",
    "argent",
    "creuss",
    "empyrean",
    "hacan",
    "jolnar",
    "keleres",
    "l1z1x",
    "letnev",
    "mahact",
    "mentak",
    "muaat",
    "naalu",
    "naazrokha",
    "nekro",
    "nomad",
    "norr",
    "saar",
    "sol",
    "ul",
    "vuilraith",
    "winnu",
    "xxcha",
    "yin",
    "yssaril",
]);

export const VICTORY_POINT_LAWS = ["Mutiny", "Seed of an Empire"];

export const FACTION_ABBREV_TO_FULL: {[key: string]: string} = {
    "arborec": "The Arborec",
    "argent": "The Argent Flight",
    "creuss": "The Ghosts of Creuss",
    "empyrean": "The Empyrean",
    "hacan": "The Emirates of Hacan",
    "jolnar": "The Universities of Jol-Nar",
    "keleres": "The Council Keleres",
    "l1z1x": "The L1z1x Mindnet",
    "letnev": "The Barony of Letnev",
    "mahact": "The Mahact Gene-Sorcerers",
    "mentak": "The Mentak Coalition",
    "muaat": "The Embers of Muaat",
    "naalu": "The Naalu Collective",
    "naaz-rokha": "The Naaz-Rokha Alliance",
    "nekro": "The Nekro Virus",
    "nomad": "The Nomad",
    "norr": "Sardakk N'orr",
    "saar": "The Clan of Saar",
    "sol": "The Federation of Sol",
    "ul": "The Titans of Ul",
    "vuilraith": "The Vuil'raith Cabal",
    "winnu": "The Winnu",
    "xxcha": "The Xxcha Kingdom",
    "yin": "The Yin Brotherhood",
    "yssaril": "The Yssaril Tribes"
};

export const UNKNOWN_FACTION = "cat";

export const OBJECTIVE_NAME_ABBREVIATIONS: Record<string, string> = {
    // Public
    "Diversify Research": "2 TECH 2 COLORS",
    "Develop Weaponry": "2 UNIT UPGRADES",
    "Sway the Council": "8 INFLUENCE",
    "Erect a Monument": "8 RESOURCES",
    "Negotiate Trade Routes": "5 TRADE GOODS",
    "Lead From the Front": "3 COMMAND TOKENS",
    "Intimidate Council": "2 SYS ADJ TO MR",
    "Corner the Market": "4 PLANET SAME TRAIT",
    "Found Research Outposts": "3 TECH SPECIALTY",
    "Expand Borders": "6 NON-HOME PLANET",
    "Amass Wealth": "3 INF 3 RES 3 TG",
    "Build Defenses": "4 STRUCTURES",
    "Discover Lost Outposts": "2 ATTACHMENTS",
    "Engineer a Marvel": "FLAG/WAR SUN",
    "Explore Deep Space": "3 EMPTY SYS",
    "Improve Infrastructure": "3 STRUCT NOT HOME",
    "Make History": "2 LGND/MR/ANOM",
    "Populate the Outer Rim": "3 EDGE SYS",
    "Push Boundaries": "> 2 NGHBRS",
    "Raise a Fleet": "5 NON-FGTR SHIPS",
    "Master the Sciences": "2 TECH 4 COLORS",
    "Revolutionize Warfare": "3 UNIT UPGRADES",
    "Manipulate Galactic Law": "16 INFLUENCE",
    "Found a Golden Age": "16 RESOURCES",
    "Centralize Galactic Trade": "10 TRADE GOODS",
    "Galvanize the People": "6 COMMAND TOKENS",
    "Conquer the Weak": "1 OPPONENT HOME",
    "Unify the Colonies": "6 PLANET SAME TRAIT",
    "Form Galactic Brain Trust": "5 TECH SPECIALTY",
    "Subdue the Galaxy": "11 NON-HOME PLANET",
    "Achieve Supremacy": "FLAG/WS ON MR/HS",
    "Become a Legend": "4 LGND/MR/ANOM",
    "Command an Armada": "8 NON-FGTR SHIPS",
    "Construct Massive Cities": "7 STRUCTURES",
    "Control the Borderlands": "5 EDGE SYS",
    "Hold Vast Reserves": "6 INF 6 RES 6 TG",
    "Patrol Vast Territories": "5 EMPTY SYS",
    "Protect the Border": "5 STRUCT NOT HOME",
    "Reclaim Ancient Monuments": "3 ATTACHMENTS",
    "Rule Distant Lands": "2 IN/ADJ OTHER HS",

    // Secrets
    "Become the Gatekeeper": "ALPHA AND BETA",
    "Mine Rare Minerals": "4 HAZARDOUS",
    "Forge an Alliance": "4 CULTURAL",
    "Monopolize Production": "4 INDUSTRIAL",
    "Cut Supply Lines": "BLOCKADE SD",
    "Occupy the Seat of the Empire": "MR W/ 3 SHIPS",
    "Learn the Secrets of the Cosmos": "3 ADJ TO ANOMALY",
    "Control the Region": "6 SYSTEMS",
    "Threaten Enemies": "SYS ADJ TO HOME",
    "Adapt New Strategies": "2 FACTION TECH",
    "Master the Laws of Physics": "4 TECH 1 COLOR",
    "Gather a Mighty Fleet": "5 DREADNOUGHTS",
    "Form a Spy Network": "5 ACTION CARDS",
    "Fuel the War Machine": "3 SPACE DOCKS",
    "Establish a Perimeter": "4 PDS",
    "Make an Example of Their World": "BOMBARD LAST GF",
    "Turn Their Fleets to Dust": "SPC LAST SHIP",
    "Destroy Their Greatest Ship": "DESTORY WS/FLAG",
    "Unveil Flagship": "WIN W/ FLAGSHIP",
    "Spark a Rebellion": "WIN VS LEADER",
    "Become a Martyr": "LOSE IN HOME",
    "Betray a Friend": "WIN VS PROM NOTE",
    "Brave the Void": "WIN IN ANOMALY",
    "Darken the Skies": "WIN IN HOME",
    "Defy Space and Time": "WORMHOLE NEXUS",
    "Demonstrate Your Power": "3 SHIPS SURVIVE",
    "Destroy Heretical Works": "PURGE 2 FRAGMENTS",
    "Dictate Policy": "3 LAWS IN PLAY",
    "Drive the Debate": "ELECTED AGENDA",
    "Establish Hegemony": "12 INFLUENCE",
    "Fight with Precision": "AFB LAST FIGHTER",
    "Foster Cohesion": "NEIGHBOR W / ALL",
    "Hoard Raw Materials": "12 RESOURCES",
    "Mechanize the Military": "4 PLANETS W/ MECH",
    "Occupy the Fringe": "9 GROUND FORCES",
    "Produce en Masse": "8 PROD VALUE",
    "Prove Endurance": "PASS LAST",
    "Seize an Icon": "LEGENDARY PLANET",
    "Stake Your Claim": "SHARE SYSTEM",
    "Strengthen Bonds": "PROM NOTE",
};

export const LAW_ABBREVIATIONS: { [key: string]: string } = {
    "Anti-Intellectual Revolution": "Anti-Int Revolution",
    "Classified Document Leaks": "Classified Doc Leaks",
    "Committee Formation": "Committee Formation",
    "Conventions of War": "Conv's of War",
    "Core Mining": "Core Mining",
    "Demilitarized Zone": "Demil'zd Zone",
    "Enforced Travel Ban": "Enforced Travel Ban",
    "Executive Sanctions": "Exec Sanctions",
    "Fleet Regulations": "Fleet Regs",
    "Holy Planet of Ixth": "Holy Planet of Ixth",
    "Homeland Defense Act": "Homeland Def Act",
    "Imperial Arbiter": "Imperial Arbiter",
    "Minister of Commerce": "Min of Commerce",
    "Minister of Exploration": "Min of Exploration",
    "Minister of Industry": "Min of Industry",
    "Minister of Peace": "Min of Peace",
    "Minister of Policy": "Min of Policy",
    "Minister of Sciences": "Min of Sciences",
    "Minister of War": "Min of War",
    "Prophecy of Ixth": "Proph of Ixth",
    "Publicize Weapon Schematics": "Pub Weapon Schematics",
    "Regulated Conscription": "Reg Conscription",
    "Representative Government": "Rep Gov't",
    "Research Team: Biotic": "Res Team: Biotic",
    "Research Team: Cybernetic": "Res Team: Cybernetic",
    "Research Team: Propulsion": "Res Team: Propulsion",
    "Research Team: Warfare": "Res Team: Warfare",
    "Senate Sanctuary": "Senate Sanct'y",
    "Shard of the Throne": "Shard of the Throne",
    "Shared Research": "Shared Research",
    "Terraforming Initiative": "Terrafor Initiative",
    "The Crown of Emphidia": "Crown of Emphidia",
    "The Crown of Thalnos": "Crown of Thalnos",
    "Wormhole Reconstruction": "Wormhole Reconstruct",
    "Articles of War": "Articles of War",
    "Checks and Balances": "Checks and Bal's",
    "Nexus Sovereignty": "Nexus Sovereignty",
    "Political Censure": "Pol Censure",
    "Search Warrant": "Search Warrant",
};

export const TECHNOLOGY_COLOR: { [key: string]: string } = {
    "Agency Supply Network": "yellow",
    "AI Development Algorithm": "red",
    "Advanced Carrier II": "white",
    "Aerie Hololattice": "yellow",
    "Aetherstream": "blue",
    "Antimass Deflectors": "blue",
    "Assault Cannon": "red",
    "Bio-Stims": "green",
    "Bioplasmosis": "green",
    "Carrier II": "white",
    "Chaos Mapping": "blue",
    "Crimson Legionnaire II": "white",
    "Cruiser II": "white",
    "Dacxive Animators": "green",
    "Dark Energy Tap": "blue",
    "Destroyer II": "white",
    "Dimensional Splicer": "red",
    "Dimensional Tear II": "white",
    "Dreadnought II": "white",
    "Duranium Armor": "red",
    "E-res Siphons": "yellow",
    "Exotrireme II": "white",
    "Fighter II": "white",
    "Fleet Logistics": "blue",
    "Floating Factory II": "white",
    "Genetic Recombination": "green",
    "Graviton Laser System": "yellow",
    "Gravity Drive": "blue",
    "Hegemonic Trade Policy": "yellow",
    "Hel-Titan II": "white",
    "Hybrid Crystal Fighter II": "white",
    "Hyper Metabolism": "green",
    "I.I.H.Q. Modernization": "yellow",
    "Impulse Core": "yellow",
    "Infantry II": "white",
    "Inheritance Systems": "yellow",
    "Instinct Training": "green",
    "Integrated Economy": "yellow",
    "L4 Disruptors": "yellow",
    "Lazax Gate Folding": "blue",
    "Letani Warrior II": "white",
    "Light-Wave Deflector": "blue",
    "Magen Defense Grid": "red",
    "Mageon Implants": "green",
    "Magmus Reactor": "red",
    "Memoria II": "white",
    "Mirror Computing": "yellow",
    "Neural Motivator": "green",
    "Neuroglaive": "green",
    "Non-Euclidean Shielding": "red",
    "Nullification Field": "yellow",
    "PDS II": "white",
    "Plasma Scoring": "red",
    "Pre-Fab Arcologies": "green",
    "Predictive Intelligence": "yellow",
    "Production Biomes": "green",
    "Prototype War Sun II": "white",
    "Psychoarchaeology": "green",
    "Quantum Datahub Node": "yellow",
    "Salvage Operations": "yellow",
    "Sarween Tools": "yellow",
    "Saturn Engine II": "white",
    "Scanlink Drone Network": "yellow",
    "Self Assembly Routines": "red",
    "Sling Relay": "blue",
    "Space Dock II": "white",
    "Spacial Conduit Cylinder": "blue",
    "Spec Ops II": "white",
    "Strike Wing Alpha II": "white",
    "Super-Dreadnought II": "white",
    "Supercharge": "red",
    "Temporal Command Suite": "yellow",
    "Transit Diodes": "yellow",
    "Transparasteel Plating": "green",
    "Valefar Assimilator X": "white",
    "Valefar Assimilator Y": "white",
    "Valkyrie Particle Weave": "red",
    "Voidwatch": "green",
    "Vortex": "red",
    "Wormhole Generator": "blue",
    "X-89 Bacterial Weapon": "green",
    "Yin Spinner": "green",
    "War Sun": "white",
};

export const UNIT_UPGRADES: string[] = [
    // "Advanced Carrier II",
    "Carrier II",
    // "Crimson Legionnaire II",
    "Cruiser II",
    "Destroyer II",
    // "Dimensional Tear II",
    "Dreadnought II",
    // "Exotrireme II",
    "Fighter II",
    // "Floating Factory II",
    // "Hel-Titan II",
    // "Hybrid Crystal Fighter II",
    "Infantry II",
    // "Letani Warrior II",
    // "Memoria II",
    "PDS II",
    // "Prototype War Sun II",
    // "Saturn Engine II",
    "SpaceDock II",
    // "Spec Ops II",
    // "Strike Wing Alpha II",
    // "Super-Dreadnought II",
    "WarSun",
]

export type FactionTech = {
    name: string;
    color: string;
    level: number;
    unit?: string;
};

export const FACTION_TECHNOLOGIES: {[key: string]: FactionTech[]} = {
    "arborec": [
        { name: "Bioplasmosis", color: "green", level: 2 },
        { name: "Letani Warrior II", color: "white", level: 1, unit: "infantry" }
    ],
    "argent": [
        { name: "Aerie Hololattice", color: "yellow", level: 2 },
        { name: "Strike Wing Alpha II", color: "white", level: 1, unit: "fighter" }
    ],
    "creuss": [
        { name: "Dimensional Splicer", color: "red", level: 2 },
        { name: "Wormhole Generator", color: "blue", level: 2 }
    ],
    "empyrean": [
        { name: "Aetherstream", color: "blue", level: 2 },
        { name: "Voidwatch", color: "green", level: 2 }
    ],
    "hacan": [
        { name: "Production Biomes", color: "green", level: 2 },
        { name: "Quantum Datahub Node", color: "yellow", level: 2 }
    ],
    "jolnar": [
        { name: "E-res Siphons", color: "yellow", level: 2 },
        { name: "Spacial Conduit Cylinder", color: "blue", level: 2 }
    ],
    "keleres": [
        { name: "Agency Supply Network", color: "yellow", level: 2 },
        { name: "I.I.H.Q. Modernization", color: "yellow", level: 2 }
    ],
    "l1z1x": [
        { name: "Inheritance Systems", color: "yellow", level: 2 },
        { name: "Super-Dreadnought II", color: "white", level: 1, unit: "dreadnought" }
    ],
    "letnev": [
        { name: "L4 Disruptors", color: "yellow", level: 2 },
        { name: "Non-Euclidean Shielding", color: "red", level: 2 }
    ],
    "mahact": [
        { name: "Crimson Legionnaire II", color: "white", level: 1, unit: "infantry" },
        { name: "Genetic Recombination", color: "green", level: 2 }
    ],
    "mentak": [
        { name: "Mirror Computing", color: "yellow", level: 2 },
        { name: "Salvage Operations", color: "yellow", level: 2 }
    ],
    "muaat": [
        { name: "Magmus Reactor", color: "red", level: 2 },
        { name: "Prototype War Sun II", color: "white", level: 1, unit: "warsun" }
    ],
    "naalu": [
        { name: "Hybrid Crystal Fighter II", color: "white", level: 1, unit: "fighter" },
        { name: "Neuroglaive", color: "green", level: 2 }
    ],
    "naazrokha": [
        { name: "Pre-Fab Arcologies", color: "green", level: 2 },
        { name: "Supercharge", color: "red", level: 2 }
    ],
    "nekro": [
        { name: "Valefar Assimilator X", color: "white", level: 2 },
        { name: "Valefar Assimilator Y", color: "white", level: 2 }
    ],
    "nomad": [
        { name: "Memoria II", color: "white", level: 1, unit: "flagship" },
        { name: "Temporal Command Suite", color: "yellow", level: 2 }
    ],
    "norr": [
        { name: "Exotrireme II", color: "white", level: 1, unit: "dreadnought" },
        { name: "Valkyrie Particle Weave", color: "red", level: 2 }
    ],
    "saar": [
        { name: "Chaos Mapping", color: "blue", level: 2 },
        { name: "Floating Factory II", color: "white", level: 1, unit: "spacedock" }
    ],
    "sol": [
        { name: "Advanced Carrier II", color: "white", level: 1, unit: "carrier" },
        { name: "Spec Ops II", color: "white", level: 1, unit: "infantry" }
    ],
    "ul": [
        { name: "Hel-Titan II", color: "white", level: 1, unit: "pds" },
        { name: "Saturn Engine II", color: "white", level: 1, unit: "carrier" }
    ],
    "vuilraith": [
        { name: "Dimensional Tear II", color: "white", level: 1, unit: "spacedock" },
        { name: "Vortex", color: "red", level: 2 }
    ],
    "winnu": [
        { name: "Hegemonic Trade Policy", color: "yellow", level: 2 },
        { name: "Lazax Gate Folding", color: "blue", level: 2 }
    ],
    "xxcha": [
        { name: "Instinct Training", color: "green", level: 2 },
        { name: "Nullification Field", color: "yellow", level: 2 }
    ],
    "yin": [
        { name: "Impulse Core", color: "yellow", level: 2 },
        { name: "Yin Spinner", color: "green", level: 2 }
    ],
    "yssaril": [
        { name: "Mageon Implants", color: "green", level: 2 },
        { name: "Transparasteel Plating", color: "green", level: 2 }
    ]
}
