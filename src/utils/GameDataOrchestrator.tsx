

export function transformTTPGtoApp(data: any) {






    // export interface GameData {
    //     players: Player[],
    //     objectives: Objectives
    //     laws: Law[],
    //     general: General,
    // }

    // export interface Player {
    //     id: number,
    //     name: string,
    //     faction: string,
    //     factionIcon: string, // Path to custom faction PNG
    //     color: string,
    //     victoryPoints: number,
    //     strategyCard: string,
    //     technologies: string[],
    //     secretObjectives: string[],
    //     commandCounters: { tactics: number, fleet: number, strategy: number },
    //     actionCards: number,
    //     promissoryNotes: number,
    //     leaders: { commander: boolean, hero: boolean, agent: boolean }
    // }

    // export interface Objectives {
    //     public: PublicObjective[],
    //     secret: any[],
    //     mecatol: MecatolRexObjective
    // }

    // export interface PublicObjective {
    //     id: number,
    //     name: string,
    //     description: string,
    //     points: number,
    //     scored: number[],
    //     progress: { [key: number]: string }
    // }

    // export interface SecretObjective {
    //     id: number,
    //     name: string,
    //     description: string,
    //     points: number,
    //     scored: number[],
    //     progress: { [key: number]: string }
    // }

    // export interface MecatolRexObjective {
    //     name: string,
    //     description: string,
    //     points: number,
    //     scored: number[]
    // }

    // export interface Law {
    //     name: string,
    //     description: string,
    //     electedPlayer?: string
    // }

    // export interface General {
    //     round: number,
    //     speaker: string,
    //     activePlayer: string,
    //     time: string
    // }
}

// pulled from https://github.com/TI4-Online/TI4-Online.github.io/blob/main/overlay/scripts/game-data-util.js

function getPlayer(data: any) {


    // faction = faction.replace("-", ""); // naaz-rokha
    // faction = faction.replace("'", ""); // vuil'raith, n'orr

    // if (faction.startsWith("keleres")) {
    //   faction = "keleres"; // strip off flavor
    // }

    return {
        id: data.id,
        name: data.SteamName,
        faction: data.factionName,
        factionIcon: data.factionIcon,
        color: data.color,
        victoryPoints: data.score,
        strategyCard: data.strategyCards[0],
        technologies: data.technologies,
        secretObjectives: data.secretObjectives,
        commandCounters: data.commandCounters,
        actionCards: data.handSummary.hasOwnProperty("Action") ? data.handSummary.Action : 0,
        promissoryNotes: data.handSummary.hasOwnProperty("Promissory") ? data.handSummary.Promissory : 0,
        leaders: data.leaders
    }
}

function getObjectives(data: any): Objectives {
    id: number,
        name: string,
            description: string,
                points: number,
                    scored: number[],
                        progress: { [key: number]: string }

    const publicStage1s = data.objectives!["Public Objectives I"].forEach((objective: any) => {
        let newObjective = {
            id: 0,
            name: objective,
            description: OBJECTIVE_NAME_ABBREVIATIONS[name],
            points: 1,
            scored: [],
            progress: {}
        }

        for (const player of data.players) {
            const playerObjectives = player?.objectives || [];
            if (playerObjectives.includes(name)) {
                newObjective.scored.append(player.id);
            }
        }
        
        // add progress
        for (const objectiveProgress of data.objectiveProgress) {
            if (objectiveProgress.name === objective.name) {
                newObjective.progress = data.objectivesProgress.progress || { header: "-", values: [] };
            }
        }
    });

        
    const publicStage2s = data.objectives!["Public Objectives II"].forEach((objective: any) => {
        let newObjective = {
            id: 0,
            name: objective,
            description: OBJECTIVE_NAME_ABBREVIATIONS[name],
            points: 2,
            scored: [],
            progress: {}
        }

        for (const player of data.players) {
            const playerObjectives = player?.objectives || [];
            if (playerObjectives.includes(name)) {
                newObjective.scored.append(player.id);
            }
        }
    
        // add progress
    });

    // repeat for stage 2, secret, custodians



    return {
        public: data.objectives["Public Objectives I"].map((obj: any) => ({
            id: obj.id,
            name: obj.name,
            description: obj.description,
            points: obj.points,
            scored: obj.scored,
            progress: obj.progress
        })),
        secret: data.objectives["Secret Objectives"].map((obj: any) => ({
            id: obj.id,
            name: obj.name,
            description: obj.description,
            points: obj.points,
            scored: obj.scored,
            progress: obj.progress
        })),
        mecatol: {
            name: data.objectives.mecatol.name,
            description: data.objectives.mecatol.description,
            points: data.objectives.mecatol.points,
            scored: data.objectives.mecatol.scored
        }
        //custodiansPoints
    }
}

function getGeneral(data: any) {
    return {
        round: data.round,
        speaker: data.speaker,
        activePlayer: data.turn,
        time: data.time
    }
}


export interface Objectives {
    public: PublicObjective[],
    secret: any[],
    mecatol: MecatolRexObjective
}

export interface PublicObjective {
    id: number,
    name: string,
    description: string,
    points: number,
    scored: number[],
    progress: { [key: number]: string }
}



  /**
   * Parse laws.
   *
   * @param {Object} gameData
   * @returns {Array.{{name:string,colors:Array.{string}}}
   */
  static parseLaws(gameData) {
    console.assert(typeof gameData === "object");

    const laws = gameData?.laws || [];

    const lawToColorNames = {};
    for (const law of laws) {
        lawToColorNames[law] = [];
    }

    const playerDataArray = GameDataUtil.parsePlayerDataArray(gameData);
    for (const playerData of playerDataArray) {
        const colorNameAndHex = GameDataUtil.parsePlayerColor(playerData);
        const playerLaws = playerData?.laws || [];
        for (const playerLaw of playerLaws) {
            const entry = lawToColorNames[playerLaw];
            if (!entry) {
                continue; // law not registered at top?
            }
            entry.push(colorNameAndHex.colorName);
        }
    }

    return laws.map((law) => {
        const colorNames = lawToColorNames[law] || [];
        const name = GameDataUtil._escapeForHTML(law);
        let abbr = LAW_ABBREVIATIONS[name];
        if (!abbr) {
            abbr = name;
        }
        return { name, abbr, colorNames };
    });
}



const COLOR_NAME_TO_HEX = {
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
// const ALT_COLOR_NAME_TO_HEX = {
//   white: "#BBBBBB",
//   blue: "#07B2FF",
//   purple: "#7400B7",
//   yellow: "#D6B700",
//   red: "#CB0000",
//   green: "#007306",
//   orange: "#F3631C",
//   pink: "#F46FCD",
// };
const UNKNOWN_COLOR_NAME = "-";
const UNKNOWN_COLOR_HEX = "#ffffff";

const FACTION_WHITELIST = new Set([
    "arborec",
    "argent",
    "bobert",
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
const UNKNOWN_FACTION = "cat";

const OBJECTIVE_NAME_ABBREVIATIONS = {
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

const LAW_ABBREVIATIONS = {
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

const TECHNOLOGY_COLOR = {
    "Agency Supply Network": "yellow",
    "AI Development Algorithm": "red",
    "Advanced Carrier II": "white",
    "Aerie Hololattice": "yellow",
    Aetherstream: "blue",
    "Antimass Deflectors": "blue",
    "Assault Cannon": "red",
    "Bio-Stims": "green",
    Bioplasmosis: "green",
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
    Neuroglaive: "green",
    "Non-Euclidean Shielding": "red",
    "Nullification Field": "yellow",
    "PDS II": "white",
    "Plasma Scoring": "red",
    "Pre-Fab Arcologies": "green",
    "Predictive Intelligence": "yellow",
    "Production Biomes": "green",
    "Prototype War Sun II": "white",
    Psychoarchaeology: "green",
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
    Supercharge: "red",
    "Temporal Command Suite": "yellow",
    "Transit Diodes": "yellow",
    "Transparasteel Plating": "green",
    "Valefar Assimilator X": "white",
    "Valefar Assimilator Y": "white",
    "Valkyrie Particle Weave": "red",
    Voidwatch: "green",
    Vortex: "red",
    "Wormhole Generator": "blue",
    "X-89 Bacterial Weapon": "green",
    "Yin Spinner": "green",
    "War Sun": "white",
};