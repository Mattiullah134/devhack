import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data, generateHaikuFunction } from "./data/resource";
import { Stack } from "aws-cdk-lib";
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";
import { storage } from "./storage/resource";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const MODEL_ID = "amazon.titan-image-generator-v1";
export const backend = defineBackend({
  auth,
  data,
  storage,
  generateHaikuFunction,
});
backend.generateHaikuFunction.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock:InvokeModel"],
    resources: [`arn:aws:bedrock:*::foundation-model/${MODEL_ID}`],
  })
);

export default MODEL_ID;
