import { GameDataV2 } from "./interfaces";

// Mock data - would be replaced by Google Sheets integration
export const mockData2: GameDataV2 = {
  "playerData": {
    "name": ["-", "BlueChell", "-", "-", "-", "-"],
    "faction": ["Letnev", "Muaat", "Mahact", "Empyrean", "Norr", "Hacan"],
    "color": ["White", "Blue", "Purple", "Yellow", "Red", "Green"],
    "victoryPoints": [3, 8, 3, 3, 3, 3],
    "strategyCard": [
      "Warfare",
      "Construction",
      "Leadership",
      "Politics",
      "Trade",
      "Technology"
    ],
    "strategyCardFaceDown": ["", "Construction", "", "", "", ""],
    "technologies": [
      [
        "Prototype War Sun II",
        "Psychoarchaeology",
        "Neural Motivator",
        "AI Development Algorithm",
        "Scanlink Drone Network",
        "Gravity Drive"
      ],
      [],
      [],
      [],
      [],
      []
    ],
    "secretObjectives": [["Become a Martyr"], [""], [""], [""], [""], [""]],
    "commandCounters": [
      { "tactics": 3, "fleet": 3, "strategy": 2 },
      { "tactics": 3, "fleet": 3, "strategy": 2 },
      { "tactics": 3, "fleet": 3, "strategy": 2 },
      { "tactics": 3, "fleet": 3, "strategy": 2 },
      { "tactics": 3, "fleet": 3, "strategy": 2 },
      { "tactics": 0, "fleet": 6, "strategy": 2 }
    ],
    "actionCards": [0, 0, 0, 0, 0, 0],
    "promissoryNotes": [6, 6, 6, 7, 6, 6],
    "leaders": [
      { "agent": true, "commander": false, "hero": false },
      { "agent": true, "commander": false, "hero": true },
      { "agent": true, "commander": true, "hero": true },
      { "agent": false, "commander": true, "hero": true },
      { "agent": true, "commander": false, "hero": false },
      { "agent": false, "commander": true, "hero": false }
    ],
    "active": 5,
    "speaker": 2
  },
  "objectives": {
    "public": [
      {
        "id": 0,
        "name": "Explore Deep Space",
        "description": "3 EMPTY SYS",
        "points": 1,
        "scored": [1],
        "progress": {}
      },
      {
        "id": 0,
        "name": "Negotiate Trade Routes",
        "description": "5 TRADE GOODS",
        "points": 1,
        "scored": [1],
        "progress": {}
      },
      {
        "id": 0,
        "name": "Command an Armada",
        "description": "8 NON-FGTR SHIPS",
        "points": 1,
        "scored": [1],
        "progress": {}
      }
    ],
    "secret": [
      {
        "id": 0,
        "name": "Monopolize Production",
        "description": "4 INDUSTRIAL",
        "points": 1,
        "scored": [1],
        "progress": {}
      }
    ],
    "mecatol": {
      "name": "Custodians Points",
      "points": 1,
      "scored": [0, 0, 0, 0, 0, 0]
    }
  },
  "laws": [
    { "name": "Homeland Defense Act", "description": "Homeland Def Act" }
  ],
  "general": {
    "round": 2,
    "speaker": "Purple",
    "activePlayer": "White",
    "time": "6563"
  }
}

