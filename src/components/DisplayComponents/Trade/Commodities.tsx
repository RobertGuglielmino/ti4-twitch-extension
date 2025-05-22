import commodity from "@icons/overlay_icons/commodity_1.png";

interface CommoditiesProps {
    children: React.ReactNode
}

const Commodities = ({ children }: CommoditiesProps) => {
    return (
        <div className="flex flex-col items-center w-1/4">
            <img src={commodity} alt="commodity" className="object-contain h-8"/>
            <div className="relative z-10 inline-block font-astro p-1 m-1 font-bold text-center">
                {children}
            </div>
        </div>
    )
}

export default Commodities;

        // <div className="relative inline-block px-2">
        //     <div className="absolute inset-0 bg-[url(@icons/overlay_icons/commodity_1.png)] bg-center bg-no-repeat bg-contain opacity-60"></div>
        //     <div className="relative z-10 inline-block font-astro p-1 m-1 font-bold text-center">
        //         {children}
        //     </div>
        // </div>