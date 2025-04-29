import { Player, StrategyCards } from "../utils/interfaces";

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


interface PlayerHoverCardProps {
    player: Player,
    hoverIcon: any,
}

interface TechnologyColors {
    [key: string]: string;
}
const techColors: TechnologyColors = {
    blue: "#3498db",    // Propulsion
    green: "#2ecc71",   // Biotic
    red: "#e74c3c",     // Warfare
    yellow: "#f1c40f"   // Cybernetic
};

// Player hover card component
const PlayerHoverCard = ({ player, hoverIcon }: PlayerHoverCardProps) => {

    // Group technologies by color
    const techsByColor = {
        blue: player.technologies.filter(tech =>
            tech.includes("Neural") || tech.includes("Gravity") || tech.includes("Antimass") || tech.includes("Fleet")),
        green: player.technologies.filter(tech =>
            tech.includes("Carrier") || tech.includes("Cruiser") || tech.includes("Dreadnought") || tech.includes("PDS") || tech.includes("War Sun")),
        red: player.technologies.filter(tech =>
            tech.includes("Magen") || tech.includes("Plasma") || tech.includes("Graviton")),
        yellow: player.technologies.filter(tech =>
            tech.includes("Sarween") || tech.includes("Integrated") || tech.includes("Hyper"))
    };

    return (
        <div className="absolute left-0 bottom-16 z-50 bg-gray-900 bg-opacity-95 rounded-lg p-3 shadow-xl border border-gray-700 w-100 text-white">
            <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full mr-2 flex items-center justify-center" style={{ backgroundColor: player.color }}>
                    <img
                        src={hoverIcon} 
                        alt={player.faction}
                        className="w-8 h-8 object-contain"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{player.name}</h3>
                    <p className="text-xs text-gray-300 truncate">{player.faction}</p>
                </div>
                <div className="bg-gray-800 px-2 py-1 rounded-lg flex items-center border-2 border-yellow-600 ml-2">
                    {/* <Star size={14} className="text-yellow-400 mr-1" /> */}
                    <span className="text-xl font-bold">{player.victoryPoints}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-800 p-2 rounded">
                    <h4 className="font-bold text-xs uppercase text-gray-400 mb-1">Strategy Card</h4>
                    <div className="text-sm flex items-center">
                        <div className="flex items-center">
                            <span className="mr-1">{strategyCards[player.strategyCard]?.icon || '?'}</span>
                            {player.strategyCard}
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 p-2 rounded">
                    <h4 className="font-bold text-xs uppercase text-gray-400 mb-1">Command Counters</h4>
                    <div className="grid grid-cols-3 gap-1 text-xs">
                        <div className="bg-gray-700 rounded p-1 text-center">
                            <span className="text-gray-400 text-xs">TAC</span>
                            <span className="text-lg font-bold block">{player.commandCounters.tactics}</span>
                        </div>
                        <div className="bg-gray-700 rounded p-1 text-center">
                            <span className="text-gray-400 text-xs">FLT</span>
                            <span className="text-lg font-bold block">{player.commandCounters.fleet}</span>
                        </div>
                        <div className="bg-gray-700 rounded p-1 text-center">
                            <span className="text-gray-400 text-xs">STR</span>
                            <span className="text-lg font-bold block">{player.commandCounters.strategy}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h4 className="font-bold text-xs uppercase text-gray-400 mb-1">Technologies</h4>

                <div className="grid grid-cols-4 gap-1">
                    {Object.entries(techsByColor).map(([color, techs]) => (
                        <div key={color} className="flex flex-col">
                            <div className="h-1.5 rounded-t" style={{ backgroundColor: techColors[color] }}></div>
                            <div className="bg-gray-800 p-1 rounded-b flex-1">
                                <div className="text-xs text-gray-400">{color[0].toUpperCase()}</div>
                                <div className="text-xs">
                                    {techs.length > 0 ? (
                                        techs.map((tech, i) => (
                                            <div key={i} className="mb-1">•{tech}</div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500">None</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-gray-800 p-1 rounded flex flex-col items-center">
                    <h4 className="font-bold text-xs uppercase text-gray-400">Actions</h4>
                    <p className="text-xl font-bold">{player.actionCards}</p>
                </div>
                <div className="bg-gray-800 p-1 rounded flex flex-col items-center">
                    <h4 className="font-bold text-xs uppercase text-gray-400">Promissory</h4>
                    <p className="text-xl font-bold">{player.promissoryNotes}</p>
                </div>
                <div className="bg-gray-800 p-1 rounded flex flex-col items-center">
                    <h4 className="font-bold text-xs uppercase text-gray-400">Leaders</h4>
                    <div className="flex justify-around w-full">
                        {/* Leaders with improved visual indicators */}
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${player.leaders.agent ? "bg-green-700" : "bg-red-700"}`} title="Agent">
                            {player.leaders.agent ? "✓" : "✗"}
                        </div>
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${player.leaders.commander ? "bg-green-700" : "bg-red-700"}`} title="Commander">
                            {player.leaders.commander ? "✓" : "✗"}
                        </div>
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center ${player.leaders.hero ? "bg-green-700" : "bg-red-700"}`} title="Hero">
                            {player.leaders.hero ? "✓" : "✗"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-2 rounded">
                <h4 className="font-bold text-xs uppercase text-gray-400 mb-1">Secret Objectives</h4>
                <ul className="text-xs text-gray-300 max-h-16 overflow-y-auto">
                    {player.secretObjectives.length > 0 ? (
                        player.secretObjectives.map((objective, idx) => (
                            <li key={idx} className="mb-0.5 flex items-start last:mb-0">
                                <span className="mr-1">•</span>
                                <span>{objective}</span>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">None</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PlayerHoverCard;