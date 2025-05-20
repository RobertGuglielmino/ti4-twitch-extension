import { GameDataV2 } from '../models/interfaces';
import { ProgressObjective } from '../models/interfaces';
import ScoringRow from './DisplayComponents/General/ScoringRow';
import ScoringRowHeader from './DisplayComponents/General/ScoringRowHeader';
import FactionIcon from './DisplayComponents/General/FactionIcon';

interface ScoringHoverCardProps {
  data: GameDataV2
}


// Scoring hover card component
const ScoringHoverCard = ({ data }: ScoringHoverCardProps) => {

  return (
    <>

      <div className="font-xl font-astro absolute right-0 bg-center bottom-16 z-50 rounded-lg p-3 shadow-xl border border-gray-700 w-90 text-white max-h-240 overflow-y-auto">
        <div className="absolute inset-0 bg-[url(@icons/backgrounds/tile_046.png)] bg-scale-[auto_200px] bg-[length:auto_200%] bg-center brightness-25"></div>
        <div className="relative z-10">

          <h3 className="font-avalors text-lg mb-2 flex text-center">
            Objective Scoring
          </h3>
          {/* Objective scoring grid - more compact */}
          <div className="overflow-x-auto mb-3">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr>
                  <th className="text-gray-400 font-avalors p-1 border-b border-gray-700 text-left">Objective</th>
                  {data.playerData.faction.map((faction: string, index: number) => (
                    <th key={index} className="font-normal text-black p-1 border-b border-gray-700 text-center w-7">
                      <div className="h-5 w-5 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: data.playerData.color[index] }}>
                        <FactionIcon faction={faction} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <ScoringRowHeader>{"Stage I (1 Point)"}</ScoringRowHeader>
                {data.objectives.public1.filter((obj: ProgressObjective) => obj.points === 1).map((objective) => (
                  <ScoringRow playerData={data.playerData} objectiveType={objective}>{objective.name}</ScoringRow>
                ))}

                <ScoringRowHeader>{"Stage II (2 Points)"}</ScoringRowHeader>
                {data.objectives.public2.filter((obj: ProgressObjective) => obj.points === 1).map((objective) => (
                  <ScoringRow playerData={data.playerData} objectiveType={objective}>{objective.name}</ScoringRow>
                ))}

                <ScoringRowHeader>Bonus Points</ScoringRowHeader>
                {/* <ScoringRow playerData={data.playerData} objectiveType={data.objectives.mecatol}>Mecatol Rex</ScoringRow>
                <ScoringRow playerData={data.playerData} objectiveType={data.objectives.mecatol}>Support for the Throne</ScoringRow>
                <ScoringRow playerData={data.playerData} objectiveType={data.objectives.mecatol}>Secrets</ScoringRow>
                <ScoringRow playerData={data.playerData} objectiveType={data.objectives.mecatol}>Agendas</ScoringRow>
                <ScoringRow playerData={data.playerData} objectiveType={data.objectives.mecatol}>Relics</ScoringRow> */}

                <ScoringRowHeader>Active Laws</ScoringRowHeader>
                {data.laws.length > 0 ? (
                  <tr className="text-gray-300">
                    {data.laws.map((law, idx) => (
                      <td key={idx} className="mb-1 last:mb-0">
                        <span className="font-semibold text-blue-400">{law.name}:</span>
                        {law.electedPlayer && <span className="text-yellow-400 ml-1">(Elected: {law.electedPlayer})</span>}
                      </td>
                    ))}
                  </tr>
                ) : (
                  <p className="text-gray-500">No active laws</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoringHoverCard;