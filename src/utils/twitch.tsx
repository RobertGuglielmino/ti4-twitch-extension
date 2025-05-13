export interface TwitchExtContext {
  arePlayerControlsVisible?: boolean;
  bitrate?: number;
  bufferSize?: number;
  displayResolution?: string;
  game?: string;
  hlsLatencyBroadcaster?: number;
  hostingInfo?: {
    hostedChannelId: string;
    hostingChannelId: string;
  };
  isFullScreen?: boolean;
  isMuted?: boolean;
  isPaused?: boolean;
  isTheatreMode?: boolean;
  language?: string;
  mode?: string;
  playbackMode?: string;
  theme?: string;
  videoResolution?: string;
  volume?: number;
}

export interface TwitchExtHelperConfig {
  onAuthorized: (auth: { channelId: string; clientId: string; token: string; userId: string }) => void;
  onContext?: (context: TwitchExtContext, delta: string[]) => void;
}

// Type definition for the global Twitch helper
declare global {
  interface Window {
    Twitch?: {
      ext: {
        configuration: {
          broadcaster?: { content: string };
          developer?: { content: string };
          global?: { content: string };
          onChanged: () => void;
        };
        onAuthorized: (callback: (auth: { channelId: string; clientId: string; token: string; userId: string }) => void) => void;
        onContext: (callback: (context: TwitchExtContext, delta: string[]) => void) => void;
        onError: (callback: (error: Error) => void) => void;
        onVisibilityChanged: (callback: (isVisible: boolean, context: TwitchExtContext) => void) => void;
        send: (target: string, contentType: string, message: object) => void;
        listen: (target: string, callback: (target: string, contentType: string, message: string) => void) => void;
      };
    };
  }
}

/**
 * Initialize the Twitch Extension Helper
 */
export const initializeTwitchExtension = (config: TwitchExtHelperConfig): void => {
  if (window.Twitch && window.Twitch.ext) {
    window.Twitch.ext.onAuthorized(config.onAuthorized);
    
    if (config.onContext) {
      window.Twitch.ext.onContext(config.onContext);
    }
    
    window.Twitch.ext.onError((error) => {
      console.error('Twitch Extension Error:', error);
    });
  } else {
    console.error('Twitch Extension Helper not found');
  }
};