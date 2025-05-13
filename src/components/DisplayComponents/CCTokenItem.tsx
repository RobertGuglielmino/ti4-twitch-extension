import OverlayNumber from "./OverlayNumber";

interface CCTokenItemProps {
    tokenType: string,
    children: any
}

const CCTokenItem = ({ tokenType, children }: CCTokenItemProps) => {
    return (
        <div className="flex flex-col items-center bg-gray-800 rounded">
            <div className="flex justify-center mx-2">
                <OverlayNumber>{children}</OverlayNumber>
            </div>
            <div className="text-center text-black font-astro text-xs font-bold w-4/5">
                {tokenType}
            </div>

        </div>
    );
}

export default CCTokenItem;