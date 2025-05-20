interface PromissoryProps {
    children: React.ReactNode
}

const Promissory = ({ children }: PromissoryProps) => {
    return (
        <div className="relative inline-block px-2">
            <div className="absolute inset-0 bg-[url(@icons/overlay_icons/promissory.short.jpg)] bg-center bg-no-repeat bg-contain opacity-60"></div>
            <div className="relative z-10 inline-block font-astro p-1 m-1 font-bold text-center">
                {children}
            </div>
        </div>
    )
}

export default Promissory;
