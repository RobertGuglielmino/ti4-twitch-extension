
import { Award } from 'lucide-react';
import { GameData } from '../utils/interfaces';

interface ScoringHoverCardProps {
  data: GameData
}

// Scoring hover card component
const ScoringHoverCard = ({ data }: ScoringHoverCardProps) => {
  return (
    <div className="absolute right-0 bottom-20 z-50 bg-gray-900 bg-opacity-95 rounded-lg p-3 shadow-xl border border-gray-700 w-120 text-white max-h-240 overflow-y-auto">
      <h3 className="font-bold text-lg mb-2 flex items-center">
        <Award size={18} className="text-yellow-400 mr-2" />
        Objective Scoring
      </h3>
      
      {/* Objective scoring grid - more compact */}
      <div className="overflow-x-auto mb-3">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="font-normal text-gray-400 p-1 border-b border-gray-700 text-left">Objective</th>
              {data.players.map(player => (
                <th key={player.id} className="font-normal text-gray-400 p-1 border-b border-gray-700 text-center w-7">
                  <div className="h-5 w-5 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: player.color }}>
                    <span className="text-xs">{player.name[0]}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Stage I Objectives (1 point) */}
            <tr>
              <td colSpan={data.players.length + 1} className="text-xs font-bold text-gray-300 p-1 bg-gray-800">
                Stage I (1 Point)
              </td>
            </tr>
            {data.objectives.public.filter(obj => obj.points === 1).map(objective => (
              <tr key={objective.id} className="hover:bg-gray-800">
                <td className="p-1 border-b border-gray-800 text-xs">
                  <div className="font-medium">{objective.name}</div>
                </td>
                {data.players.map(player => (
                  <td key={player.id} className="text-center p-1 border-b border-gray-800">
                    {objective.scored.includes(player.id) ? 
                      <span className="text-green-500 text-xs font-bold">✓</span> : 
                      objective.progress.hasOwnProperty(player.id) ? 
                        <span className="text-zinc-400 text-xs font-thin">{objective.progress[player.id]}</span> : 
                        <span className="text-gray-700 text-xs">-</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
            
            {/* Stage II Objectives (2 points) */}
            <tr>
              <td colSpan={data.players.length + 1} className="text-xs font-bold text-gray-300 p-1 bg-gray-800">
                Stage II (2 Points)
              </td>
            </tr>
            {data.objectives.public.filter(obj => obj.points === 2).map(objective => (
              <tr key={objective.id} className="hover:bg-gray-800">
                <td className="p-1 border-b border-gray-800 text-xs">
                  <div className="font-medium">{objective.name}</div>
                </td>
                {data.players.map(player => (
                  <td key={player.id} className="text-center p-1 border-b border-gray-800">
                    {objective.scored.includes(player.id) ? 
                      <span className="text-green-500 text-xs font-bold">✓</span> : 
                      objective.progress.hasOwnProperty(player.id) ? 
                        <span className="text-zinc-400 text-xs font-thin">{objective.progress[player.id]}</span> : 
                        <span className="text-gray-700 text-xs">-</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
            
            {/* Mecatol Rex */}
            <tr>
              <td colSpan={data.players.length + 1} className="text-xs font-bold text-gray-300 p-1 bg-gray-800">
                Other
              </td>
            </tr>
            <tr className="hover:bg-gray-800">
              <td className="p-1 border-b border-gray-800 text-xs">
                <div className="font-medium">Mecatol Rex</div>
              </td>
              {data.players.map(player => (
                <td key={player.id} className="text-center p-1 border-b border-gray-800">
                  {data.objectives.mecatol.scored.hasOwnProperty(player.id) ? 
                    <span className="text-yellow-600 text-xs font-bold">{data.objectives.mecatol.scored[player.id]}</span> : 
                    <span className="text-gray-700 text-xs">-</span>
                  }
                </td>
              ))}
            </tr>
            <tr className="hover:bg-gray-800">
              <td className="p-1 border-b border-gray-800 text-xs">
                <div className="font-medium">Support for the Throne</div>
              </td>
              {data.players.map(player => (
                <td key={player.id} className="text-center p-1 border-b border-gray-800">
                  {data.objectives.mecatol.scored.hasOwnProperty(player.id) ? 
                    <span className="text-yellow-500 text-xs font-bold">{data.objectives.mecatol.scored[player.id]}</span> : 
                    <span className="text-gray-700 text-xs">-</span>
                  }
                </td>
              ))}
            </tr>
            <tr className="hover:bg-gray-800">
              <td className="p-1 border-b border-gray-800 text-xs">
                <div className="font-medium">Secrets</div>
              </td>
              {data.players.map(player => (
                <td key={player.id} className="text-center p-1 border-b border-gray-800">
                  {data.objectives.mecatol.scored.hasOwnProperty(player.id) ? 
                    <span className="text-red-500 text-xs font-bold">{data.objectives.mecatol.scored[player.id]}</span> : 
                    <span className="text-gray-700 text-xs">-</span>
                  }
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Active laws - more compact */}
      <div>
        <h4 className="font-bold text-xs uppercase text-gray-400 mb-1 flex items-center">
          {/* <BookOpen size={12} className="mr-1 text-blue-400" /> */}
          Active Laws
        </h4>
        <div className="bg-gray-800 rounded p-2 text-xs">
          {data.laws.length > 0 ? (
            <ul className="text-gray-300">
              {data.laws.map((law, idx) => (
                <li key={idx} className="mb-1 last:mb-0">
                  <span className="font-semibold text-blue-400">{law.name}:</span> {law.description}
                  {law.electedPlayer && <span className="text-yellow-400 ml-1">(Elected: {law.electedPlayer})</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No active laws</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoringHoverCard;