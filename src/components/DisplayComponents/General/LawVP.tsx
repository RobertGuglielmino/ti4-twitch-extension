import { GameDataV2, Objective } from "../../../models/interfaces";
import FactionIcon from "./FactionIcon";

interface LawVPProps {
    name: string,
    agendas: Objective[],
    getImageSrc: (id: string) => string | undefined,
    data: GameDataV2
}

const LawVP = ({ name, agendas, getImageSrc, data }: LawVPProps) => {

    function normalizedFactionFromIndex(index: number) {
        return data.playerData.faction[index].charAt(0).toUpperCase()
            + data.playerData.faction[index].slice(1).toLowerCase();
    }

    if (agendas === undefined) {
        return (<></>);
    }

    return (<span className={`flex flex-col items-center gap-1 font-semibold truncate text-black`}>
        {name}
        <div className="flex flex-row gap-1">
            {agendas.filter(agenda => agenda && agenda.name === name).map(agenda => {
                return agenda.scored.filter(player => player === 1).map((_, index) => {
                    return (<FactionIcon getImageSrc={getImageSrc} key={index} className="size-4" faction={normalizedFactionFromIndex(index)} />);
                });
            })}
        </div>
    </span>);
}

export default LawVP;
