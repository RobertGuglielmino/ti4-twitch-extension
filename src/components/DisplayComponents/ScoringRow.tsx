import { Objective, PlayerArrayV2 } from "../../models/interfaces"

interface ScoringRowProps {
    playerData: PlayerArrayV2,
    objectiveType: Objective,
    children: any
}

const ScoringRow = ({playerData, objectiveType, children}: ScoringRowProps) => {

    return (<>
        <tr className="hover:bg-gray-800">
            <td className="p-1 border-b border-gray-800 text-xs">
                <div className="font-medium">{children}</div>
            </td>
            {playerData.name.map((_: string, index: number) => (
                <td key={index} className="text-center p-1 border-b border-gray-800">
                    {objectiveType.scored.hasOwnProperty(index) ?
                        <span className="text-yellow-600 text-xs font-bold">{objectiveType.scored[index]}</span> :
                        <span className="text-gray-700 text-xs">-</span>
                    }
                </td>
            ))}
        </tr>
    </>)
}

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