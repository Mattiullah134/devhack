"use client";
import React, { ReactNode } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(outputs, { ssr: true });

const Auth = ({ children }: { children: ReactNode }) => {
  return <Authenticator.Provider >{children}</Authenticator.Provider>;
};

export default Auth;
