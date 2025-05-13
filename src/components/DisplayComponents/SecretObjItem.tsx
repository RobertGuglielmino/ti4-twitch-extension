
interface SecretObjItem {
    secrets: string[],
    inHand: number
}

const SecretObjItem = ({ secrets, inHand }: SecretObjItem) => {



    function getUnscoredSecrets() {
        const unscoredSecrets = [];
        for (let i = 0; i < inHand; i++) {
            unscoredSecrets.push(<div className="bg-[url(../assets/overlay_icons/secret.short.jpg)] bg-cover bg-center border-2 rounded opacity-50 h-12 max-w-auto p-1 m-1 font-bold text-black border-red-600">
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

    console.log(secrets.length);
    console.log(inHand);

    return (
        <div>
            {secrets.map(secret => (
                <div className="border-4 rounded h-12 max-w-auto p-1 m-1 flex flex-col capitalize justify-center text-white align-middle bg-red-950 border-black">
                    {secret}
                </div>
            ))}
            {getUnscoredSecrets()}
            {getUnclaimedSecrets()}
        </div>
    );
}

export default SecretObjItem;