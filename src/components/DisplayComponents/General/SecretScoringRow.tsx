import { Objective, PlayerArrayV2 } from "../../../models/interfaces"

interface SecretScoringRowProps {
    playerData: PlayerArrayV2,
    bonusObjective: Objective
}

const SecretScoringRow = ({ playerData,  bonusObjective }: SecretScoringRowProps) => {

    return (<>
        <tr className="hover:bg-gray-800">
            <td className="border-b border-gray-800">
                <div className="ml-2 font-bold text-md">
                    {bonusObjective!.name}
                </div>
            </td>
            {playerData.name.map((_: string, index: number) => (
                <td key={index} className="text-center p-1 border-b border-gray-800">
                    {getObjFormatBonus(bonusObjective!, index)}
                </td>
            ))}
        </tr>
    </>);

    function getObjFormatBonus(objectiveType: Objective, index: number) {
        if (objectiveType.scored.hasOwnProperty(index) && objectiveType.scored[index] != 0) {
            const numScored = playerData.secretObjectives[index].length;
            return <span className="text-green-600 text-sm font-bold">{numScored}</span>;
        } else {
            return <span className="text-gray-700 text-xs">-</span>;
        }
    }
}


export default SecretScoringRow;
