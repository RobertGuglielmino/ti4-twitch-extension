
interface FactionIconProps {
    getImageSrc: (id: string) => string | undefined,
    faction: string,
    className?: string,
}

const FactionIcon = ({ getImageSrc, faction, className }: FactionIconProps) => {
    // Get the icon path from FACTION_ICONS

    
    return (<img
        src={getImageSrc(faction.toLowerCase())}
        alt={faction}
        className={`object-contain ${className}`}
    />);
}

export default FactionIcon;
