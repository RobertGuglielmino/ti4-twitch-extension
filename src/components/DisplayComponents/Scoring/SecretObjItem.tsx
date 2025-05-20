import secretFront from "../../../assets/backgrounds/secretFront.png"; 
import secretShort from "../../../assets/overlay_icons/secret.short.jpg";

interface SecretObjItem {
    secrets: string[],
    inHand: number
}

const SecretObjItem = ({ secrets, inHand }: SecretObjItem) => {

    function getScoredSecrets() {
        const scoredSecrets = [];
        for (let i = 0; i < secrets.length; i++) {
            scoredSecrets.push(<div key={i} className="relative border-2 rounded h-12 w-full m-1 border-red-700">
                <img
                    src={secretFront}
                    alt=""
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-white">{secrets[i]}</span>
                </div>
            </div>);
        }

        return (<ul>
            {scoredSecrets}
        </ul>);
    }

    function getUnscoredSecrets() {
        const unscoredSecrets = [];
        for (let i = 0; i < inHand; i++) {
            unscoredSecrets.push(<div className="relative border-2 rounded h-12 w-full m-1 border-red-950">
                <img
                    src={secretShort}
                    alt=""
                    className="w-full h-full object-cover opacity-50"
                />
            </div>);
        }

        return (<ul>
            {unscoredSecrets}
        </ul>);
    }

    function getUnclaimedSecrets() {
        const unclaimedSecrets = [];
        for (let i = 0; i < (3 - secrets.length - inHand); i++) {
            unclaimedSecrets.push(<div className="bg-slate-950 border-2 rounded opacity-50 h-12 max-w-auto p-1 m-1 font-bold text-black border-slate-700">
            </div>);
        }

        return (<ul>
            {unclaimedSecrets}
        </ul>);
    }

    // TODO front of card is front of secret 

    return (
        <div>
            {getScoredSecrets()}
            {getUnscoredSecrets()}
            {getUnclaimedSecrets()}
        </div>
    );
}

export default SecretObjItem;