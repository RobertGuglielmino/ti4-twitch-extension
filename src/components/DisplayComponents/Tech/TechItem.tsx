
import redTech from "@icons/overlay_icons/red.png";
import blueTech from "@icons/overlay_icons/blue.png";
import yellowTech from "@icons/overlay_icons/yellow.png";
import greenTech from "@icons/overlay_icons/green.png";
import unitTech from "@icons/overlay_icons/unit_d_Dreadnought.png";
import TechChip from "./TechChip";

interface TechItemProps {
    color: string,
    technologies: string[];
}

const TechItem = ({color, technologies}: TechItemProps) => {

    let techIcon = getTechIcon(color);


    return (
        <div className="flex flex-row items-center">
            <div className="basis-0 min-w-5 max-w-5">
                <img className="object-scale-down" src={techIcon} />
            </div>
            <div className="basis-full text-xs">
                {technologies.map((tech) => {
                    return (<TechChip name={tech} color={color}></TechChip>);
                })}
            </div>
        </div>
    );
}


function getTechIcon(colorInput: string) {
    switch (colorInput) {
        case "red":
            return redTech;
        case "blue":
            return blueTech;
        case "green":
            return greenTech;
        case "yellow":
            return yellowTech;
        case "white":
            return unitTech;
        default:
            return "";
    }
}

export default TechItem;