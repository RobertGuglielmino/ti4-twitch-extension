
interface LeaderItemProps { agent: boolean, commander: boolean, hero: boolean }

const LeaderItem = ({agent, commander, hero}: LeaderItemProps) => {

    const leaders = {agent, "CMNDR": commander, hero};

    return (
        <div className="m-1">
            {
                Object.entries(leaders).map(([leader, available]) => {
                    return (<div className={`border-4 border-double rounded-sm p-1 my-1 text-sm font-astro font-bold ${available ? "text-slate-300 bg-slate-700 border-slate-300" : "text-slate-600 bg-slate-950 border-slate-600"}`}>
                        {leader.toUpperCase()}
                    </div>);
                })
            }
        </div>
    );
}

export default LeaderItem;