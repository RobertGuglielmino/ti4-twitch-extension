
import { Player } from "../../../models/interfaces";
import OverlayNumber from "../General/OverlayNumber";
import LeaderItem from "./Leaders/LeaderItem";
import SecretObjItem from "./Secret/SecretObjItem";
import Promissory from "./Trade/Promissory";
import ActionCards from "./Trade/ActionCards";
import Commodities from "./Trade/Commodities";
import TradeGoods from "./Trade/TradeGoods";
import UnitUpgrades from "./Tech/UnitUpgrades";
import TechTree from "./Tech/TechTree"
import SectionHeader from "../ObjectivePage/TableItems/SectionHeader";
import CCSheet from "./Trade/CCSheet";
import FactionTechs from "./Tech/FactionTechs";
import { FACTION_ABBREV_TO_FULL, FACTION_TECHNOLOGIES } from "../../../models/dictionaries";

const PlayerHoverCard = ({ player, hoverIcon, getImageSrc }: PlayerHoverCardProps) => {

    const techColors = ["blue","red","yellow","green"];

    return (
        <div className="border-red-400 text-center font-astro border-2 absolute left-0 bottom-16 z-50 rounded-lg p-3 shadow-xl border border-gray-700 w-120 max-h-[100vh] text-white">
            <div className="absolute inset-0 bg-[url(@icons/backgrounds/tile_049.png)] bg-scale-[auto_200px] bg-[length:auto_150%] bg-center brightness-25"></div>
            <div className="relative z-10">
                <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full mr-2 flex items-center justify-center" style={{ backgroundColor: player.color }}>
                        <img
                            src={getImageSrc(hoverIcon)}
                            alt={player.faction}
                            className="w-8 h-8 object-contain"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-astro text-lg truncate">{player.name}</h3>
                        <p className="text-md text-gray-300 truncate font-avalors">{FACTION_ABBREV_TO_FULL[player.faction.toLowerCase()]}</p>
                    </div>
                    <div className="bg-gray-800 px-2 py-1 rounded-lg flex items-center border-2 border-yellow-600 ml-2">
                        <OverlayNumber>{player.victoryPoints}</OverlayNumber>
                    </div>
                </div>

                <div className="flex flew-row gap-3 justify-evenly">
                    <div className="flex flex-col">
                        <div className="w-auto">
                            <SectionHeader>Trade</SectionHeader>
                            <div className="flex flex-row w-auto gap-4">
                                <ActionCards getImageSrc={(id) => getImageSrc(id)}>{player.actionCards}</ActionCards>
                                <Promissory getImageSrc={(id) => getImageSrc(id)}>{player.promissoryNotes}</Promissory>
                                <Commodities getImageSrc={(id) => getImageSrc(id)}>
                                    <span>
                                        {player.commodities} 
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {` / ${player.maxCommodities}`}
                                    </span>
                                    </Commodities>
                                <TradeGoods getImageSrc={(id) => getImageSrc(id)}>{player.tradeGoods}</TradeGoods>
                            </div>
                            {/* <div className="grid grid-cols-2 w-auto gap-1">
                                <ActionCards>{player.actionCards}</ActionCards>
                                <Promissory>{player.promissoryNotes}</Promissory>
                                <Commodities>{player.commodities}/{player.maxCommodities}</Commodities>
                                <TradeGoods>{player.tradeGoods}</TradeGoods>
                            </div> */}
                        </div>

                        <SectionHeader>Counters</SectionHeader>
                        <CCSheet getImageSrc={(id) => getImageSrc(id)} player={player} />
                    </div>

                    <div className="flex flex-col items-center">
                        <SectionHeader>Leaders</SectionHeader>
                        <LeaderItem getImageSrc={(id: string) => getImageSrc(id)} {...player.leaders} />
                    </div>
                </div>

                <div className="grid grid-cols-3 mb-3">
                    <div className="col-span-2">
                        <SectionHeader>Technologies</SectionHeader>
                        {
                            Object.entries(player.technologies).map(([k, v]) => 
                                (techColors.includes(k) && v.includes(true) && <TechTree getImageSrc={(id) => getImageSrc(id)} key={k} color={k} techsResearched={v} />))
                        }
                    </div>

                    <div className="flex flex-col justify-between gap-1">
                        <SectionHeader>Faction Techs</SectionHeader>
                        <div className="flex flex-row justify-center flex-wrap">
                            {<FactionTechs getImageSrc={(id) => getImageSrc(id)} techs={player.technologies.faction} factionTechInfo={FACTION_TECHNOLOGIES[player.faction.toLowerCase()]}/>}
                        </div>

                        <SectionHeader>Unit Upgrades</SectionHeader>
                        <div className="flex flex-row flex-wrap">
                            {player.technologies.unit.map(tech => tech === true) &&
                                <UnitUpgrades getImageSrc={(id) => getImageSrc(id)} techs={player.technologies.unit} />}
                        </div>

                        <SectionHeader>Secrets</SectionHeader>
                        <SecretObjItem getImageSrc={(id) => getImageSrc(id)} secrets={player.secretObjectives} inHand={1} />
                    </div>
                </div>
            </div>
        </div>
    );
};


// Strategy card icons and colors
// const strategyCards: StrategyCards = {
//     "Leadership": { icon: "👑", color: "#f39c12" },
//     "Diplomacy": { icon: "🤝", color: "#27ae60" },
//     "Politics": { icon: "📜", color: "#8e44ad" },
//     "Construction": { icon: "🏗️", color: "#d35400" },
//     "Trade": { icon: "💰", color: "#f1c40f" },
//     "Warfare": { icon: "⚔️", color: "#c0392b" },
//     "Technology": { icon: "🔬", color: "#2980b9" },
//     "Imperial": { icon: "👑", color: "#7f8c8d" }
// };


interface PlayerHoverCardProps {
    player: Player,
    hoverIcon: any,
    getImageSrc: (id: string) => string | undefined,
    isImageLoaded: (id: string) => boolean,
}

// interface TechnologyColors {
//     [key: string]: string;
// }
// const techColors: TechnologyColors = {
//     blue: "#3498db",    // Propulsion
//     green: "#2ecc71",   // Biotic
//     red: "#e74c3c",     // Warfare
//     yellow: "#f1c40f"   // Cybernetic
// };




// function getBGIconStyles(color: string) {
//     let hexColor = "";
//     console.log(color);

//     switch (color) {
//         case "red":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.red;
//             break;
//         case "blue":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.blue;
//             break;
//         case "purple":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.purple;
//             break;
//         case "yellow":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.yellow;
//             break;
//         case "white":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.white;
//             break;
//         case "green":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.green;
//             break;
//         case "orange":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.orange;
//             break;
//         case "pink":
//             console.log(color);
//             hexColor = COLOR_NAME_TO_HEX.pink;
//             break;
//         default:
//             console.log(color);
//             hexColor = "#000000"; //black
//             break;
//     }

//     // Format the output correctly for Tailwind arbitrary values
//     return `bg-[${hexColor}]`;
// }

// function getHoverCardStyles(color: string) {
//     let styling = "";
//     let output = "";
//     switch (color) {
//         case "red":
//             styling = COLOR_NAME_TO_HEX.red;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "blue":
//             styling = COLOR_NAME_TO_HEX.blue;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "purple":
//             styling = COLOR_NAME_TO_HEX.purple;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "yellow":
//             styling = COLOR_NAME_TO_HEX.yellow;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "white":
//             styling = COLOR_NAME_TO_HEX.white;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "green":
//             styling = COLOR_NAME_TO_HEX.green;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "orange":
//             styling = COLOR_NAME_TO_HEX.orange;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         case "pink":
//             styling = COLOR_NAME_TO_HEX.pink;
//             output = `border-color-[${styling}] border-2`;
//             break;
//         default:
//             output = "#000000"; //black
//             break;
//     }
//     return output;
// }
// function getTTPGColor(color: string): string {
//     switch (color) {
//         case "red": return COLOR_NAME_TO_HEX.red;
//         case "blue": return COLOR_NAME_TO_HEX.blue;
//         case "purple": return COLOR_NAME_TO_HEX.purple;
//         case "yellow": return COLOR_NAME_TO_HEX.yellow;
//         case "white": return COLOR_NAME_TO_HEX.white;
//         case "green": return COLOR_NAME_TO_HEX.green;
//         case "orange": return COLOR_NAME_TO_HEX.orange;
//         case "pink": return COLOR_NAME_TO_HEX.pink;
//         default: return "#000000"; //black
//     }
// }

export default PlayerHoverCard;
