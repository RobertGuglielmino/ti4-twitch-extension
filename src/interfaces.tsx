

export interface StrategyCards {
    [key: string]: {
        icon: string;
        color: string;
    };
}

export interface GameData {
    players: Player[],
    objectives: Objectives
    laws: Law[],
    general: General,
}

export interface Player {
    id: number,
    name: string,
    faction: string,
    factionIcon: string, // Path to custom faction PNG
    color: string,
    victoryPoints: number,
    strategyCard: string,
    technologies: string[],
    secretObjectives: string[],
    commandCounters: { tactics: number, fleet: number, strategy: number },
    actionCards: number,
    promissoryNotes: number,
    leaders: { commander: boolean, hero: boolean, agent: boolean }
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

export interface SecretObjective {
    id: number,
    name: string,
    description: string,
    points: number,
    scored: number[],
    progress: { [key: number]: string }
}

export interface MecatolRexObjective {
    name: string,
    description: string,
    points: number,
    scored: number[]
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


export interface ObjectivesSheet {
    public: PublicObjectiveSheet[],
    secret: any[],
    mecatol: MecatolRexObjectiveSheet
}

export interface PublicObjectiveSheet {
    id: number,
    name: string,
    description: string,
    points: number,
    scored: number[],
    progress: { [key: number]: string }
}

export interface SecretObjectiveSheet {
    id: number,
    name: string,
    description: string,
    points: number,
    scored: number[],
    progress: { [key: number]: string }
}

export interface MecatolRexObjectiveSheet {
    name: string,
    description: string,
    points: number,
    scored: number[]
}