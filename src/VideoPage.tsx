
import pako from 'pako';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import useImageBus, { UseImageBusReturn } from './utils/useImageBus.tsx';
import { preload_images } from './models/image_items';

const overlaySchema = z.array(z.object({
    playerName: z.string(),
    color: z.string(),
    score: z.number(),
    faction: z.string(),
    strategyCard: z.string(),
    strategyCardsFaceDown: z.string().nullable(),
    speaker: z.boolean()
}));

const mockDataConfig = [
    {
        playerName: "Robert",
        color: "white",
        score: 5,
        faction: "Mentak",
        strategyCard: "Warfare",
        strategyCardsFaceDown: null,
        speaker: false
    },
    {
        playerName: "Matt",
        color: "blue",
        score: 6,
        faction: "Arborec",
        strategyCard: "Leadership",
        strategyCardsFaceDown: null,
        speaker: false
    },
    {
        playerName: "Jeff",
        color: "green",
        score: 7,
        faction: "Letnev",
        strategyCard: "Trade",
        strategyCardsFaceDown: null,
        speaker: false
    },
    {
        playerName: "Jeff",
        color: "yellow",
        score: 7,
        faction: "Muaat",
        strategyCard: "Trade",
        strategyCardsFaceDown: null,
        speaker: false
    },
    {
        playerName: "Jeff",
        color: "purple",
        score: 7,
        faction: "Yin",
        strategyCard: "Trade",
        strategyCardsFaceDown: null,
        speaker: false
    },
    {
        playerName: "Jeff",
        color: "red",
        score: 7,
        faction: "Xxcha",
        strategyCard: "Trade",
        strategyCardsFaceDown: null,
        speaker: false
    }
];

interface OverlayPlayer {
    playerName: string;
    color: string;
    score: number;
    faction: string;
    strategyCard: string;
    strategyCardFlipped?: boolean;
    speaker: boolean;
}

function VideoPage() {
    const {
        getImageSrc,
        isImageLoaded
    }: UseImageBusReturn = useImageBus(preload_images);
    const [data, setData] = useState<OverlayPlayer[]>(mockDataConfig);

    useEffect(() => {
        window.Twitch.ext.listen(
            "broadcast",
            (_: string, contentType: string, message: string) => {
                if (contentType !== "application/json") {
                    console.debug(`Unexpected contentType "${contentType}"`);
                    return;
                }

                const processedData = handlePubSubMessage(message);
                const structuredData: OverlayPlayer[] = formatForOverlay(processedData);
                if (structuredData) {
                    try {
                        const validatedData: OverlayPlayer[] = overlaySchema.parse(processedData);
                        setData(
                            validatedData
                        );
                    } catch (error) {
                        console.error('Invalid data format:', error);
                    }
                }
            },
        );
    }, []);

    function handlePubSubMessage(message: string) {
        try {
            const parsedMessage = JSON.parse(message);

            // Check if the message is compressed
            if (parsedMessage.compressed) {
                const compressedData = parsedMessage.data;
                const binaryData = atob(compressedData);

                const charData = binaryData.split('').map(x => x.charCodeAt(0));
                const binData = new Uint8Array(charData);

                const decompressedData = pako.inflate(binData, { to: 'string' });

                return JSON.parse(decompressedData);
            } else {
                return parsedMessage;
            }
        } catch (error) {
            console.error('Error processing message:', error);
            return null;
        }
    }

    function formatForOverlay(data: any): OverlayPlayer[] {

        let players = [];

        for (let i = 0; i < data.playerData.name.length; i++) {
            players[i] = {
                playerName: data.playerData.name[i],
                color: data.playerData.color[i],
                score: data.playerData.victoryPoints[i],
                faction: data.playerData.faction[i],
                strategyCard: data.playerData.strategyCard[i],
                strategyCardFlipped: data.playerData.strategyCardsFaceDown[i],
                speaker: data.playerData.speaker === i
            };

        }
        return players;
    }

    return <div className="grid grid-cols-3 bg-tipurple h-45 w-200">

        {data.map(player => {
            const factionId = player.faction.toLowerCase();
            const speakerId = "speaker";
            return (<div key={player.color} className="flex flex-row text-tiyellow w-auto h-auto justify-between items-center bg-gray-900 border border-gray-500 gap-2 p-2">
                <div className={`${getBGColor(player.color)} p-1 min-w-14 size-14 rounded-full relative`}>
                    {isImageLoaded(factionId) ? (
                        <img src={getImageSrc(factionId)} alt={player.faction} />
                    ) : (
                        <div className="w-full h-full bg-gray-700 animate-pulse"></div>
                    )}
                    {player.speaker && isImageLoaded(speakerId) && (
                        <div className="absolute -bottom-1 left-0 w-full h-4">
                            <img src={getImageSrc(speakerId)} alt="Speaker" className="object-cover w-full h-full" />
                        </div>
                    )}
                </div>
                <div className=" flex flex-col min-w-auto items-center">
                    <div className={`text-xl ${getTextColor(player.color)} `}>
                        {player.playerName}
                    </div>
                    <div className={`text-lg ${player.strategyCardFlipped ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {player.strategyCard}
                    </div>
                </div>
                <div className={`${getTextColor(player.color)}  min-w-auto text-6xl`}>
                    {player.score}
                </div>
            </div>)
        })}

    </div>
        ;

    function getBGColor(color: string) {
        switch (color.toLowerCase()) {
            case 'red':
                return 'bg-tired';
            case 'blue':
                return 'bg-tiblue';
            case 'green':
                return 'bg-tigreen';
            case 'yellow':
                return 'bg-tiyellow';
            case 'white':
                return 'bg-tiwhite';
            case 'purple':
                return 'bg-tipurple';
            default:
                return 'bg-gray-500';
        }
    }

    function getTextColor(color: string) {
        switch (color.toLowerCase()) {
            case 'red':
                return 'text-tired';
            case 'blue':
                return 'text-tiblue';
            case 'green':
                return 'text-tigreen';
            case 'yellow':
                return 'text-tiyellow';
            case 'white':
                return 'text-tiwhite';
            case 'purple':
                return 'text-tipurple';
            default:
                return 'text-gray-500';
        }
    }
}
export default VideoPage;
