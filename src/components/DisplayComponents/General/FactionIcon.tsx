import { FACTION_ICONS } from "../../../assets/icons";

interface FactionIconProps {
    faction: string,
    className?: string,
}

const FactionIcon = ({ faction, className }: FactionIconProps) => {
    // Get the icon path from FACTION_ICONS
  const normalizedFaction = faction.charAt(0).toUpperCase() + faction.slice(1).toLowerCase();
  const playerFactionIcon = FACTION_ICONS[normalizedFaction]; 
    
    return (<img
        src={playerFactionIcon}
        alt={faction}
        className={`object-contain ${className}`}
    />);
}

export default FactionIcon;
