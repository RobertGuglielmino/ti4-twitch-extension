
interface TradeGoodsProps {
    children: any
}

const TradeGoods = ({ children }: TradeGoodsProps) => {

    return (
        <div className="bg-[url(../assets/overlay_icons/tradegood_1.png)] font-astro bg-contain bg-no-repeat bg-center opacity-50 size-full p-1 m-1 text-center font-bold text-black">
            {children}
        </div>
    )
}

export default TradeGoods;