import React from "react";
import {  PlayerArrayV2, ProgressObjective } from "../../../models/interfaces"

interface ScoringRowProps {
    playerData: PlayerArrayV2,
    objectiveType: ProgressObjective,
}

const ScoringRow = ({ playerData, objectiveType }: ScoringRowProps) => {

    return (<>
        <tr className="hover:bg-gray-800">
            <td className="border-b border-gray-800">
                <div className="ml-2 font-bold text-md">
                    {objectiveType.name}
                {objectiveType && <span className="px-4 text-gray-500">
                    {objectiveType.description}
                </span>}
                </div>
            </td>
            {playerData.name.map((_: string, index: number) => (
                <td key={index} className="text-center p-1 border-b border-gray-800">
                    {getObjFormat(objectiveType, index)}
                </td>
            ))}
        </tr>
    </>);

    
    function getObjFormat(objectiveType: ProgressObjective, index: number) {
        if (objectiveType.scored.hasOwnProperty(index) && objectiveType.scored[index] != 0) {
            return <span className="text-green-600 text-sm font-bold">✔</span>;
        } else if (objectiveType.progress.hasOwnProperty(index) && !noScoreFormats.includes(objectiveType.progress[index])) {
            return <span className="text-zinc-400 text-xs font-thin">{formatProgress(objectiveType.progress[index])}</span>;
        } else {
            return <span className="text-gray-700 text-xs">-</span>;
        }
    }
}

const noScoreFormats = [
    "0",
    "0/0",
    "0/0/0",
    "0/0/0/0"
]

function formatProgress(input: string) {
    const formattadString = input.split("/");
    
    return formattadString.map(c => <span className="text-zinc-400 text-xs font-thin">{c}</span>)
        .reduce((prev, curr, i) => i === 0 ? curr : 
            <>{prev}<span className="text-zinc-600 text-xs font-thin">/</span>{curr}</>, React.Fragment as any);
}

export default ScoringRow;
