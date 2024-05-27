import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";
import MODEL_ID from "../backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any unauthenticated user can "create", "read", "update", 
and "delete" any "Todo" records.
=========================================================================*/

export const generateHaikuFunction = defineFunction({
  name: "generatehaiku",
  entry: "./generateHaiku.ts",
  environment: {
    MODEL_ID: "amazon.titan-image-generator-v1",
  },
  timeoutSeconds: 60, // 1 minute timeout
});
const schema = a.schema({
  ChatRoom: a
    .model({
      title: a.string().required(),
      chat: a.hasMany("Chat", "chatId"),
      createdBy: a.string().required(),
    })
    .authorization((allow) => [allow.authenticated()]),
  Chat: a
    .model({
      title: a.string(),
      modelname: a.string().default("titans-image-generator"),
      image: a.string(),
      answer: a.string(),
      chatId: a.id(),
      room: a.belongsTo("ChatRoom", "chatId"),
    })
    .authorization((allow) => [allow.authenticated()]),
  generate: a
    .query()
    .arguments({ prompt: a.string().required() })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(generateHaikuFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,

  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 5,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
