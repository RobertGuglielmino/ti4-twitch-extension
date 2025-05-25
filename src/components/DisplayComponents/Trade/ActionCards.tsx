import action from "@icons/overlay_icons/action.short.jpg";

interface ActionCardsProps {
    getImageSrc: (id: string) => string | undefined,
    children: React.ReactNode
}

const ActionCards = ({ getImageSrc, children }: ActionCardsProps) => {
    return (
        <div className="flex flex-col items-center max-w-1/4">
            <img src={getImageSrc("action")} alt="Action" className="object-contain h-8"/>
            <div className="relative z-10 inline-block font-astro p-1 m-1 font-bold text-center">
                {children}
            </div>
        </div>
    )
}

export default ActionCards;

        // <div className="relative inline-block px-2">
        //     <div className="absolute inset-0 bg-[url(@icons/overlay_icons/action.short.jpg)] bg-center bg-no-repeat bg-contain opacity-60"></div>
        //     <div className="relative z-10 inline-block font-astro p-1 m-1 font-bold text-center">
        //         {children}
        //     </div>
        // </div>