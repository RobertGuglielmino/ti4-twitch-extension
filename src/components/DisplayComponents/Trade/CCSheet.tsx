import { Player } from "../../../models/interfaces";
import playerSheet from "../../../assets/backgrounds/player-sheets.png";
import CCTokenItem from "./CCTokenItem";

interface CCSheetProps {
    player: Player
}

const CCSheet = ({player}: CCSheetProps) => {

    const textItems = [
        {
            id: "TAC",
            content: <CCTokenItem tokenType="TAC">{player.commandCounters.tactics}</CCTokenItem>,
            x: 27,
            y: 38
        },
        {
            id: "FLT",
            content: <CCTokenItem tokenType="FLT" descToTop={true}>{player.commandCounters.fleet}</CCTokenItem>,
            x: 50,
            y: 52
        },
        {
            id: "STR",
            content: <CCTokenItem tokenType="STR">{player.commandCounters.strategy}</CCTokenItem>,
            x: 73,
            y: 38
        },
    ]

    return (
        <div className="relative w-50">
            <img
                src={playerSheet}
                className={`object-cover opacity-50`}
            />

            {textItems.map((item) => (
                <div
                    key={item.id}
                    className={`absolute`}
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
}

export default CCSheet;