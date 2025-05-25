
interface LeaderItemProps { agent: boolean, commander: boolean, hero: boolean, getImageSrc: (id: string) => string | undefined
 }

const LeaderItem = ({agent, commander, hero}: LeaderItemProps) => {

    const leaders = {agent, "CMNDR": commander, hero};
    const bgImages: any = {agent: "bg-[url(@icons/backgrounds/agent.png)]", "CMNDR": "bg-[url(@icons/backgrounds/commander.png)]", hero: "bg-[url(@icons/backgrounds/hero.png)]" }

    return (
        <div className="m-1">
            {
                Object.entries(leaders).map(([leader, available]) => {
                    return (<div key={leader} className={`${bgImages[leader]} bg-[length:auto_200%] h-12 w-18 flex flex-col justify-center bg-top-right border-2 rounded-sm p-1 my-1 text-lg font-astro font-bold  ${available ? "text-slate-300 border-slate-300" : "text-gray-400 brightness-50 border-gray-600"}`}>
                        {leader.toUpperCase()}
                    </div>);
                })
            }
        </div>
    );
}

export default LeaderItem;