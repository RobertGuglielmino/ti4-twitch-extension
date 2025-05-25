
import { UNIT_UPGRADES } from "../../../models/dictionaries";

interface UnitUpgradesProps {
    getImageSrc: (id: string) => string | undefined,
    techs: boolean[]
}

const UnitUpgrades = ({ getImageSrc, techs }: UnitUpgradesProps) => {

    return (<>
        {UNIT_UPGRADES.map((unit, index) => {
            if (techs[index]) {
                return (<div key={unit} className="size-10 m-1">
                    <img
                        src={getImageSrc(unit.split(" ")[0].toLowerCase())}
                        alt={unit}
                    />
                </div>);
            }
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