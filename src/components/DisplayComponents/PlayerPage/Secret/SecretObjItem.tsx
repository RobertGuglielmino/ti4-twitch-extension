interface SecretObjItem {
    getImageSrc: (id: string) => string | undefined,
    secrets: string[],
    inHand: number
}

const SecretObjItem = ({ getImageSrc, secrets, inHand }: SecretObjItem) => {


    function getScoredSecrets() {
        const scoredSecrets = [];
        if (secrets === undefined) {
            return (<></>);
        }
        for (let i = 0; i < secrets.length; i++) {
            scoredSecrets.push(
                <div key={i} className="relative h-12 w-18 flex flex-col justify-center bg-top-right border-2 rounded-sm p-1 my-1 border-red-700 overflow-hidden">
                    <img
                        src={getImageSrc("secret_front")}
                        alt=""
                        className="absolute top-0 right-0 w-[150%] h-[150%] object-cover opacity-50 origin-top-right"
                    />
                    <div className="relative z-10 flex items-center justify-center">
                        <span className="font-bold text-white text-xs">{secrets[i]}</span>
                    </div>
                </div>
            );
        }

        return (<div className="flex flex-col">
            {scoredSecrets}
        </div>);
    }

    function getUnscoredSecrets() {
        const unscoredSecrets = [];
        if (secrets === undefined) {
            return (<></>);
        }
        for (let i = 0; i < inHand; i++) {
            unscoredSecrets.push(
                <div key={i} className="relative h-12 w-18 flex flex-col justify-center bg-top-right border-2 rounded-sm p-1 my-1 border-red-950">
                    <img
                        src={getImageSrc("secret")}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                    />
                </div>
            );
        }

        return (<div className="flex flex-col">
            {unscoredSecrets}
        </div>);
    }

    function getUnclaimedSecrets() {
        const unclaimedSecrets = [];
        if (secrets === undefined) {
            return (<></>);
        }
        for (let i = 0; i < (3 - secrets.length - inHand); i++) {
            unclaimedSecrets.push(
                <div key={i} className="relative h-12 w-18 flex flex-col justify-center bg-top-right border-2 rounded-sm p-1 my-1 bg-slate-950 opacity-50 border-slate-700">
                </div>
            );
        }

        return (<div className="flex flex-col">
            {unclaimedSecrets}
        </div>);
    }

    // TODO front of card is front of secret 

    return (
        <div className="flex flex-col justify-center">
            {getScoredSecrets()}
            {getUnscoredSecrets()}
            {getUnclaimedSecrets()}
        </div>
    );
}

export default SecretObjItem;
