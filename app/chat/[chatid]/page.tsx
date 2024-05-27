"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../../globals.css";
import { getRoomChat } from "@/app/utils/functions";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import Auth from "@/app/components/auth/Auth";
import { JWT, fetchAuthSession } from "aws-amplify/auth";
import { useGetAuthToken } from "@/app/utils/hooks/getUserDetails";
import { Badge, Image } from "@aws-amplify/ui-react";
import { downloadData } from "aws-amplify/storage";
import AuthNavBar from "@/app/components/AuthNavBar";

const client = generateClient<Schema>();

const Chat = () => {
  const { chatid } = useParams();
  const [chat, setChat] = useState([]);
  console.log("chat", chat);

  const token = useGetAuthToken();
  useEffect(() => {
    const fetchChat = async () => {
      if (chatid) {
        const data = await getRoomChat(chatid.toString());
        setChat(data);
        console.log("Initial chat data", data);
      }
    };

    fetchChat();
  }, [chatid]);
  const donwloadFile = async (url: string) => {
    console.log("url", url.split("/"));
    let urlSpilt = url.split("/");
    let lastTwo = urlSpilt.slice(-2);
    let result = lastTwo.join("/");
    console.log("result", result);
    try {
      const { body, eTag } = await downloadData({
        path: result,
        options: {
          // optional progress callback
          onProgress: (event) => {
            console.log(event.transferredBytes);
          },
          // optional bytes range parameter to download a part of the file, the 2nd MB of the file in this example
          bytesRange: {
            start: 1024,
            end: 2048,
          },
        },
      }).result;
      console.log("body");

      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(await body.blob());
      a.download = "image.png"; // Change the filename as needed

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("error in the download file", error);
    }
  };
  useEffect(() => {
    const updateSub = client.models.Chat.observeQuery({
      authMode: "userPool",
      filter: {
        chatId: {
          contains: chatid.toString(),
        },
      },
    }).subscribe({
      next: ({ items }) => {
        console.log("Subscription data", items);
        if (items && items.length > 0) {
          console.log("set the data", items);

          setChat(items);
        }
      },
      error: (error) => console.warn(error),
    });

    return () => {
      updateSub.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-row w-full h-screen antialiased text-gray-800">
      <div className="flex flex-col h-full w-full bg-white px-4 pb-5 pt-0">
        <AuthNavBar />
        <div className="h-full overflow-hidden py-4">
          <div className="h-full overflow-y-auto hidescbar">
            {chat?.length > 0 &&
              chat?.map((data, index) => (
                <div key={index} className="grid grid-cols-12 gap-y-2">
                  <div className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>{data?.title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-1 col-end-8 p-3 rounded-lg">
                    {data?.answer ? (
                      <div className="flex flex-row items-center">
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{data?.answer}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex relative w-fit flex-row items-center">
                        <div className="absolute top-2 left-5">
                          <Badge
                            onClick={() => donwloadFile(data?.image)}
                            variation="success"
                            className="cursor-pointer"
                          >
                            Download
                          </Badge>
                        </div>
                        <Image
                          alt="Amplify logo"
                          src={data?.image}
                          objectFit="initial"
                          objectPosition="50% 50%"
                          backgroundColor="initial"
                          height="60%"
                          width="60%"
                          opacity="100%"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
