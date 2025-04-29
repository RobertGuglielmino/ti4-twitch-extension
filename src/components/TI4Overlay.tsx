import { useEffect, useState } from 'react';
import { Award, Star, Shield, Zap, Database, ChevronUp, ChevronDown } from 'lucide-react';
import PlayerIcon from './PlayerIcon';
import ScoringHoverCard from './ScoringHoverCard';
import { GameData } from '../utils/interfaces';
import { HOVER_STATES } from '../utils/enums';

// Mock data - would be replaced by Google Sheets integration
const mockData: GameData = {
  players: [
    {
      id: 1,
      name: "Sarah",
      faction: "Nekro",
      factionIcon: "/images/factions/sol.png", // Path to custom faction PNG
      color: "#3498db",
      victoryPoints: 6,
      strategyCard: "Technology",
      technologies: ["Neural Motivator", "Antimass Deflectors", "Plasma Scoring", "Hyper Metabolism", "Fleet Logistics"],
      secretObjectives: ["Control 4 planets of the same trait", "Win a combat against the player with the most VPs"],
      commandCounters: { tactics: 3, fleet: 2, strategy: 2 },
      actionCards: 4,
      promissoryNotes: 2,
      leaders: { commander: true, hero: true, agent: false }
    },
    {
      id: 2,
      name: "Mike",
      faction: "Nekro",
      factionIcon: "/images/factions/letnev.png", // Path to custom faction PNG
      color: "#e74c3c",
      victoryPoints: 7,
      strategyCard: "Warfare",
      technologies: ["Sarween Tools", "Neural Motivator", "Graviton Laser System", "Dreadnought II"],
      secretObjectives: ["Have 3 ships in 3 systems adjacent to Mecatol Rex"],
      commandCounters: { tactics: 4, fleet: 3, strategy: 1 },
      actionCards: 2,
      promissoryNotes: 3,
      leaders: { commander: true, hero: false, agent: true }
    },
    {
      id: 3,
      name: "Alex",
      faction: "Nekro",
      factionIcon: "/images/factions/hacan.png", // Path to custom faction PNG
      color: "#f1c40f",
      victoryPoints: 5,
      strategyCard: "Trade",
      technologies: ["Sarween Tools", "Gravity Drive", "Neural Motivator", "Integrated Economy"],
      secretObjectives: ["Have 8 resources worth of non-fighter ships"],
      commandCounters: { tactics: 2, fleet: 1, strategy: 4 },
      actionCards: 7,
      promissoryNotes: 4,
      leaders: { commander: false, hero: false, agent: true }
    },
    {
      id: 4,
      name: "Taylor",
      faction: "Nekro",
      factionIcon: "/images/factions/xxcha.png", // Path to custom faction PNG
      color: "#2ecc71",
      victoryPoints: 4,
      strategyCard: "Diplomacy",
      technologies: ["Graviton Laser System", "Neural Motivator", "Antimass Deflectors", "Cruiser II"],
      secretObjectives: ["Have units in 5 systems that contain planets"],
      commandCounters: { tactics: 3, fleet: 2, strategy: 3 },
      actionCards: 3,
      promissoryNotes: 2,
      leaders: { commander: true, hero: false, agent: true }
    },
    {
      id: 5,
      name: "Jordan",
      faction: "Nekro",
      factionIcon: "/images/factions/sardakk.png", // Path to custom faction PNG
      color: "#8e44ad",
      victoryPoints: 3,
      strategyCard: "Construction",
      technologies: ["Graviton Laser System", "Magen Defense Grid", "Cruiser II"],
      secretObjectives: ["Win a combat against the player with the most influence", "Control 6 planets outside your home system"],
      commandCounters: { tactics: 5, fleet: 4, strategy: 0 },
      actionCards: 1,
      promissoryNotes: 1,
      leaders: { commander: false, hero: false, agent: true }
    },
    {
      id: 6,
      name: "Casey",
      faction: "Nekro",
      factionIcon: "/images/factions/jolnar.png", // Path to custom faction PNG
      color: "#1abc9c",
      victoryPoints: 8,
      strategyCard: "Leadership",
      technologies: ["Neural Motivator", "Gravity Drive", "Antimass Deflectors", "Plasma Scoring", "Carrier II", "Cruiser II", "Dreadnought II", "PDS II"],
      secretObjectives: ["Have 4 faction technologies", "Have 2 war suns on the board"],
      commandCounters: { tactics: 2, fleet: 2, strategy: 3 },
      actionCards: 3,
      promissoryNotes: 1,
      leaders: { commander: true, hero: true, agent: true }
    }
  ],
  objectives: {
    public: [
      {
        id: 1, name: "Corner the Market", description: "Control 4 planets that have the same trait", points: 1, scored: [1, 6], progress: {
          1: "3 ",
          3: "1",
          5: "2"
        }
      },
      {
        id: 2, name: "Develop Weaponry", description: "Own 2 unit upgrade technologies", points: 1, scored: [2, 6], progress: {
          3: "1",
          4: "1"
        }
      },
      {
        id: 3, name: "Diversify Research", description: "Own 2 technologies in each of 2 colors", points: 1, scored: [3, 6], progress: {
          1: "2B, 1Y",
          2: "1B, 1R",
          4: "2B, 1R"
        }
      },
      {
        id: 4, name: "Found Research Outposts", description: "Control 3 planets that have technology specialties", points: 1, scored: [4, 6], progress: {
          2: "1",
          3: "2",
          5: "1"
        }
      },
      {
        id: 5, name: "Improve Infrastructure", description: "Have 3 structures on the board", points: 1, scored: [5], progress: {
          1: "1",
          4: "2",
          6: "2"
        }
      },
      { id: 6, name: "Lead From the Front", description: "Win a combat in which you spent at least 2 command tokens from your tactic pool", points: 2, scored: [1, 2], progress: {} },
      {
        id: 7, name: "Centralize Galactic Trade", description: "Spend 10 influence", points: 2, scored: [3], progress: {
          2: "7/10",
          4: "4/10",
          5: "5/10"
        }
      },
      {
        id: 8, name: "Master the Sciences", description: "Own 2 technologies in each of 4 colors", points: 2, scored: [6], progress: {
          1: "2B, 0Y, 1R, 0G",
          3: "1B, 2Y, 0R, 0G"
        }
      }
    ],
    secret: [], // Hidden from view
    mecatol: { name: "Imperium Rex", description: "Control Mecatol Rex", points: 1, scored: [1, 6] }
  },
  laws: [
    { name: "Minister of Commerce", description: "The elected player gains 3 trade goods", electedPlayer: "Alex" },
    { name: "Fleet Regulations", description: "Each player's fleet limit is reduced by 1" },
    { name: "Classified Document Leaks", description: "At the start of the status phase, each player may spend 1 command token from their strategy pool to look at 1 other player's secret objective" }
  ],
  general: {
    round: 4,
    speaker: "Mike",
    activePlayer: "Sarah",
    time: "2:45:30"
  }
};


// Main overlay component
const TI4Overlay = () => {
  const [data, setData] = useState(mockData);
  const [activeHover, setActiveHover] = useState(HOVER_STATES.NONE);
  const [minimized, setMinimized] = useState(false);
  // const { data, isConnected } = useTI4WebSocket('ws://localhost:8080');



  // In a real implementation, we would fetch game state from the local server
  useEffect(() => {
    // Simulating periodic data fetch from local server
    const fetchGameState = async () => {
      try {
        console.log('Fetching game state from server...');
        const response = await fetch('http://localhost:8081/data?key=buddy', {
          method: 'GET',
          headers: {
            'Origin': 'https://ti4-online.github.io',
            'Referer': 'https://ti4-online.github.io/',
            'Sec-Fetch-Site': 'cross-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ti4-streamer-buddy/1.1.0 Chrome/108.0.5359.62 Electron/22.0.0 Safari/537.36'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch game state:", error);
      }
    };

    fetchGameState();
    const intervalId = setInterval(fetchGameState, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex flex-col items-center">
      {/* Toggle minimize button */}
      <button
        className="flex items-center justify-center bg-gray-900 bg-opacity-90 text-white rounded-t-lg p-2 -mb-2 z-10 hover:bg-opacity-100 transition-all duration-150"
        onClick={() => setMinimized(!minimized)}
      >
        {minimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Main overlay container */}
      <div className={`bg-gray-900 bg-opacity-90 rounded-lg shadow-lg border border-gray-700 h-50 max-w-screen-xl w-full transition-all duration-300 ${minimized ? 'max-h-14 overflow-hidden' : ' max-h-48 '}`}>
        {/* Top status bar */}
        <div className="bg-gray-800 rounded-t-lg p-2 text-white text-sm flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center">
            <Shield className="mr-2 text-yellow-500" size={18} />
            <span className="font-bold">Twilight Imperium IV</span>
            <span className="ml-4 text-gray-400">Round {data.general.round}</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Speaker indicator with more emphasis */}
            <div className="flex items-center bg-yellow-900 bg-opacity-50 px-3 py-1 rounded-lg">
              <Star size={16} className="mr-1 text-yellow-400" />
              <span className="font-bold">Speaker: {data.general.speaker}</span>
            </div>
            <div className="flex items-center">
              <Zap size={16} className="mr-1 text-green-400" />
              <span>Active: {data.general.activePlayer}</span>
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
              {data.players.map((player) => (
                <PlayerIcon
                  key={player.id}
                  player={player}
                  isActive={activeHover === player.id}
                  isSpeaker={player.name === data.general.speaker}
                  isActivePlayer={player.name === data.general.activePlayer}
                  onMouseEnter={() => setActiveHover(player.id)}
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