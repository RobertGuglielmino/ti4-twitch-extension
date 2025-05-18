import OverlayNumber from "./OverlayNumber";

interface CCTokenItemProps {
    tokenType: string,
    className?: string,
    children: any
}

const CCTokenItem = ({ tokenType, className, children }: CCTokenItemProps) => {
    return (
        <div className={`right-0 relative flex flex-col items-center mx-2 size-12 text-white ${className}`}>
            <div className="h-auto flex justify-center mx-2">
                <OverlayNumber>{children}</OverlayNumber>
            </div>
            <div className="h-auto text-center text-white font-astro text-xs font-bold w-4/5">
                {tokenType}
            </div>
        </div>
    );
}

export default CCTokenItem;