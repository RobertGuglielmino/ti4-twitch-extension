import FactionTechChip from "./FactionTechChip";
import TechChipV2 from "./TechChipV2";
import { FACTION_TECHNOLOGIES } from "../../../../models/dictionaries";

interface TechTreeProps {
    color: string,
    techsResearched: boolean[],
    getImageSrc: (id: string) => string | undefined,
    faction?: string,
    factionTechs?: boolean[]
}

const TechTreeV2 = ({ color, techsResearched, getImageSrc, faction, factionTechs }: TechTreeProps) => {
    const techs = getTechs(color);
    
    // Create a combined array of all techs with their levels for sorting
    const allTechs = [...techs];
    
    // Add faction techs if provided
    if (faction && factionTechs) {
        const factionTechInfo = FACTION_TECHNOLOGIES[faction.toLowerCase()];
        
        if (factionTechInfo) {
            // Add each researched faction tech to the combined array
            factionTechInfo.filter(tech => tech.color === color).forEach((tech, index) => {
                if (factionTechs[index]) {
                    allTechs.push({
                        name: tech.name,
                        level: tech.level,
                        isFactionTech: true,
                    });
                }
            });
        }
    }
    
    // Sort all techs by level
    allTechs.sort((a, b) => a.level - b.level);

    return (
        <div className="flex flex-col items-center w-auto g-2 basis-1/4">
            {allTechs.map((tech) => {
                const techIndex = techs.indexOf(tech);

                const techProps = {
                    key: `tech-${tech.name}`,
                    color: color,
                    level: tech.level,
                    name: tech.name,
                }
                
                if (tech.isFactionTech) {
                    return (
                        <FactionTechChip 
                            {...techProps}
                            faction={faction!}
                            getImageSrc={(id) => getImageSrc(id)}
                        />
                    );
                } else if (techIndex >= 0 && techsResearched[techIndex]) {
                    return (
                        <TechChipV2 
                            {...techProps}
                        />
                    );
                }
                
                return null;
            }).filter(Boolean)}
        </div>
    );
}

export default TechTreeV2;


interface TechInfo {
    name: string,
    level: number,
    isFactionTech?: boolean
}

function getTechs(colorInput: string): TechInfo[] {
    switch (colorInput) {
        case "red":
            return redTechs;
        case "blue":
            return blueTechs;
        case "green":
            return greenTechs;
        case "yellow":
            return yellowTechs;
        // case "white":
        //     return unitTechs;
        default:
            return [{ name: "", level: 0 }];
    }
}

const blueTechs: TechInfo[] = [
    { name: "ANTIMASS DEFLECTOR", level: 0 },
    { name: "D.E.T.", level: 0 },
    { name: "GRAVITY DRIVE", level: 1 },
    { name: "SLING RELAY", level: 1 },
    { name: "FLEET LOGISTICS", level: 2 },
    { name: "LIGHT WAVE", level: 3 }
];

const redTechs: TechInfo[] = [
    { name: "PLASMA SCORING", level: 0 },
    { name: "AI DEV", level: 0 },
    { name: "SELF ASSEMBLY", level: 1 },
    { name: "MAGEN DEFENSE", level: 1 },
    { name: "DURANIUM ARMOR", level: 2 },
    { name: "ASSAULT CANNON", level: 3 }
];

const yellowTechs: TechInfo[] = [
    { name: "SARWEEN TOOLS", level: 0 },
    { name: "SCANLINK DRONES", level: 0 },
    { name: "PREDICTIVE INTLLGNCE", level: 1 },
    { name: "GRAVITON LASER", level: 1 },
    { name: "TRANSIT DIODES", level: 2 },
    { name: "INT. ECONOMY", level: 3 }
];

const greenTechs: TechInfo[] = [
    { name: "NEURAL MOTIVATOR", level: 0 },
    { name: "PSYCHO ARCH.", level: 0 },
    { name: "BIO STIMS", level: 1 },
    { name: "DAXCIVE ANIMATORS", level: 1 },
    { name: "HYPER METAB.", level: 2 },
    { name: "X-89 WEAPON", level: 3 }
];
