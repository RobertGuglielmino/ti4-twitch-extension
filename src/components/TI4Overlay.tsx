import { useEffect, useState } from 'react';
import { Award, Shield, Zap, Database, ChevronUp, ChevronDown } from 'lucide-react';
import PlayerIcon from './PlayerIcon';
import ScoringHoverCard from './ScoringHoverCard';
import { HOVER_STATES } from '../models/enums';
import { Player } from '../models/interfaces';
import { mockData2 } from '../models/mockDataV2';
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
  const [data, setData] = useState(mockData2);
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

        // Process the message with decompression if needed
        const processedData = handlePubSubMessage(message);
        if (processedData) {
          // Validate data with zod before setting state
          try {
            const validatedData = gameDataSchema.parse(processedData);
            // Filter out null values from public1 and public2 arrays
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
      leaders: {
        agent: playerData.leaders.agent[index],
        commander: playerData.leaders.commander[index],
        hero: playerData.leaders.hero[index],
      },
    };
  }

  return (
    <div className="font-header fixed bottom-0 left-0 right-0 p-4 flex flex-col items-center">
      {/* Toggle minimize button */}
      <button
        className="flex items-center justify-center bg-gray-900 bg-opacity-90 text-white rounded-t-lg p-2 -mb-2 z-10 hover:bg-opacity-100 transition-all duration-150"
        onClick={() => setMinimized(!minimized)}
      >
        {minimized ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>


      {/* Main overlay container */}
      <div className={`bg-gray-900 bg-opacity-90 rounded-lg shadow-lg border border-gray-700 h-50 max-w-screen-xl w-auto transition-all duration-300 ${minimized ? 'max-h-11 overflow-hidden' : ' max-h-40 '}`}>
        {/* Top status bar */}
        <div className="bg-gray-800 rounded-t-lg p-2 text-white text-sm flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center">
            <Shield className="mr-2 text-yellow-500" size={18} />
            <span className="font-bold">Twilight Imperium IV</span>
            <span className="ml-4 text-gray-400">Round {data.general.round}</span>
          </div>

          <div className="flex items-center px-2 space-x-4">
            <div className="flex items-center bg-yellow-900 bg-opacity-50 px-3 py-1 rounded-lg">
              <span className="font-bold">Speaker: {data.playerData.name[data.playerData.speaker]}</span>
            </div>
            <div className="flex items-center">
              <Zap size={16} className="mr-1 text-green-400" />
              <span>Active: {data.playerData.name[data.playerData.active]}</span>
            </div>
            <div className="flex items-center">
              <Database size={16} className="mr-1 text-purple-400" />
              <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="p-4 font-astro">
          {/* Player icons row */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {data.playerData.name.map((name: string, index: number) => (
                <PlayerIcon
                  key={index}
                  player={getPlayerDataAtIndex(index)}
                  isActive={activeHover === index}
                  isSpeaker={name === data.general.speaker}
                  isActivePlayer={data.playerData.color[index] === data.general.activePlayer}
                  getImageSrc={(id) => getImageSrc(id)}
                  isImageLoaded={(id) => isImageLoaded(id)}
                  onMouseEnter={() => setActiveHover(index)}
                  onMouseLeave={() => setActiveHover(HOVER_STATES.NONE)}
                />
              ))}
            </div>

            {/* Scoring icon */}
            <div
              className="relative flex items-center justify-center h-16 w-16 bg-gray-800 rounded-full cursor-pointer hover:ring-2 hover:ring-yellow-400 transition-all duration-150 shadow-lg"
              onMouseEnter={() => setActiveHover(HOVER_STATES.OBJECTIVE)}
              onMouseLeave={() => setActiveHover(HOVER_STATES.NONE)}
            >
              <Award size={32} className="text-yellow-400" />
              <div className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full h-6 w-6 flex items-center justify-center text-xs text-white border border-gray-700">
                {getVictoryTarget()}
              </div>
              {activeHover === HOVER_STATES.OBJECTIVE && (
                <ScoringHoverCard getImageSrc={(id) => getImageSrc(id)} data={data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getVictoryTarget() {
  return 10;
};


export default TI4Overlay;
