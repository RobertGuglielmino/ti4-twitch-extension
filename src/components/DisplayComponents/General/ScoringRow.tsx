import {  PlayerArrayV2, ProgressObjective } from "../../../models/interfaces"

interface ScoringRowProps {
    playerData: PlayerArrayV2,
    objectiveType: ProgressObjective,
    children: any
}

const ScoringRow = ({ playerData, objectiveType, children }: ScoringRowProps) => {

    return (<>
        <tr className="hover:bg-gray-800">
            <td className="p-1 border-b border-gray-800 text-xs">
                <div className="font-medium">{children}</div>
            </td>
            {playerData.name.map((_: string, index: number) => (
                <td key={index} className="text-center p-1 border-b border-gray-800">
                    {getObjFormat(objectiveType, index)}
                </td>
            ))}
        </tr>
    </>)
}

function getObjFormat(objectiveType: ProgressObjective, index: number) {
    if (objectiveType.scored.hasOwnProperty(index) && objectiveType.scored[index] != 0) {
        return <span className="text-green-600 text-sm font-bold">✔</span>;
    } else if (objectiveType.progress.hasOwnProperty(index) && !noScoreFormats.includes(objectiveType.progress[index])) {
        return <span className="text-zinc-400 text-xs font-thin">{objectiveType.progress[index]}</span>;
    } else {
        return <span className="text-gray-700 text-xs">-</span>;
    }
}

const noScoreFormats = [
    "0",
    "0/0",
    "0/0/0",
    "0/0/0/0"
]

// {data.playerData.name.map((_: string, index: number) => (
//     <td key={index} className="text-center p-1 border-b border-gray-800">
//      {objective.scored.includes(index) ?
//        <span className="text-green-500 text-xs font-bold">✓</span> :
//        objective.progress.hasOwnProperty(index) ?
//          <span className="text-zinc-400 text-xs font-thin">{objective.progress[index]}</span> :
//          <span className="text-gray-700 text-xs">-</span>
//      }
//    </td>
//  ))}

export default ScoringRow;