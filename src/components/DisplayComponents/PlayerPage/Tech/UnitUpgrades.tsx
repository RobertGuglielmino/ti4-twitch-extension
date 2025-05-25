
import { FACTION_TECHNOLOGIES, UNIT_UPGRADES } from "../../../../models/dictionaries";

interface UnitUpgradesProps {
    getImageSrc: (id: string) => string | undefined,
    techs: boolean[],
    faction?: string,
    factionTechs?: boolean[]
}

const UnitUpgrades = ({ getImageSrc, techs, faction, factionTechs }: UnitUpgradesProps) => {
    const factionTechInfo = faction ? FACTION_TECHNOLOGIES[faction.toLowerCase()] : null;

    const hasStandardUpgrades = techs && techs.some(tech => tech);
    const hasFactionUnitUpgrades = factionTechInfo && factionTechs &&
        factionTechInfo.some((tech, index) => factionTechs[index] && tech.unit);

    if (!hasStandardUpgrades && !hasFactionUnitUpgrades) {
        return null;
    }

    return (<>
        {/* Regular unit upgrades */}
        {techs && UNIT_UPGRADES.map((unit, index) => {
            if (techs[index]) {
                return (
                    <div key={unit} className="size-10 m-1 relative">
                        <img
                            src={getImageSrc(unit.split(" ")[0].toLowerCase())}
                            alt={unit}
                            className="max-w-full max-h-full"
                        />
                    </div>
                );
            }
            return null;
        })}


        {/* Faction-specific unit upgrades */}
        {factionTechInfo && factionTechs && factionTechInfo.map((tech, index) => {
            if (factionTechs[index] && tech.unit) {
                return (
                    <div key={tech.name} className="size-10 m-1 relative">
                        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70">
                            <img
                                src={getImageSrc(faction!.toLowerCase())}
                                alt={faction}
                                className="max-w-full max-h-full"
                            />
                        </div>
                        <div className="relative z-10">
                            <img
                                src={getImageSrc(tech.unit.toLowerCase())}
                                alt={tech.name}
                                className="max-w-full max-h-full"
                            />
                        </div>
                    </div>
                );
            }
            return null;
        })}
    </>);
}


// "Advanced Carrier II",
// "Crimson Legionnaire II",
// "Dimensional Tear II",,
// "Exotrireme II",
// "Floating Factory II",
// "Hel-Titan II",
// "Hybrid Crystal Fighter II",
// "Letani Warrior II",
// "Memoria II",
// "Prototype War Sun II",
// "Saturn Engine II",
// "Spec Ops II",
// "Strike Wing Alpha II",
// "Super-Dreadnought II",


// function getUpgradeIcon(colorInput: string) {
//     switch (colorInput) {
//         case "Carrier II":
//             return carrierIcon;
//         case "Dreadnought II":
//             return dreadnoughtIcon;
//         case "Fighter II":
//             return fighterIcon;
//         case "Infantry II":
//             return infantryIcon;
//         case "PDS II":
//             return pdsIcon;
//         case "Cruiser II":
//             return cruiserIcon;
//         case "Space Dock II":
//             return spacedockIcon;
//         case "War Sun":
//             return warsunIcon;
//         case "Destroyer II":
//             return destroyerIcon;
//         default:
//             return "";
//     }
// }

export default UnitUpgrades;
