interface PromissoryProps {
    children: any
}

const Promissory = ({  children }: PromissoryProps) => {

    return (
            <div className="bg-[url(../assets/overlay_icons/promissory.short.jpg)] font-astro bg-contain bg-no-repeat bg-center opacity-50 size-full p-1 m-1 text-center font-bold text-black">
            {children}
            </div>
    )
}

export default Promissory;