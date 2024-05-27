"use client";
import React, { useState } from "react";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useGetUserDetails } from "@/app/utils/hooks/getUserDetails";
import { useParams, useRouter } from "next/navigation";
import { uploadData } from "aws-amplify/storage";

const client = generateClient<Schema>();
const ChatInput = () => {
  const params = useParams();
  const router = useRouter();
  const [image, setImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  let authData = useGetUserDetails();

  const handleGenPrompt = async () => {
    if (prompt.length > 0) {
      setLoading(true);
      try {
        const { data, errors } = await client.queries.generate(
          {
            prompt,
          },
          { authMode: "userPool" }
        );
        if (data) {
          if (authData) {
            console.log("errors", errors, "data", data, typeof data);
            let path = `album/${Date.now().toString()}.png`;

            // Optional: Save the decoded image data locally (requires additional libraries)
            // You'll need a library like FileSaver.js to save the Blob to a file
            var result = await uploadData({
              path,
              data: Buffer.from(data, "base64"),
              options: {
                contentType: "image/png",
                contentEncoding: "base64",
              },
            }).result;
            console.log("result", result);
            // let path = `album/${Date.now()}.jpg`;
            console.log("params", params);

            if (params?.chatid && params?.chatid.toString().length > 0) {
              console.log("chat id hai", params);

              const chatData = await client.models.Chat.create(
                {
                  title: prompt,
                  image: `https://amplify-devhack-mattiulla-hackthondrivebucketef7be-ibwctywpfyc0.s3.ap-south-1.amazonaws.com/${result.path}`,
                  chatId: params?.chatid.toString(),
                },
                { authMode: "userPool" }
              );
              setLoading(false);
            } else {
              const createData = await client.models.ChatRoom.create(
                {
                  title: prompt,
                  createdBy: authData?.userId.toString(),
                },
                { authMode: "userPool" }
              );
              console.log("createdata", createData);

              const chatData = await client.models.Chat.create(
                {
                  title: prompt,
                  image: `https://amplify-devhack-mattiulla-hackthondrivebucketef7be-ibwctywpfyc0.s3.ap-south-1.amazonaws.com/${result.path}`,
                  chatId: createData.data?.id,
                },
                { authMode: "userPool" }
              );
              setLoading(false);

              console.log("chatData", chatData);
              if (createData.data?.id) {
                setTimeout(() => {
                  router.push(`chat/${createData.data?.id}`);
                  setPrompt("");
                }, 200);
              }
            }
            setLoading(false);
          }
          setLoading(false);
        } else {
          console.log("something went wrong", errors);
          setLoading(false);
        }
      } catch (error) {
        console.log("error in the creatingop", error);
        setLoading(false);
      }
    } else {
      console.log("empty string");
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-transparent z-20 bottom-16 flex flex-row items-center">
      <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
        <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </button>
        <div className="w-full">
          <input
            type="text"
            value={prompt}
            className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
            placeholder="Type your message...."
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>
      <div>{image && <img src={image} alt="smaple image" />}</div>
      <div className="ml-6">
        <button
          className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 "
          onClick={() => handleGenPrompt()}
        >
          {loading ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <svg
              className="w-5 h-5 transform rotate-90 -mr-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
