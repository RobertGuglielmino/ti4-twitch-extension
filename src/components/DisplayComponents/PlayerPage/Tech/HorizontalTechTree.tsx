import TechChip from "./TechChip";

interface TechTreeProps {
    color: string,
    techsResearched: boolean[],
    getImageSrc: (id: string) => string | undefined,
}

const HorizontalTechTree = ({ color, techsResearched }: TechTreeProps) => {

    const techs = getTechs(color).reverse();

    let techIndex = 0;

    return (<div className="flex flex-col items-center">
        {techs.map((techLevel) => (<div className="w-full flex flex-row items-center justify-center">
            {techLevel.map((tech) => {
                if (techsResearched[techIndex] === true) {
                    techIndex += 1;
                    return (<TechChip color={color} name={tech} />);
                } else {
                    techIndex += 1;
                    return (<div className="p-1 font-astro text-xs border-2 rounded h-10 flex flex-row items-center justify-center w-16 p-1 m-1 text-slate-300 bg-slate-950 border-slate-950">
                        <div className={`rounded text-slate-300 bg-slate-950 border-slate-300 opacity-100`}>

                        </div>
                    </div>);
                }
            })}
        </div>))}
    </div>);
}

export default HorizontalTechTree;


function getTechs(colorInput: string): string[][] {
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
            return [[""]];
    }
}

const blueTechs = [
    ["ANTIMASS DEFLECTOR",
        "D.E.T."],
    ["GRAVITY DRIVE",
        "SLING RELAY"],
    ["FLEET LOGISTICS"],
    ["LIGHT WAVE"]
];

const redTechs = [
    ["PLASMA SCORING",
        "AI DEV"],
    ["SELF ASSEMBLY",
        "MAGEN DEFENSE"],
    ["DURANIUM ARMOR"],
    ["ASSAULT CANNON"],
]

const yellowTechs = [
    ["SARWEEN TOOLS",
        "SCANLINK DRONES"],
    ["PREDICTIVE INTLLGNCE",
        "GRAVITON LASER"],
    ["TRANSIT DIODES"],
    ["INT. ECONOMY"],
]

const greenTechs = [
    ["NEURAL MOTIVATOR",
        "PSYCHO ARCH."],
    ["BIO STIMS",
        "DAXCIVE ANIMATORS"],
    ["HYPER METAB."],
    ["X-89 WEAPON"]
]