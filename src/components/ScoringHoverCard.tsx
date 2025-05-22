import { GameDataV2, Objective } from '../models/interfaces';
import { ProgressObjective } from '../models/interfaces';
import ScoringRow from './DisplayComponents/General/ScoringRow';
import ScoringRowHeader from './DisplayComponents/General/ScoringRowHeader';
import FactionIcon from './DisplayComponents/General/FactionIcon';
import MecatolScoringRow from './DisplayComponents/General/MecatolScoringRow';
import SecretScoringRow from './DisplayComponents/General/SecretScoringRow';
import { VICTORY_POINT_LAWS } from '../models/dictionaries';
import LawVP from './DisplayComponents/General/LawVP';

interface ScoringHoverCardProps {
  data: GameDataV2
}

// Scoring hover card component
const ScoringHoverCard = ({ data }: ScoringHoverCardProps) => {

  return (
    <>

      <div className="font-xl font-astro absolute right-0 bg-center bottom-16 z-50 rounded-lg p-3 shadow-xl border border-gray-700 w-135 text-white max-h-240 overflow-y-auto">
        <div className="absolute inset-0 bg-[url(@icons/backgrounds/tile_046.png)] bg-scale-[auto_200px] bg-[length:auto_200%] bg-center brightness-25"></div>
        <div className="relative z-10">

          <div className="font-avalors text-md flex text-center">
            Objective Scoring
          </div>

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
                <ScoringRowHeader>{"Stage I  _  1 Pt"}</ScoringRowHeader>
                {data.objectives.public1.filter((obj: ProgressObjective) => obj.points === 1).map((objective) => (
                  <ScoringRow key={objective.name} playerData={data.playerData} objectiveType={objective}></ScoringRow>
                ))}

                <ScoringRowHeader>{"Stage II  _  2 Pts"}</ScoringRowHeader>
                {data.objectives.public2.filter((obj: ProgressObjective) => obj.points === 2).map((objective) => (
                  <ScoringRow key={objective.name} playerData={data.playerData} objectiveType={objective}></ScoringRow>
                ))}

                <ScoringRowHeader>Bonus Points</ScoringRowHeader>
                <MecatolScoringRow playerData={data.playerData} bonusObjective={data.objectives.mecatol}></MecatolScoringRow>
                <SecretScoringRow playerData={data.playerData} bonusObjective={data.objectives.secret}></SecretScoringRow>

              </tbody>
            </table>
            <div className="flex">
              <div className="w-1/2 pr-2">
                <div className=" font-avalors text-center">Active Laws</div>
                {data.laws.length > 0 ? (
                  <div className="flex flex-wrap justify-center items-center gap-2">
                    {data.laws.map((law, idx) => {
                      let isVictoryPointLaw = VICTORY_POINT_LAWS.includes(law.name);
                      if (isVictoryPointLaw) {
                        return (<div key={idx} className={`p-1 w-auto text-xs rounded-md border border-yellow-400 bg-yellow-400`}>
                          <LawVP name={law.name} agendas={data.objectives.agenda} data={data} />
                        </div>);
                      } else {
                        return (<div key={idx} className={`p-1 w-auto text-xs rounded-md border-1 border-blue-800 bg-gray-950`}>
                          {law.name}
                        </div>);
                      }
                    })}
                  </div>
                ) : (
                  <div className="p-1 text-gray-500">No active laws</div>
                )}
              </div>

              <div className="w-1/2 pl-2">
                <div className=" font-avalors text-center">Relics</div>
                {data.objectives.relics.filter((obj: Objective) => obj.points === 1).length > 0 ? (
                  <div className="flex w-auto p-1 g-1">
                    {data.objectives.relics
                      .map((relic) => {
                        const ownerIndex = Object.entries(relic.scored)
                          .find(([_, value]) => value === 1)?.[0];

                        return (
                          <div key={relic.name} className="flex flex-col w-auto items-center bg-amber-950 rounded-md m-1 border border-amber-500">
                            <div className="font-semibold w-auto text-amber-500 text-sm text-center">{relic.name}</div>
                            <div className="font-semiboldw-auto text-sm text-center text-wrap">{data.playerData.name[parseInt(ownerIndex!)]}</div>

                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="p-1 text-gray-500">No victory point relics</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ScoringHoverCard;
