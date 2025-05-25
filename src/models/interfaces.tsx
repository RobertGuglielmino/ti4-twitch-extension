

export interface StrategyCards {
    [key: string]: {
        icon: string;
        color: string;
    };
}


/* ############################## */
/* ##### Output Data to App V2 ##### */
/* ############################## */


export interface GameDataV2 {
    playerData: PlayerArrayV2,
    objectives: Objectives
    laws: Law[],
    general: General,
}

//access pattern now data.players.commandCounters.tactics[PLAYER_ID] instead of data.players[PLAYER_ID].commandCounters.tactics

export interface PlayerArrayV2 {
    name: string[],
    faction: string[],
    color: string[], //can maybe remove?
    victoryPoints: number[],
    strategyCard: string[],
    strategyCardsFaceDown: string[],
    technologies: {
        blue: boolean[][],
        red: boolean[][],
        yellow: boolean[][],
        green: boolean[][],
        unit: boolean[][],
        faction: boolean[][]
    },
    secretObjectives: string[][],
    commandCounters: { tactics: number[], fleet: number[], strategy: number[] },
    commodities: number[],
    tradeGoods: number[],
    maxCommodities: number[],
    actionCards: number[],
    promissoryNotes: number[],
    leaders: { commander: boolean[], hero: boolean[], agent: boolean[] },
    active: number,
    speaker: number,
}

/* ############################## */
/* ##### Output Data to App ##### */
/* ############################## */


export interface GameData {
    players: Player[],
    objectives: Objectives
    laws: Law[],
    general: General,
}

export interface Player {
    id: number,
    name: string,
    active: boolean,
    faction: string,
    color: string,
    victoryPoints: number,
    strategyCard: string,
    strategyCardsFaceDown: string,
    speaker: boolean,
    technologies: {
        blue: boolean[],
        red: boolean[],
        yellow: boolean[],
        green: boolean[],
        unit: boolean[],
        faction: boolean[]
    }
    secretObjectives: string[],
    commandCounters: { tactics: number, fleet: number, strategy: number },
    commodities: number,
    tradeGoods: number,
    maxCommodities: number,
    actionCards: number,
    promissoryNotes: number,
    leaders: { commander: boolean, hero: boolean, agent: boolean }
}

export interface Objectives {
    public1: ProgressObjective[],
    public2: ProgressObjective[],
    secret: Objective,
    mecatol: Objective,
    agenda: Objective,
    relics: Objective[],
}

export interface Objective {
    name: string,
    points: number,
    description: string,
    scored: number[]
}

export interface ProgressObjective extends Objective {
    id: number,
    progress: string[]
}


export interface Law {
    name: string,
    description: string,
    electedPlayer?: string
}

export interface General {
    round: number,
    speaker: string,
    activePlayer: string,
    time: string
}

/* ############################## */
/* #### Input Data from TTPG #### */
/* ############################## */

export interface GameDataTTPG {
    players: PlayerTTPG[];

    activeSystem?: ActiveSystemTTPG;
    config?: ConfigTTPG;
    hexSummary?: string;
    laws?: string[]; // card names
    mapString?: string;
    objectives: ObjectiveTypesTTPG;
    platform?: string;
    round?: number;
    scoreboard?: number; // game to 10/14 points
    setupTimestamp?: number; // epoch time (seconds)
    speaker?: string; // player color
    timer?: TimerTTPG;
    timestamp?: number; // epoch time (seconds)
    turn?: string; // player color
}

export interface PlayerTTPG {
    active: boolean;
    color: string;
    commandTokens: PlayerCommandTokensTTPG;
    custodiansPoints: number;
    factionFull: string; // "The Federation of Sol"
    factionShort: string; // "Sol"
    handSummary: PlayerHandSummaryTTPG;
    laws: string[]; // card names
    leaders: PlayerLeadersTTPG;
    objectives: string[]; // card names
    planetTotals: PlayerPlanetTotalsTTPG;
    score: number;
    steamName: string;
    strategyCards: string[]; // strategy card names
    strategyCardsFaceDown: string[]; // strategy card names
    technologies: string[]; // abbr names
    turnOrder: number; // index in turn order array

    commodities: number;
    tradeGoods: number;
    maxCommodities: number;
}


export interface ObjectiveTypesTTPG {
    "Public Objectives I": string[],
    "Public Objectives II": string[],
    "Secret Objectives": string[]
}


export interface ActiveSystemTTPG {
    tile: number;
    planets: string[];
};

export interface ConfigTTPG {
    pok ?: boolean;
    codex1 ?: boolean;
    codex2 ?: boolean;
    codex3 ?: boolean;
    codex4 ?: boolean;
};

export interface ObjectivesTTPG {
    PublicObjectivesI ?: string[];
    PublicObjectivesII ?: string[];
    SecretObjectives ?: string[];
    Agenda ?: string[];
    Relics ?: string[];
    Other ?: string[];
};

export interface PlayerCommandTokensTTPG {
    tactics: number;
    fleet: number;
    strategy: number;
};

export interface PlayerLeadersTTPG {
    agent?: "locked" | "unlocked";
    commander?: "locked" | "unlocked";
    hero?: "locked" | "unlocked";
};

export interface PlayerHandSummaryTTPG {
    "Secret Objectives"?: number;
    Actions?: number;
    Promissory?: number;
};

export interface PlayerPlanetTotalsTTPG {
    influence: { avail: number; total: number };
    resources: { avail: number; total: number };
    techs: { blue: number; red: number; green: number; yellow: number };
    traits: { cultural: number; hazardous: number; industrial: number };
    legendary: number;
};

export interface TimerTTPG {
    seconds: number;
    anchorTimestamp: number;
    anchorSeconds: number;
    direction: -1 | 0 | 1;
    countDown: number;
}