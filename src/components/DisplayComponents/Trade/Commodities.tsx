
interface CommoditiesProps {
    children: any
}

const Commodities = ({ children }: CommoditiesProps) => {

    return (
            <div className="bg-[url(../assets/overlay_icons/commodity_1.png)] w-auto  font-astro bg-contain bg-no-repeat bg-center opacity-50 size-full p-1 m-1 text-center font-bold text-black">
            {children}
            </div>
    )
}

export default Commodities;