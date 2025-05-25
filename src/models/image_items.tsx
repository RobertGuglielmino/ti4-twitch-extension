import { ImageItem } from "../utils/useImageBus.tsx";

// Background images
import agentImg from '../assets/backgrounds/agent.png';
import commanderImg from '../assets/backgrounds/commander.png';
import heroImg from '../assets/backgrounds/hero.png';
import playerSheetImg from '../assets/backgrounds/player-sheets.png';
import public1Img from '../assets/backgrounds/public_1.back.jpg';
import public2Img from '../assets/backgrounds/public_2.back.jpg';
import secretFrontImg from '../assets/backgrounds/secretFront.png';
import bg1Img from '../assets/backgrounds/tile_046.png';
import bg2Img from '../assets/backgrounds/tile_047.png';
import bg3Img from '../assets/backgrounds/tile_048.png';
import bg4Img from '../assets/backgrounds/tile_049.png';
import bg5Img from '../assets/backgrounds/tile_050.png';
import bg6Img from '../assets/backgrounds/tile_077.png';
import bg7Img from '../assets/backgrounds/tile_078.png';

// Overlay icons
import actionImg from '../assets/overlay_icons/action.short.jpg';
import blueImg from '../assets/overlay_icons/blue.png';
import commodityImg from '../assets/overlay_icons/commodity_1.png';
import greenImg from '../assets/overlay_icons/green.png';
import influenceImg from '../assets/overlay_icons/influence.png';
import promissoryImg from '../assets/overlay_icons/promissory.short.jpg';
import redImg from '../assets/overlay_icons/red.png';
import resourcesImg from '../assets/overlay_icons/resources.png';
import secretImg from '../assets/overlay_icons/secret.short.jpg';
import speakerImg from '../assets/overlay_icons/speaker_square.png';
import tradegoodImg from '../assets/overlay_icons/tradegood_1.png';
import dreadnoughtIconImg from '../assets/overlay_icons/unit_d_Dreadnought.png';
import commandTokenImg from '../assets/overlay_icons/unit_t_Command_Token.png';
import yellowImg from '../assets/overlay_icons/yellow.png';

// Unit images
import carrierImg from '../assets/units/unit_c_Carrier.png';
import dreadnoughtImg from '../assets/units/unit_d_Dreadnought.png';
import fighterImg from '../assets/units/unit_f_Fighter.png';
import flagshipImg from '../assets/units/unit_h_Flagship.png';
import infantryImg from '../assets/units/unit_i_Infantry.png';
import pdsImg from '../assets/units/unit_p_PDS.png';
import cruiserImg from '../assets/units/unit_r_Cruiser.png';
import spaceDockImg from '../assets/units/unit_s_Space_Dock.png';
import warSunImg from '../assets/units/unit_w_War_Sun.png';
import destroyerImg from '../assets/units/unit_y_Destroyer.png';

// Faction icons
import arborecImg from '../assets/faction_icons/arborec_icon.png';
import argentImg from '../assets/faction_icons/argent_icon.png';
import creussImg from '../assets/faction_icons/creuss_icon.png';
import empyreanImg from '../assets/faction_icons/empyrean_icon.png';
import hacanImg from '../assets/faction_icons/hacan_icon.png';
import jolnarImg from '../assets/faction_icons/jolnar_icon.png';
import keleresImg from '../assets/faction_icons/keleres_icon.png';
import l1z1xImg from '../assets/faction_icons/l1z1x_icon.png';
import letnevImg from '../assets/faction_icons/letnev_icon.png';
import mahactImg from '../assets/faction_icons/mahact_icon.png';
import mentakImg from '../assets/faction_icons/mentak_icon.png';
import muaatImg from '../assets/faction_icons/muaat_icon.png';
import naaluImg from '../assets/faction_icons/naalu_icon.png';
import naazrokhaImg from '../assets/faction_icons/naazrokha_icon.png';
import nekroImg from '../assets/faction_icons/nekro_icon.png';
import nomadImg from '../assets/faction_icons/nomad_icon.png';
import norrImg from '../assets/faction_icons/norr_icon.png';
import saarImg from '../assets/faction_icons/saar_icon.png';
import solImg from '../assets/faction_icons/sol_icon.png';
import ulImg from '../assets/faction_icons/ul_icon.png';
import vuilraithImg from '../assets/faction_icons/vuilraith_icon.png';
import winnuImg from '../assets/faction_icons/winnu_icon.png';
import xxchaImg from '../assets/faction_icons/xxcha_icon.png';
import yinImg from '../assets/faction_icons/yin_icon.png';
import yssarilImg from '../assets/faction_icons/yssaril_icon.png';

export const preload_images: ImageItem[] = [
  {
    id: 'agent',
    src: agentImg,
    alt: 'agent'
  },
  {
    id: 'commander',
    src: commanderImg,
    alt: 'commander'
  },
  {
    id: 'hero',
    src: heroImg,
    alt: 'hero'
  },
  {
    id: 'player_sheet',
    src: playerSheetImg,
    alt: 'player-sheets'
  },
  {
    id: 'public_1',
    src: public1Img,
    alt: 'public_1'
  },
  {
    id: 'public_2',
    src: public2Img,
    alt: 'public_2'
  },
  {
    id: 'secret_front',
    src: secretFrontImg,
    alt: 'secret_front',
  },
  {
    id: 'bg1',
    src: bg1Img,
    alt: 'bg1',
    priority: 1
  },
  {
    id: 'bg2',
    src: bg2Img,
    alt: 'bg2',
    priority: 1
  },
  {
    id: 'bg3',
    src: bg3Img,
    alt: 'bg3',
    priority: 1
  },
  {
    id: 'bg4',
    src: bg4Img,
    alt: 'bg4',
    priority: 1
  },
  {
    id: 'bg5',
    src: bg5Img,
    alt: 'bg5',
    priority: 1
  },
  {
    id: 'bg6',
    src: bg6Img,
    alt: 'bg6',
    priority: 1
  },
  {
    id: 'bg7',
    src: bg7Img,
    alt: 'bg7',
    priority: 1
  },
  {
    id: 'action',
    src: actionImg,
    alt: 'action',
  },
  {
    id: 'blue',
    src: blueImg,
    alt: 'blue',
  },
  {
    id: 'commodity',
    src: commodityImg,
    alt: 'commodity'
  },
  {
    id: 'green',
    src: greenImg,
    alt: 'green'
  },
  {
    id: 'influence',
    src: influenceImg,
    alt: 'influence'
  },
  {
    id: 'promissory',
    src: promissoryImg,
    alt: 'promissory',
  },
  {
    id: 'red',
    src: redImg,
    alt: 'red',
    priority: 1
  },
  {
    id: 'resources',
    src: resourcesImg,
    alt: 'resources',
    priority: 1
  },
  {
    id: 'secret',
    src: secretImg,
    alt: 'secret',
  },
  {
    id: 'speaker',
    src: speakerImg,
    alt: 'speaker',
    priority: 1
  },
  {
    id: 'tradegood',
    src: tradegoodImg,
    alt: 'tradegood',
  },
  {
    id: 'dreadnought',
    src: dreadnoughtIconImg,
    alt: 'dreadnought',
  },
  {
    id: 'command_token',
    src: commandTokenImg,
    alt: 'Command_Token',
  },
  {
    id: 'yellow',
    src: yellowImg,
    alt: 'yellow',
  },
  {
    id: 'carrier',
    src: carrierImg,
    alt: 'carrier',
  },
  {
    id: 'dreadnought',
    src: dreadnoughtImg,
    alt: 'dreadnought',
  },
  {
    id: 'fighter',
    src: fighterImg,
    alt: 'fighter'
  },
  {
    id: 'flagship',
    src: flagshipImg,
    alt: 'flagship'
  },
  {
    id: 'infantry',
    src: infantryImg,
    alt: 'infantry'
  },
  {
    id: 'pds',
    src: pdsImg,
    alt: 'pds'
  },
  {
    id: 'cruiser',
    src: cruiserImg,
    alt: 'cruiser'
  },
  {
    id: 'space_dock',
    src: spaceDockImg,
    alt: 'space_dock'
  },
  {
    id: 'war_sun',
    src: warSunImg,
    alt: 'war_sun'
  },
  {
    id: 'destroyer',
    src: destroyerImg,
    alt: 'destroyer'
  },
  {
    id: 'arborec',
    src: arborecImg,
    alt: 'arborec_icon',
    priority: 1
  },
  {
    id: 'argent',
    src: argentImg,
    alt: 'argent_icon',
    priority: 1
  },
  {
    id: 'creuss',
    src: creussImg,
    alt: 'creuss_icon',
    priority: 1
  },
  {
    id: 'empyrean',
    src: empyreanImg,
    alt: 'empyrean_icon',
    priority: 1
  },
  {
    id: 'hacan',
    src: hacanImg,
    alt: 'hacan_icon',
    priority: 1
  },
  {
    id: 'jolnar',
    src: jolnarImg,
    alt: 'jolnar_icon',
    priority: 1
  },
  {
    id: 'keleres',
    src: keleresImg,
    alt: 'keleres',
    priority: 1
  },
  {
    id: 'l1z1x',
    src: l1z1xImg,
    alt: 'l1z1x_icon',
    priority: 1
  },
  {
    id: 'letnev',
    src: letnevImg,
    alt: 'letnev_icon',
    priority: 1
  },
  {
    id: 'mahact',
    src: mahactImg,
    alt: 'mahact_icon',
    priority: 1
  },
  {
    id: 'mentak',
    src: mentakImg,
    alt: 'mentak_icon',
    priority: 1
  },
  {
    id: 'muaat',
    src: muaatImg,
    alt: 'muaat_icon',
    priority: 1
  },
  {
    id: 'naalu',
    src: naaluImg,
    alt: 'naalu_icon',
    priority: 1
  },
  {
    id: 'naaz-rokha',
    src: naazrokhaImg,
    alt: 'naazrokha_icon',
    priority: 1
  },
  {
    id: 'nekro',
    src: nekroImg,
    alt: 'nekro_icon',
    priority: 1
  },
  {
    id: 'nomad',
    src: nomadImg,
    alt: 'nomad_icon',
    priority: 1
  },
  {
    id: 'norr',
    src: norrImg,
    alt: 'norr_icon',
    priority: 1
  },
  {
    id: 'saar',
    src: saarImg,
    alt: 'saar_icon',
    priority: 1
  },
  {
    id: 'sol',
    src: solImg,
    alt: 'sol_icon',
    priority: 1
  },
  {
    id: 'ul',
    src: ulImg,
    alt: 'ul_icon',
    priority: 1
  },
  {
    id: 'vuilraith',
    src: vuilraithImg,
    alt: 'vuilraith_icon',
    priority: 1
  },
  {
    id: 'winnu',
    src: winnuImg,
    alt: 'winnu_icon',
    priority: 1
  },
  {
    id: 'xxcha',
    src: xxchaImg,
    alt: 'xxcha_icon',
    priority: 1
  },
  {
    id: 'yin',
    src: yinImg,
    alt: 'yin_icon',
    priority: 1
  },
  {
    id: 'yssaril',
    src: yssarilImg,
    alt: 'yssaril_icon',
    priority: 1
  }
]
