


interface TechChipProps {
    name: string,
    color: string,
    level?: number,
    active?: boolean
}

const TechChipV2 = ({ name, color, level = 1, active = true }: TechChipProps) => {

    const colorStyle = getColorStyles(color, level)

    return (<div className={`font-astro text-xs border-2 rounded h-auto flex flex-col items-center justify-center w-full p-1 m-1 ${colorStyle} ${active ? "opacity-100" : "opacity-25"}`}>
        {name}
    </div>);
}


// Tailwind doesn't accept properties with dynamic values, so we have to do it this way.
function getColorStyles(colorInput: string, level: number) {
    if (colorInput === "red") {
        if (level === 0) return "text-red-100 bg-red-600 border-red-500";
        if (level === 1) return "text-red-100 bg-red-700 border-red-500";
        if (level === 2) return "text-red-100 bg-red-800 border-red-500";
        if (level === 3) return "text-red-100 bg-red-950 border-red-500";
        return "text-red-100 bg-red-600 border-red-500";
    }

    if (colorInput === "blue") {
        if (level === 0) return "text-sky-100 bg-sky-600 border-sky-600";
        if (level === 1) return "text-sky-100 bg-sky-700 border-sky-600";
        if (level === 2) return "text-sky-100 bg-sky-800 border-sky-600";
        if (level === 3) return "text-sky-100 bg-sky-950 border-sky-600";
        return "text-sky-100 bg-sky-600 border-sky-600";
    }

    if (colorInput === "green") {
        if (level === 0) return "text-green-100 bg-green-600 border-green-600";
        if (level === 1) return "text-green-100 bg-green-700 border-green-600";
        if (level === 2) return "text-green-100 bg-green-800 border-green-600";
        if (level === 3) return "text-green-100 bg-green-950 border-green-600";
        return "text-green-100 bg-green-600 border-green-600";
    }

    if (colorInput === "yellow") {
        if (level === 0) return "text-yellow-100 bg-yellow-600 border-yellow-400";
        if (level === 1) return "text-yellow-100 bg-yellow-700 border-yellow-400";
        if (level === 2) return "text-yellow-100 bg-yellow-800 border-yellow-400";
        if (level === 3) return "text-yellow-100 bg-yellow-950 border-yellow-400";
        return "text-yellow-100 bg-yellow-600 border-yellow-400";
    }

    if (colorInput === "white") {
        if (level === 0) return "text-zinc-200 bg-zinc-600 border-zinc-300";
        if (level === 1) return "text-zinc-200 bg-zinc-700 border-zinc-300";
        if (level === 2) return "text-zinc-200 bg-zinc-800 border-zinc-300";
        if (level === 3) return "text-zinc-200 bg-zinc-900 border-zinc-300";
        return "text-zinc-200 bg-zinc-600 border-zinc-300";
    }

    // Default case
    if (level === 0) return "text-slate-300 bg-slate-600 border-slate-300";
    if (level === 1) return "text-slate-300 bg-slate-700 border-slate-300";
    if (level === 2) return "text-slate-300 bg-slate-800 border-slate-300";
    if (level === 3) return "text-slate-300 bg-slate-900 border-slate-300";
    return "text-slate-300 bg-slate-600 border-slate-300";
}


export default TechChipV2;
