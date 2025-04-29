class TwitchExtensionHelper {
    constructor() {
      this.auth = {
        channelId: 'test_channel',
        clientId: 'test_client',
        token: 'test_token',
        userId: 'test_user'
      };
      this.callbacks = {
        onAuthorized: () => {},
        onContext: () => {},
        onVisibilityChanged: () => {}
      };
    }
  
    onAuthorized(callback) {
      this.callbacks.onAuthorized = callback;
      // Simulate authorization after 1 second
      setTimeout(() => callback(this.auth), 1000);
    }
  
    onContext(callback) {
      this.callbacks.onContext = callback;
    }
  
    onVisibilityChanged(callback) {
      this.callbacks.onVisibilityChanged = callback;
      // Simulate becoming visible after 500ms
      setTimeout(() => callback(true), 500);
    }
  }
  
  // Create a global twitch object
  window.Twitch = {
    ext: new TwitchExtensionHelper()
  };
  
  export default TwitchExtensionHelper;