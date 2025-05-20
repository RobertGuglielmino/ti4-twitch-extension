


interface TechChipProps {
    name: string,
    color: string,
    active?: boolean
}

const TechChip = ({ name, color, active }: TechChipProps) => {

    function getColorStyles(colorInput: string) {
        switch (colorInput) {
            case "red":
                return "text-red-100 bg-red-900 border-red-500";
            case "blue":
                return "text-sky-100 bg-sky-900 border-sky-600";
            case "green":
                return "text-green-100 bg-green-950 border-green-600";
            case "yellow":
                return "text-yellow-100 bg-yellow-900 border-yellow-400";
            case "white":
                return "text-zinc-200 bg-zinc-700 border-zinc-300";
            default:
                return "text-slate-300 bg-slate-950 border-slate-300";
        }
    }

    const colorStyle = getColorStyles(color)

    return (<div className={`font-astro text-xs border-2 rounded h-10 flex flex-col items-center justify-center w-16 p-1 m-1 ${colorStyle} ${active ? "opacity-100" : "opacity-100"}`}>
        {name}
    </div>);
}

export default TechChip;
