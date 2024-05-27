import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useGetAuthToken } from "./hooks/getUserDetails";
const client = generateClient<Schema>();

async function getChatRoom(): Promise<Schema["ChatRoom"][] | null> {
  try {
    console.log("api call");

    // const token = useGetAuthToken();
    console.log("api call token aya hai");

    const data = await client.models.ChatRoom.list({
      authMode: "userPool",
    });
    return data.data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}
async function getRoomChat(id: string): Promise<Schema["Chat"][] | null> {
  try {
    console.log("token hai");

    const data = await client.models.Chat.list({
      authMode: "userPool",
      filter: {
        chatId: {
          contains: id,
        },
      },
    });
    console.log("data.data", data.data);

    if (data.data) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export { getChatRoom, getRoomChat };
