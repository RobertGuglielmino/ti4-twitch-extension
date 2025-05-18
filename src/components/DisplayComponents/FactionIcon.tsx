import { FACTION_ICONS } from "../../assets/icons";

interface FactionIconProps {
    faction: string,
    className?: string,
}

const FactionIcon = ({ faction, className }: FactionIconProps) => {
    return (<img
        src={FACTION_ICONS[faction]}
        alt={faction}
        className={`object-contain ${className}`}
    />);
}

export default FactionIcon;