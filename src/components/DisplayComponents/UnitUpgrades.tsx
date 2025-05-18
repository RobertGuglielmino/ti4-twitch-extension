
import carrierIcon from "../../assets/units/unit_c_Carrier.png";
import dreadnoughtIcon from "../../assets/units/unit_d_Dreadnought.png";
import fighterIcon from "../../assets/units/unit_f_Fighter.png";
import flagshipIcon from "../../assets/units/unit_h_Flagship.png";
import infantryIcon from "../../assets/units/unit_i_Infantry.png";
import pdsIcon from "../../assets/units/unit_p_PDS.png";
import cruiserIcon from "../../assets/units/unit_r_Cruiser.png";
import spacedockIcon from "../../assets/units/unit_s_Space_Dock.png";
import warsunIcon from "../../assets/units/unit_w_War_Sun.png";
import destroyerIcon from "../../assets/units/unit_y_Destroyer.png";

interface UnitUpgradesProps { 
    techs: string[]
}

const UnitUpgrades = ({techs}: UnitUpgradesProps) => {

    return (<>
        {techs.sort((a,b) => a.length - b.length).map((tech: string) => {

            const icon = getUpgradeIcon(tech);
            console.log(tech);
            console.log(icon);
            return (<div className="size-1/4 m-1">
                <img 
                src={icon}
                alt={tech}
            />
        </div>);
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
        case "":
            return flagshipIcon;
        case "Infantry II":
            return infantryIcon;
        case "PDS II":
            return pdsIcon;
        case "Cruiser II":
            return cruiserIcon;
        case "Space Dock II":
            return spacedockIcon;
        case "yellow":
            return warsunIcon;
        case "Destroyer II":
            return destroyerIcon;
        default:
            return "";
    }
}

export default UnitUpgrades;