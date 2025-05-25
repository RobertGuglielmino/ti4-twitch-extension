import TechChipV2 from "./TechChipV2";

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
            return (<TechChipV2 key={tech} name={tech} color={color} level={3} active={techs[index]} />);
        })}
    </>);
}

export default FactionTechs;