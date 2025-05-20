import TechChip from "./TechChip";

interface UnitUpgradesProps {
    techs: boolean[],
    factionTechInfo: {[key: string]: string}
}

const FactionTechs = ({ techs, factionTechInfo }: UnitUpgradesProps) => {
    if (factionTechInfo === undefined) {
        return (<></>);
    }
    return (<>
        {Object.entries(factionTechInfo).map(([tech, color], index) => {
            return (<TechChip name={tech} color={color} active={techs[index]} />);
        })}
    </>);
}

export default FactionTechs;