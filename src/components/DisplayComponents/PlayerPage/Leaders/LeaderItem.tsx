
interface LeaderItemProps { 
    agent: boolean, 
    commander: boolean, 
    hero: boolean, 
    getImageSrc: (id: string) => string | undefined
}

const LeaderItem = ({ agent, commander, hero, getImageSrc }: LeaderItemProps) => {
    const leaders = { agent, "CMNDR": commander, hero };
    
    return (
        <div className="flex flex-col">
            {
                Object.entries(leaders).map(([leader, available]) => {
                    const leaderId = leader.toLowerCase();
                    return (
                        <div key={leader} className={`relative h-12 w-18 flex flex-col justify-center bg-top-right border-2 rounded-sm p-1 my-1 overflow-hidden ${available ? "border-slate-300" : "border-gray-600 opacity-50"}`}>
                            <img
                                src={getImageSrc(leaderId)}
                                alt={leader}
                                className="absolute top-0 right-0  w-[150%] h-[150%] object-cover opacity-50 origin-top-right"
                            />
                            <div className="relative z-10 flex items-center justify-center">
                                <span className={`font-astro font-bold text-lg ${available ? "text-slate-300" : "text-gray-400"}`}>
                                    {leader.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default LeaderItem;
