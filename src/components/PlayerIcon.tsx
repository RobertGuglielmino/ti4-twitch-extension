import { FACTION_ICONS } from "../assets/icons";
import { Player, StrategyCards } from "../utils/interfaces";
import PlayerHoverCard from "./PlayerHoverCard";



// Strategy card icons and colors
const strategyCards: StrategyCards = {
  "Leadership": { icon: "👑", color: "#f39c12" },
  "Diplomacy": { icon: "🤝", color: "#27ae60" },
  "Politics": { icon: "📜", color: "#8e44ad" },
  "Construction": { icon: "🏗️", color: "#d35400" },
  "Trade": { icon: "💰", color: "#f1c40f" },
  "Warfare": { icon: "⚔️", color: "#c0392b" },
  "Technology": { icon: "🔬", color: "#2980b9" },
  "Imperial": { icon: "👑", color: "#7f8c8d" }
};


// Define technology colors
interface PlayerIconProps {
  player: Player,
  isActive: boolean,
  isSpeaker: boolean,
  isActivePlayer: boolean,
  onMouseEnter: () => void,
  onMouseLeave: () => void
}

// Player icon component
const PlayerIcon = ({ player, isActive, isSpeaker, isActivePlayer, onMouseEnter, onMouseLeave }: PlayerIconProps) => {

  const playerFactionIcon = FACTION_ICONS[player.faction]; 


  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Main player icon */}
      <div
        className={`flex items-center justify-center h-16 w-16 rounded-full cursor-pointer transition-all duration-150 shadow-lg ${isActive ? 'ring-2 ring-white' : ''} ${isActivePlayer ? 'ring-4 ring-green-500' : ''}`}
        style={{ backgroundColor: player.color }}
      >
        {/* Use placeholder API for development, would be replaced with actual custom images */}
        <img
          src={playerFactionIcon}
          alt={player.faction}
          className="w-12 h-12 object-contain"
          title={player.faction}
        />
      </div>

      <div className="absolute -top-1 -left-1">
        <div
          className="h-6 w-6 rounded-full flex items-center justify-center text-xs border border-gray-700 shadow-md"
          style={{ backgroundColor: strategyCards[player.strategyCard]?.color || '#888' }}
          title={player.strategyCard}
        >
          {strategyCards[player.strategyCard]?.icon || '?'}
        </div>
      </div>

      {/* Victory points indicator - moved to top right */}
      <div className="absolute -top-1 -right-1 bg-gray-900 rounded-full h-7 w-7 flex items-center justify-center text-sm font-bold text-white border-2 border-yellow-600 shadow-lg">
        {player.victoryPoints}
      </div>

      {/* Player name with speaker indicator if applicable */}
      <div className="mt-1 text-xs text-white font-medium bg-gray-800 bg-opacity-75 px-2 py-0.5 rounded-md flex items-center">
        {isSpeaker && <span className="mr-1" title="Speaker">🔨</span>}
        {player.name}
      </div>

      {/* Hover card */}
      {isActive && (
        <PlayerHoverCard player={player} hoverIcon={playerFactionIcon}/>
      )}
    </div>
  );
};

export default PlayerIcon;