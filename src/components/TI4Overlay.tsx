import { useState } from 'react';
import { Award, Star, Shield, Zap, Database, ChevronUp, ChevronDown } from 'lucide-react';
import PlayerIcon from './PlayerIcon';
import ScoringHoverCard from './ScoringHoverCard';
import { HOVER_STATES } from '../models/enums';
import { Player } from '../models/interfaces';
// import '../models/mockTwitchExt';
// import { mockData } from '../models/mockData';
import { mockData2 } from '../models/mockDataV2';



// Main overlay component
const TI4Overlay = () => {
  const [data, setData] = useState(mockData2);
  const [activeHover, setActiveHover] = useState(HOVER_STATES.NONE);
  const [minimized, setMinimized] = useState(false);
  
  window.Twitch.ext.listen(
    "broadcast",
    (_: string, contentType: string, message: string) => {
      // verify content type
      if (contentType !== "application/json") {
        console.debug(`Unexpected contentType "${contentType}"`);
        return;
      }
      
      setData(JSON.parse(message));
    },
  );

  function getPlayerDataAtIndex(index: number): Player {
    const playerData = data.playerData;
    return {
      id: index,
      name: playerData.name[index],
      active: playerData.active === index,
      faction: playerData.faction[index],
      color: playerData.color[index],
      victoryPoints: playerData.victoryPoints[index],
      strategyCard: playerData.strategyCard[index],
      strategyCardsFaceDown: playerData.strategyCardFaceDown[index],
      speaker: playerData.speaker === index,
      technologies: playerData.technologies[index],
      secretObjectives: playerData.secretObjectives[index],
      commandCounters: playerData.commandCounters[index],
      actionCards: playerData.actionCards[index],
      promissoryNotes: playerData.promissoryNotes[index],
      leaders: playerData.leaders[index]
    };
  }

  return (
    <div className="font-header fixed bottom-0 left-0 right-0 p-4 flex flex-col items-center">
      {/* Toggle minimize button */}
      <button
        className="flex items-center justify-center bg-gray-900 bg-opacity-90 text-white rounded-t-lg p-2 -mb-2 z-10 hover:bg-opacity-100 transition-all duration-150"
        onClick={() => setMinimized(!minimized)}
      >
        {minimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>


      {/* Main overlay container */}
      <div className={`bg-gray-900 bg-opacity-90 rounded-lg shadow-lg border border-gray-700 h-50 max-w-screen-xl w-full transition-all duration-300 ${minimized ? 'max-h-11 overflow-hidden' : ' max-h-40 '}`}>
        {/* Top status bar */}
        <div className="bg-gray-800 rounded-t-lg p-2 text-white text-sm flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center">
            <Shield className="mr-2 text-yellow-500" size={18} />
            <span className="font-bold">Twilight Imperium IV</span>
            <span className="ml-4 text-gray-400">Round {data.general.round}</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-yellow-900 bg-opacity-50 px-3 py-1 rounded-lg">
              <Star size={16} className="mr-1 text-yellow-400" />
              <span className="font-bold">Speaker: {data.playerData.name[data.playerData.speaker]}</span>
            </div>
            <div className="flex items-center">
              <Zap size={16} className="mr-1 text-green-400" />
              <span>Active: {data.playerData.name[data.playerData.active]}</span>
            </div>
            <div className="flex items-center">
              <Database size={16} className="mr-1 text-purple-400" />
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>

          </div>
        </div>

        {/* Main content area */}
        <div className="p-4">
          {/* Player icons row */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {data.playerData.name.map((name: string, index: number) => (
                <PlayerIcon
                  key={index}
                  player={getPlayerDataAtIndex(index)}
                  isActive={activeHover === index}
                  isSpeaker={name === data.general.speaker}
                  isActivePlayer={data.playerData.color[index] === data.general.activePlayer}
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(HOVER_STATES.NONE)}
                />
              ))}
            </div>

            {/* Scoring icon */}
            <div
              className="relative flex items-center justify-center h-16 w-16 bg-gray-800 rounded-full cursor-pointer hover:ring-2 hover:ring-yellow-400 transition-all duration-150 shadow-lg"
              onMouseEnter={() => setActiveHover(HOVER_STATES.OBJECTIVE)}
              onMouseLeave={() => setActiveHover(HOVER_STATES.NONE)}
            >
              <Award size={32} className="text-yellow-400" />
              <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full h-6 w-6 flex items-center justify-center text-xs text-white border border-gray-700">
                {getVictoryTarget()}
              </div>
              {activeHover === HOVER_STATES.OBJECTIVE && (
                <ScoringHoverCard data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Get victory point target
function getVictoryTarget() {
  return 10; // Default is 10, could be customizable
};

// Function to determine the leader
// const getLeader = (players: Player[]) => {
//   if (!players || players.length === 0) return "None";

//   const sortedPlayers = [...players].sort((a, b) => b.victoryPoints - a.victoryPoints);
//   const leader = sortedPlayers[0];

//   // Check if there's a tie
//   const isTie = sortedPlayers.filter(p => p.victoryPoints === leader.victoryPoints).length > 1;

//   return isTie
//     ? `Tie at ${leader.victoryPoints} VP`
//     : `${leader.name} (${leader.victoryPoints} VP)`;
// };

export default TI4Overlay;