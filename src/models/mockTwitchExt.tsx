// import { mockData } from "./mockData";

// window.Twitch = {
//   ext: {
//       ...window.Twitch.ext,
//       listen: (target, fun) => {
//           console.log(`Mock listening to ${target}`);
//           fun("_", "application/json", JSON.stringify(mockData));
//       },
//       onAuthorized: (callback) => {
//           callback({
//               channelId: 'test_channel',
//               clientId: 'test_client',
//               token: 'test_token',
//               userId: 'test_user',
//               helixToken: ""
//           });
//       },
//   }
// };