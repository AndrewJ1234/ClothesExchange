import React from "react";
// import.meta.env.

import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator } from "stream-chat-react";
import './Chat.css'
// client-side you initialize the Chat client with your API key
const apiKey = import.meta.env.GETSTREAM_KEY;
const apiSecret = import.meta.env.GETSTREAM_SECRET;

const chatClient = StreamChat.getInstance(`${import.meta.env.GETSTREAM_KEY}`, {
  timeout: 6000,
});

await chatClient.connectUser(
    {
      id: 'john',
      name: 'John Doe',
      image: 'https://getstream.io/random_svg/?name=John',
    },
    '{{ chat_user_token }}',
  );

  export default function App(){
    const [client, setClient] = useState(null);
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        async function init(){
            const chatClient = StreamChat.getInstance(apiKey);
    
            await chatClient.connectUser(user, chatClient.devToken(user.id));

            const channel = chatClient('messaging', 'react-talk', {
                image:
                name:
            }}

            await channel.watch()

            setChannel(channel)
            se
    })
  }
  
const set = await chatClient.connectUser({ id: userID }, token);
// function Chats() {
//   return (
//     <>
//       <h1>Chats</h1>
//     </>
//   );
// }

// export default Chats;
