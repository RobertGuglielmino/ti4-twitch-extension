
interface SecretObjItem {
    secrets: string[],
    inHand: number
}

const SecretObjItem = ({ secrets, inHand }: SecretObjItem) => {

    function getUnscoredSecrets() {
        const secrets = []
        for (let i = 0; i < inHand; i++) {
            secrets.push(<div className="bg-[url(../assets/overlay_icons/secret.short.jpg)] bg-cover bg-center border-2 rounded opacity-50 h-12 max-w-auto p-1 m-1 font-bold text-black border-red-600">
            </div>);
        }

        return (<ul>
            {secrets}
        </ul>);
    }

    return (
        <div>
            {secrets.map(secret => (
                <div className="border-2 rounded h-12 max-w-auto p-1 m-1 font-bold  text-red-100 bg-red-950 border-black">
                    {secret}
                </div>
            ))}
            {getUnscoredSecrets()}

        </div>
    );
}

export default SecretObjItem;