// https://github.com/darrellanderson/TI4-TTPG-TS/blob/main/src/lib/game-data-lib/game-data/game-data.ts
// pulled from https://github.com/TI4-Online/TI4-Online.github.io/blob/main/overlay/scripts/game-data-util.js

import { LAW_ABBREVIATIONS, OBJECTIVE_NAME_ABBREVIATIONS } from "../models/dictionaries";
import { GameData, GameDataTTPG, GameDataV2, General, Law,  Player, PlayerTTPG, PublicObjective } from "../models/interfaces";

export function transformTTPGtoApp(data: GameDataTTPG): GameData {
    return {
        players: data.players.map((player: any, index: number) => getPlayer(data, player, index)),
        objectives: getObjectives(data),
        laws: getLaws(data),
        general: getGeneral(data)
    }
}


export function transformTTPGtoAppV2(data: GameDataTTPG): GameDataV2 {
    return {
        playerData: getPlayersV2(data),
        objectives: getObjectives(data),
        laws: getLaws(data),
        general: getGeneral(data)
    }
}


function getPlayersV2(data: GameDataTTPG): PlayerArrayV2 {
    let playerArray: PlayerArrayV2 = {
        name: [],
        faction: [],
        color: [],
        victoryPoints: [],
        strategyCard: [],
        strategyCardFaceDown: [],
        technologies: [],
        secretObjectives: [],
        commandCounters: [],
        actionCards: [],
        promissoryNotes: [],
        leaders: [],
        active: 0,
        speaker: 0
    };

    data.players.forEach((player: PlayerTTPG, index: number) => {
        playerArray.name[index] = player.steamName;
        playerArray.faction[index] = player.factionShort;
        playerArray.color[index] = player.color;
        playerArray.victoryPoints[index] = player.score;
        playerArray.strategyCard[index] = player.strategyCards.length > 0 ? player.strategyCards[0] : "";
        playerArray.strategyCardFaceDown[index] = player.strategyCardsFaceDown.length > 0 ? player.strategyCardsFaceDown[0] : "";
        playerArray.technologies[index] = player.technologies;
        playerArray.secretObjectives[index] = [""];
        playerArray.commandCounters[index] = player.commandTokens;
        playerArray.actionCards[index] = player.handSummary!.hasOwnProperty("Action") ? player.handSummary!.Actions! : 0;
        playerArray.promissoryNotes[index] = player.handSummary!.hasOwnProperty("Promissory") ? player.handSummary!.Promissory! : 0,
        playerArray.leaders[index] = {
            agent: player.leaders!.agent! === "unlocked",
            commander: player.leaders!.commander! === "unlocked",
            hero: player.leaders!.hero! === "unlocked",
        };

        if (player.active) {
            playerArray.active = index;
        }

        if (data.speaker === player.color) {
            playerArray.speaker = index;
        }
    });

    return playerArray;
}




    
export interface PlayerArrayV2 {
    name: string[],
    faction: string[],
    color: string[], //can maybe remove?
    victoryPoints: number[],
    strategyCard: string[],
    strategyCardFaceDown: string[],
    technologies: string[][],
    secretObjectives: string[][],
    commandCounters: { tactics: number, fleet: number, strategy: number }[],
    actionCards: number[],
    promissoryNotes: number[],
    leaders: { commander: boolean, hero: boolean, agent: boolean }[]
    active: number,
    speaker: number,
}


function getPlayer(data: GameDataTTPG, player: PlayerTTPG, index: number): Player {
    return {
        //both
        id: index,
        active: player.active!,
        name: player.steamName!,
        faction: player.factionShort!,
        color: player.color!,
        victoryPoints: player.score!,
        strategyCard: player.strategyCards![0],
        strategyCardsFaceDown: player.strategyCardsFaceDown![0],
        speaker: data.speaker === player.color,

        //extension
        technologies: player.technologies!,
        secretObjectives: [""], //player.objectives!["Secret Objectives"]!,
        commandCounters: player.commandTokens!,
        actionCards: player.handSummary!.hasOwnProperty("Action") ? player.handSummary!.Actions! : 0,
        promissoryNotes: player.handSummary!.hasOwnProperty("Promissory") ? player.handSummary!.Promissory! : 0,
        leaders: {
            agent: player.leaders!.agent! === "unlocked",
            commander: player.leaders!.commander! === "unlocked",
            hero: player.leaders!.hero! === "unlocked",
        },
    }
}

function getObjectives(data: GameDataTTPG): any {

    // TODO player id, secret parse, speakre parse from color

    function formatPublicIObjectives() {
      const objectives: PublicObjective[] = [];
        data.objectives["Public Objectives I"].map((objective: string) => {
            let newObjective: PublicObjective = {
                id: 0,
                name: objective,
                description: OBJECTIVE_NAME_ABBREVIATIONS[objective] || "Unknown Objective",
                points: 1,
                scored: [],
                progress: {}
            }

            data.players.forEach((player: PlayerTTPG, index: number) => {
                const playerObjectives = player?.objectives || [];
                if (playerObjectives.includes(objective)) {
                    newObjective.scored.push(index);
                }
            });

            // TODO uncomment when TTPG has progress data            
            // data.objectiveProgress.forEach((objectiveProgress: any, index: number) => {
            //     if (objectiveProgress.name === objective.name) {
            //         newObjective.progress = data.objectivesProgress.progress || { header: "-", values: [] };
            //     }
            // });
            objectives.push(newObjective);
        });
        return objectives;
    }

    function formatPublicIIObjectives() {
      const objectives: PublicObjective[] = [];
        data.objectives["Public Objectives II"].map((objective: string) => {
            let newObjective: PublicObjective = {
                id: 0,
                name: objective,
                description: OBJECTIVE_NAME_ABBREVIATIONS[objective] || "Unknown Objective",
                points: 1,
                scored: [],
                progress: {}
            }

            data.players.forEach((player: PlayerTTPG, index: number) => {
                const playerObjectives = player?.objectives || [];
                if (playerObjectives.includes(objective)) {
                    newObjective.scored.push(index);
                }
            });

            // TODO uncomment when TTPG has progress data            
            // data.objectiveProgress.forEach((objectiveProgress: any, index: number) => {
            //     if (objectiveProgress.name === objective.name) {
            //         newObjective.progress = data.objectivesProgress.progress || { header: "-", values: [] };
            //     }
            // });
            objectives.push(newObjective);
        });
        return objectives;
    }

    function formatSecretObjectives() {
      const objectives: PublicObjective[] = [];
        data.objectives["Secret Objectives"].map((objective: string) => {
            let newObjective: PublicObjective = {
                id: 0,
                name: objective,
                description: OBJECTIVE_NAME_ABBREVIATIONS[objective] || "Unknown Objective",
                points: 1,
                scored: [],
                progress: {}
            }

            data.players.forEach((player: PlayerTTPG, index: number) => {
                const playerObjectives = player?.objectives || [];
                if (playerObjectives.includes(objective)) {
                    newObjective.scored.push(index);
                }
            });

            objectives.push(newObjective);
        });
        return objectives;
    }

    function formatCustodiansPoints() {
        return {
            name: "Custodians Points",
            points: 1,
            scored: data.players.map((player: any) => {
                return player.custodiansPoints || 0;
            })
        }
    }


    const custodians = formatCustodiansPoints();

    return {
        public: [...formatPublicIObjectives(), ...formatPublicIIObjectives()],
        secret: formatSecretObjectives(),
        mecatol: custodians
    }
}

function getGeneral(data: GameDataTTPG): General {
    return {
        round: data.round!,
        speaker: data.speaker!,
        activePlayer: data.turn!,
        time: data.timer!.seconds.toString()
    }
}

function getLaws(gameData: GameDataTTPG): Law[] {
    const laws = gameData?.laws || [];

    return laws.map((law: any) => {
        let tempLaw = {
            name: law,
            description: LAW_ABBREVIATIONS[law] || law
        }

        for (const player of gameData.players) {
            if (player.laws!.includes(law.name)) {
                return {
                    ...tempLaw,
                    electedPlayer: player.steamName
                }
            }
        }

        return tempLaw;
    });
}
