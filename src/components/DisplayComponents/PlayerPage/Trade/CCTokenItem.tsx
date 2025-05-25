import OverlayNumber from "../../General/OverlayNumber";

interface CCTokenItemProps {
    tokenType: string,
    children: any,
    descToTop?: boolean,
}

const CCTokenItem = ({ tokenType, children, descToTop = false }: CCTokenItemProps) => {
    return (
        <div className={`flex flex-col items-center mx-2 text-xl text-white`}>
            {descToTop && <div className="h-auto text-4xl flex justify-center mx-2">
                <OverlayNumber>{children}</OverlayNumber>
            </div>}
            <div className="text-sm">
                {tokenType}
            </div>
            {!descToTop && <div className="h-auto text-4xl flex justify-center mx-2">
                <OverlayNumber>{children}</OverlayNumber>
            </div>}
        </div>
    );
}

export default CCTokenItem;