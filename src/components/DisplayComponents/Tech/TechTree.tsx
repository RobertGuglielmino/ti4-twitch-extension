import TechChip from "./TechChip";

interface TechTreeProps {
    color: string,
    techsResearched: boolean[]
}

const TechTree = ({ color, techsResearched }: TechTreeProps) => {

    const techs = getTechs(color);

    
function getTechBG(colorInput: string) {
    switch (colorInput) {
        case "blue":
            return "bg-[url(@icons/overlay_icons/blue.png)]";
        case "red":
            return "bg-[url(@icons/overlay_icons/red.png)]";
        case "green":
            return "bg-[url(@icons/overlay_icons/green.png)]";
        case "yellow":
            return "bg-[url(@icons/overlay_icons/yellow.png)]";
        default:
            return "";
    }
}

function getRadialBG(colorInput: string) {
    switch (colorInput) {
        case "blue":
            return "bg-blue-800";
        case "red":
            return "bg-red-800";
        case "green":
            return "bg-green-800";
        case "yellow":
            return "bg-yellow-800";
        default:
            return "";
    }
}

    let techIndex = 0;

    return (
        <div className="relative">
            <div className={`absolute inset-0 ${getRadialBG(color)} radial-mask`}></div>
            <div className={`absolute inset-0 ${getTechBG(color)} size-auto w-auto bg-center bg-no-repeat bg-contain opacity-40`}></div>
            <div className="relative z-10 flex flex-row items-center">
                {techs.map((techLevel) => (<div className="w-full flex flex-col items-center justify-center">
                    {techLevel.map((tech) => {
                        if (techsResearched[techIndex] === true) {
                            techIndex += 1;
                            return (<TechChip color={color} name={tech} />);
                        } else {
                            techIndex += 1;
                            return (<div className="p-1 border-2 rounded h-10 w-16 m-1 text-slate-300 bg-slate-950 border-slate-950 opacity-50">
                           
                            </div>);
                        }
                    })}
                </div>))}
            </div>
        </div>
    );
}

export default TechTree;


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
