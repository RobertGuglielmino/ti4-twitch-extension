declare global {
    interface Window {
      Twitch: any; // Replace `any` with a more specific type if you know the structure of the Twitch object
    }
  }
  
  export {};