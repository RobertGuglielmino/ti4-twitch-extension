interface ActionCardsProps {
    children: any
}

const ActionCards = ({ children }: ActionCardsProps) => {

    return (
            <div className="bg-[url(../assets/overlay_icons/action.short.jpg)] w-auto font-astro bg-contain bg-no-repeat bg-center opacity-50 size-full p-1 m-1 font-bold text-center text-black">
                {children}
            </div>
    )
}

export default ActionCards;