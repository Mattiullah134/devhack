import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "hackthondrive",
  access: (allow) => ({
    "album/*": [
      allow.authenticated.to(["read", "delete", "write"]), // additional actions such as "write" and "delete" can be specified depending on your use case
    ],
  }),
});
