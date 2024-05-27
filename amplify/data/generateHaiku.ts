import { auth } from "../auth/resource";
import MODEL_ID from "../backend";
import type { Schema } from "./resource";
import { uploadData } from "aws-amplify/storage";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
// initialize bedrock runtime client

export const handler: Schema["generate"]["functionHandler"] = async (
  event: any,
  context: any
) => {
  const client = new BedrockRuntimeClient([
    {
      region: "ap-south-1",
    },
  ]);
  const modelId = "amazon.titan-image-generator-v1";

  // Format the request payload using the model's native structure.
  const request = {
    textToImageParams: {
      text: event.arguments.prompt,
    },
    taskType: "TEXT_IMAGE",
    imageGenerationConfig: {
      cfgScale: 8,
      seed: 0,
      quality: "standard",
      width: 1024,
      height: 1024,
      numberOfImages: 1,
    },
  };

  try {
    // Encode and send the request.
    const response = await client.send(
      new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(request),
        modelId,
      })
    );
    const nativeResponse = JSON.parse(new TextDecoder().decode(response.body));

    const base64Image = nativeResponse.images[0];

    return base64Image.toString();
  } catch (error: any) {
    throw new Error(error);
  }
};
