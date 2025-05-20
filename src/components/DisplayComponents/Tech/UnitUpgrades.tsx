
import carrierIcon from "@icons/units/unit_c_Carrier.png";
import dreadnoughtIcon from "@icons/units/unit_d_Dreadnought.png";
import fighterIcon from "@icons/units/unit_f_Fighter.png";
import infantryIcon from "@icons/units/unit_i_Infantry.png";
import pdsIcon from "@icons/units/unit_p_PDS.png";
import cruiserIcon from "@icons/units/unit_r_Cruiser.png";
import spacedockIcon from "@icons/units/unit_s_Space_Dock.png";
import warsunIcon from "@icons/units/unit_w_War_Sun.png";
import destroyerIcon from "@icons/units/unit_y_Destroyer.png";
import { UNIT_UPGRADES } from "../../../models/dictionaries";

interface UnitUpgradesProps {
    techs: boolean[]
}

const UnitUpgrades = ({ techs }: UnitUpgradesProps) => {

    return (<>
        {UNIT_UPGRADES.map((unit, index) => {
            if (techs[index]) {
                const icon = getUpgradeIcon(unit);
                return (<div className="size-1/4 m-1">
                    <img
                        src={icon}
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


function getUpgradeIcon(colorInput: string) {
    switch (colorInput) {
        case "Carrier II":
            return carrierIcon;
        case "Dreadnought II":
            return dreadnoughtIcon;
        case "Fighter II":
            return fighterIcon;
        case "Infantry II":
            return infantryIcon;
        case "PDS II":
            return pdsIcon;
        case "Cruiser II":
            return cruiserIcon;
        case "Space Dock II":
            return spacedockIcon;
        case "War Sun":
            return warsunIcon;
        case "Destroyer II":
            return destroyerIcon;
        default:
            return "";
    }
}

export default UnitUpgrades;