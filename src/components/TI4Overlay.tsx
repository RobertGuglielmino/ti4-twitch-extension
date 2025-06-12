import { useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PlayerIcon from './PlayerIcon';
import { HOVER_STATES } from '../models/enums';
import { Player } from '../models/interfaces';
import { initialData } from '../models/mockDataV2';
import pako from 'pako';
import { z } from 'zod';
import useImageBus, { UseImageBusReturn } from '../utils/useImageBus';
import { preload_images } from '../models/image_items';

// Define zod schema based on GameDataV2 interface with nullable values
const gameDataSchema = z.object({
  playerData: z.object({
    name: z.array(z.string()),
    faction: z.array(z.string()),
    color: z.array(z.string()),
    victoryPoints: z.array(z.number()),
    strategyCard: z.array(z.string()),
    strategyCardsFaceDown: z.array(z.string()),
    technologies: z.object({
      blue: z.array(z.array(z.boolean())),
      red: z.array(z.array(z.boolean())),
      yellow: z.array(z.array(z.boolean())),
      green: z.array(z.array(z.boolean())),
      unit: z.array(z.array(z.boolean())),
      faction: z.array(z.array(z.boolean()))
    }),
    secretObjectives: z.array(z.array(z.string())),
    commandCounters: z.object({
      tactics: z.array(z.number()),
      fleet: z.array(z.number()),
      strategy: z.array(z.number())
    }),
    commodities: z.array(z.number()),
    tradeGoods: z.array(z.number()),
    maxCommodities: z.array(z.number()),
    actionCards: z.array(z.number()),
    promissoryNotes: z.array(z.number()),
    secretsInHand: z.array(z.number()),
    leaders: z.object({
      agent: z.array(z.boolean()),
      commander: z.array(z.boolean()),
      hero: z.array(z.boolean())
    }),
    active: z.number(),
    speaker: z.number()
  }),
  objectives: z.object({
    public1: z.array(z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      points: z.number(),
      scored: z.array(z.number()),
      progress: z.array(z.string())
    })),
    public2: z.array(z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      points: z.number(),
      scored: z.array(z.number()),
      progress: z.array(z.string())
    })),
    secret: z.object({
      name: z.string(),
      description: z.string(),
      points: z.number(),
      scored: z.array(z.number())
    }),
    mecatol: z.object({
      name: z.string(),
      description: z.string(),
      points: z.number(),
      scored: z.array(z.number())
    }),
    agenda: z.object({
      name: z.string(),
      description: z.string(),
      points: z.number(),
      scored: z.array(z.number())
    }),
    relics: z.array(z.object({
      name: z.string(),
      description: z.string(),
      points: z.number(),
      scored: z.array(z.number())
    }))

  }),
  laws: z.array(z.object({
    name: z.string(),
    description: z.string()
  })),
  general: z.object({
    round: z.number(),
    speaker: z.string(),
    activePlayer: z.string(),
    time: z.string()
  })
});


// Main overlay component
const TI4Overlay = () => {
  const [data, setData] = useState(initialData);
  const [activeHover, setActiveHover] = useState(HOVER_STATES.NONE);
  const [minimized, setMinimized] = useState(false);
  const {
    getImageSrc,
    isImageLoaded
  }: UseImageBusReturn = useImageBus(preload_images);

  useEffect(() => {
    window.Twitch.ext.listen(
      "broadcast",
      (_: string, contentType: string, message: string) => {
        if (contentType !== "application/json") {
          console.debug(`Unexpected contentType "${contentType}"`);
          return;
        }

        const processedData = handlePubSubMessage(message);
        if (processedData) {
          try {
            const validatedData = gameDataSchema.parse(processedData);
            setData(validatedData);
          } catch (error) {
            console.error('Invalid data format:', error);
          }
        }
      },
    );
  }, []);

  // Add the decompression function
function handlePubSubMessage(message: string) {
  try {
    console.log("Raw message received:", message);
    console.log("Message length:", message.length);
    
    const parsedMessage = JSON.parse(message);
    console.log("Parsed message:", parsedMessage);

    // Check if the message is compressed
    if (parsedMessage.compressed) {
      const compressedData = parsedMessage.data;
      console.log("Compressed data type:", typeof compressedData);
      console.log("Compressed data length:", compressedData?.length);
      console.log("Compressed data sample:", compressedData?.substring(0, 50));
      
      // Validate base64 format before atob
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
      const isValidBase64 = base64Regex.test(compressedData);
      console.log("Is valid base64 format:", isValidBase64);
      
      if (!isValidBase64) {
        console.error("Invalid base64 characters found in:", compressedData);
        return null;
      }
      
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

  function getPlayerDataAtIndex(index: number): Player {
    const playerData = data.playerData;
    return {
      id: index,
      name: playerData.name[index],
      active: playerData.active === index,
      faction: playerData.faction[index],
      color: playerData.color[index],
      victoryPoints: playerData.victoryPoints[index],
      strategyCard: playerData.strategyCard[index],
      strategyCardsFaceDown: playerData.strategyCardsFaceDown[index],
      speaker: playerData.speaker === index,
      technologies: {
        blue: playerData.technologies.blue[index],
        red: playerData.technologies.red[index],
        yellow: playerData.technologies.yellow[index],
        green: playerData.technologies.green[index],
        unit: playerData.technologies.unit[index],
        faction: playerData.technologies.faction[index],
      },
      // playerData.technologies[index],
      secretObjectives: playerData.secretObjectives[index],
      commandCounters: {
        tactics: playerData.commandCounters.tactics[index],
        fleet: playerData.commandCounters.fleet[index],
        strategy: playerData.commandCounters.strategy[index],
      },
      commodities: playerData.commodities[index],
      tradeGoods: playerData.tradeGoods[index],
      maxCommodities: playerData.maxCommodities[index],
      actionCards: playerData.actionCards[index],
      promissoryNotes: playerData.promissoryNotes[index],
      secretsInHand: playerData.secretsInHand[index],
      leaders: {
        agent: playerData.leaders.agent[index],
        commander: playerData.leaders.commander[index],
        hero: playerData.leaders.hero[index],
      },
    };
  }

  return (
    <div className="font-header fixed bottom-0 right-0 p-2 flex flex-col items-end">
      <button onClick={() => setMinimized(!minimized)} className="bg-gray-800 rounded-full p-2 mb-1 text-white w-auto justify-center items-center border-b border-gray-700">
        {minimized ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Div visible only when minimized */}
      <div className={`[writing-mode:sideways-lr] flex justify-center items-center font-avalors absolute bottom-0 h-26 right-0 bg-gray-800 text-white p-2 rounded-lg m-2 transition-all duration-300 ${minimized ? 'w-9' : 'opacity-0 w-0'}`}>
        <span className=" font-avalors text-lg">PLAYERS</span>
      </div>

      {/* Main overlay container */}
      <div className={`bg-gray-900 z-10 font-avalors bg-opacity-90 rounded-lg shadow-lg border border-gray-700 h-auto transition-all duration-300 ${minimized ? 'opacity-0 w-0 overflow-hidden' : 'w-124'}`}>
        <div className="p-2 font-astro">
          <div className="flex justify-between items-center">
            <div className="flex">
              {data.playerData.name.map((name: string, index: number) => (
                <PlayerIcon
                  key={index}
                  player={getPlayerDataAtIndex(index)}
                  isActive={activeHover === index}
                  isSpeaker={name === data.general.speaker}
                  isActivePlayer={data.playerData.color[index] === data.general.activePlayer}
                  getImageSrc={(id) => getImageSrc(id)}
                  isImageLoaded={(id) => isImageLoaded(id)}
                  onTouchStart={() => setActiveHover(index)}
                  onTouchEnd={() => setActiveHover(HOVER_STATES.NONE)}
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(HOVER_STATES.NONE)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TI4Overlay;
