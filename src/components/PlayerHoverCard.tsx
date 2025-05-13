import { COLOR_NAME_TO_HEX, TECHNOLOGY_COLOR } from "../models/dictionaries";
import { Player, StrategyCards } from "../models/interfaces";
import OverlayNumber from "./DisplayComponents/OverlayNumber";
import TechItem from "./DisplayComponents/TechItem";
import LeaderItem from "./DisplayComponents/LeaderItem";
import SecretObjItem from "./DisplayComponents/SecretObjItem";
import CCTokenItem from "./DisplayComponents/CCTokenItem";
import Promissory from "./DisplayComponents/Trade/Promissory";
import ActionCards from "./DisplayComponents/Trade/ActionCards";
import Commodities from "./DisplayComponents/Trade/Commodities";
import TradeGoods from "./DisplayComponents/Trade/TradeGoods";

// Strategy card icons and colors
const strategyCards: StrategyCards = {
    "Leadership": { icon: "👑", color: "#f39c12" },
    "Diplomacy": { icon: "🤝", color: "#27ae60" },
    "Politics": { icon: "📜", color: "#8e44ad" },
    "Construction": { icon: "🏗️", color: "#d35400" },
    "Trade": { icon: "💰", color: "#f1c40f" },
    "Warfare": { icon: "⚔️", color: "#c0392b" },
    "Technology": { icon: "🔬", color: "#2980b9" },
    "Imperial": { icon: "👑", color: "#7f8c8d" }
};


interface PlayerHoverCardProps {
    player: Player,
    hoverIcon: any,
}

interface TechnologyColors {
    [key: string]: string;
}
const techColors: TechnologyColors = {
    blue: "#3498db",    // Propulsion
    green: "#2ecc71",   // Biotic
    red: "#e74c3c",     // Warfare
    yellow: "#f1c40f"   // Cybernetic
};



// name: string,
// faction: string,
// color: string,
// victoryPoints: number,
// strategyCard: string,
// technologies: string[],
// secretObjectives: string[],
// commandCounters: { tactics: number, fleet: number, strategy: number },
// actionCards: number,
// promissoryNotes: number,
// leaders: { commander: boolean, hero: boolean, agent: boolean }


// Player hover card component
const PlayerHoverCard = ({ player, hoverIcon }: PlayerHoverCardProps) => {

    const techColors = ["blue", "red", "yellow", "green"];

    return (
        <div className="border-red-400 text-center font-astro border-2 absolute left-0 bottom-16 z-50  rounded-lg p-3 shadow-xl border border-gray-700 w-80 text-white">
            <div className="absolute inset-0 bg-[url(../assets/backgrounds/tile_049.png)] bg-scale-[auto_200px] bg-[length:auto_150%] bg-center brightness-25"></div>
            <div className="relative z-10">

                <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full mr-2 flex items-center justify-center" style={{ backgroundColor: player.color }}>
                        <img
                            src={hoverIcon}
                            alt={player.faction}
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-astro text-lg truncate">{player.name}</h3>
                        <p className="text-md text-gray-300 truncate font-avalors">{player.faction.toUpperCase()}</p>
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded-lg flex items-center border-2 border-yellow-600 ml-2">
                        {/* <Star size={14} className="text-yellow-400 mr-1" /> */}
                        <OverlayNumber>{player.victoryPoints}</OverlayNumber>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">

                    <div className="col-span-2 flex flex-col gap-2">

                        <div className="basis-1">
                            <h4 className="font-avalors text-sm uppercase text-gray-400 mb-1">Counters</h4>

                            <div className="flex flex-row justify-center gap-2">
                                <CCTokenItem tokenType="TAC">{player.commandCounters.tactics}</CCTokenItem>
                                <CCTokenItem tokenType="FLT">{player.commandCounters.fleet}</CCTokenItem>
                                <CCTokenItem tokenType="STR">{player.commandCounters.strategy}</CCTokenItem>
                            </div>
                        </div>

                        <div className="basis-1">
                            <h4 className="font-avalors text-sm uppercase text-gray-400 mb-1">Trade</h4>
                            <div className="flex flex-row justify-center gap-1">
                                <ActionCards>2</ActionCards>
                                <Promissory>2</Promissory>
                                <Commodities>0/2</Commodities>
                                <TradeGoods>3</TradeGoods>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="font-avalors text-sm uppercase text-gray-400">Leaders</h4>
                        <LeaderItem {...player.leaders} />
                    </div>

                </div>
                <div className="grid grid-cols-2 mb-3">
                    <div>
                        <h4 className="font-avalors text-sm uppercase text-gray-400 mb-1">Technologies</h4>

                        <div className="flex flex-col g-1">
                            {techColors.map((color) => {
                                if (player.technologies.map(tech => TECHNOLOGY_COLOR[tech]).includes(color)) {
                                    return (<div key={color} className="flex flex-col">
                                        <TechItem color={color} technologies={player.technologies.filter((tech) => TECHNOLOGY_COLOR[tech] === color)} />
                                    </div>)
                                }
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between">
                        <div className="gap-1">
                            <h4 className="font-avalors text-sm uppercase text-gray-400 mb-1">Unit Upgrades</h4>
                            {player.technologies.map(tech => TECHNOLOGY_COLOR[tech]).includes("white") &&
                             <TechItem color={'white'} technologies={player.technologies.filter((tech) => TECHNOLOGY_COLOR[tech] === 'white')} />}
                        </div>
                        <h4 className="font-avalors text-sm uppercase text-gray-400 mb-1">Secrets</h4>
                        <SecretObjItem secrets={player.secretObjectives} inHand={1} />
                    </div>
                </div>
            </div>


        </div>
    );
};



function getBGIconStyles(color: string) {
    let hexColor = "";
    console.log(color);

    switch (color) {
        case "red":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.red;
            break;
        case "blue":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.blue;
            break;
        case "purple":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.purple;
            break;
        case "yellow":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.yellow;
            break;
        case "white":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.white;
            break;
        case "green":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.green;
            break;
        case "orange":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.orange;
            break;
        case "pink":
            console.log(color);
            hexColor = COLOR_NAME_TO_HEX.pink;
            break;
        default:
            console.log(color);
            hexColor = "#000000"; //black
            break;
    }

    // Format the output correctly for Tailwind arbitrary values
    return `bg-[${hexColor}]`;
}

function getHoverCardStyles(color: string) {
    let styling = "";
    let output = "";
    switch (color) {
        case "red":
            styling = COLOR_NAME_TO_HEX.red;
            output = `border-color-[${styling}] border-2`;
            break;
        case "blue":
            styling = COLOR_NAME_TO_HEX.blue;
            output = `border-color-[${styling}] border-2`;
            break;
        case "purple":
            styling = COLOR_NAME_TO_HEX.purple;
            output = `border-color-[${styling}] border-2`;
            break;
        case "yellow":
            styling = COLOR_NAME_TO_HEX.yellow;
            output = `border-color-[${styling}] border-2`;
            break;
        case "white":
            styling = COLOR_NAME_TO_HEX.white;
            output = `border-color-[${styling}] border-2`;
            break;
        case "green":
            styling = COLOR_NAME_TO_HEX.green;
            output = `border-color-[${styling}] border-2`;
            break;
        case "orange":
            styling = COLOR_NAME_TO_HEX.orange;
            output = `border-color-[${styling}] border-2`;
            break;
        case "pink":
            styling = COLOR_NAME_TO_HEX.pink;
            output = `border-color-[${styling}] border-2`;
            break;
        default:
            output = "#000000"; //black
            break;
    }
    return output;
}
function getTTPGColor(color: string): string {
    switch (color) {
        case "red": return COLOR_NAME_TO_HEX.red;
        case "blue": return COLOR_NAME_TO_HEX.blue;
        case "purple": return COLOR_NAME_TO_HEX.purple;
        case "yellow": return COLOR_NAME_TO_HEX.yellow;
        case "white": return COLOR_NAME_TO_HEX.white;
        case "green": return COLOR_NAME_TO_HEX.green;
        case "orange": return COLOR_NAME_TO_HEX.orange;
        case "pink": return COLOR_NAME_TO_HEX.pink;
        default: return "#000000"; //black
    }
}



export default PlayerHoverCard;