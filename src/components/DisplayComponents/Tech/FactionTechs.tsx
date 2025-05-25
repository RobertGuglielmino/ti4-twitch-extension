import TechChip from "./TechChip";

interface UnitUpgradesProps {
    getImageSrc: (id: string) => string | undefined,
    techs: boolean[],
    factionTechInfo: {[key: string]: string}
}

const FactionTechs = ({ techs, factionTechInfo }: UnitUpgradesProps) => {
    if (factionTechInfo === undefined) {
        return (<></>);
    }
    return (<>
        {Object.entries(factionTechInfo).map(([tech, color], index) => {
            return (<TechChip key={tech} name={tech} color={color} active={techs[index]} />);
        })}
    </>);
}

export default FactionTechs;