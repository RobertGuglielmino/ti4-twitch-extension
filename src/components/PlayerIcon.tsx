import { Player } from "../models/interfaces";
import PlayerHoverCard from "./DisplayComponents/PlayerPage/PlayerHoverCard";


interface PlayerIconProps {
  player: Player,
  isActive: boolean,
  isSpeaker: boolean,
  isActivePlayer: boolean,
  getImageSrc: (id: string) => string | undefined,
  isImageLoaded: (id: string) => boolean,
  onTouchStart: () => void,
  onTouchEnd: () => void
  onMouseEnter: () => void,
  onMouseLeave: () => void
}


// Player icon component
const PlayerIcon = ({ player, isActive, isActivePlayer, getImageSrc, isImageLoaded, onTouchStart, onTouchEnd, onMouseEnter, onMouseLeave }: PlayerIconProps) => {

  return (
    <div
      className="relative flex flex-col items-center max-w-24 first:pr-2 last:pl-2 px-2"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`flex shrink-0 items-center justify-center h-16 w-16 rounded-full cursor-pointer transition-all duration-150 shadow-lg ${isActive ? 'ring-2 ring-white' : ''} ${isActivePlayer ? 'ring-4 ring-green-500' : ''}`}
        style={{ backgroundColor: player.color }}
      >
        {player.faction != "" ? <img
          src={getImageSrc(player.faction.toLowerCase())}
          alt={player.faction}
          className="w-12 h-12 object-contain"
          title={player.faction}
        /> : <div className="flex text-4xl text-center font-avalors">?</div>}
      </div>

      <div className="flex flex-col h-full justify-center content-center">
        <div className="mt-1 text-xs line-clamp-2 break-all text-white bg-gray-800 bg-opacity-75 px-1 py-0.5 rounded-md h-auto">
          {player.name}
        </div>
      </div>

      {isActive && (
        <PlayerHoverCard player={player} hoverIcon={player.faction.toLowerCase()} getImageSrc={(id) => getImageSrc(id)} isImageLoaded={(id) => isImageLoaded(id)} />
      )}
    </div>
  );
};

export default PlayerIcon;
