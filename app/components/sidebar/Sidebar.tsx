"use client";
import React, { useEffect, useState } from "react";
import SideBarMenuItem from "./SideBarMenuItem";

import { getChatRoom } from "@/app/utils/functions";
import { useRouter } from "next/navigation";
import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useGetAuthToken } from "@/app/utils/hooks/getUserDetails";
const client = generateClient<Schema>();
const Sidebar = () => {
  const token = useGetAuthToken();
  const [chatTitle, setChatTitle] = useState([]);
  const router = useRouter();
  console.log("chattitle", chatTitle);
  useEffect(() => {
    try {
      (async () => {
        let res = await getChatRoom();
        setChatTitle(res);
      })();
      var updateSub = client.models.ChatRoom.observeQuery({
        authMode: "userPool",
      }).subscribe({
        next: ({ items }) => {
          console.log("Subscription data sidebar", items);
          if (items && items.length > 0) {
            setChatTitle(items);
          }
        },
        error: (error) => console.warn(error),
      });
    } catch (error) {
      console.log("error in the api", error);
    }
    return () => {
      updateSub.unsubscribe();
    };
  }, [router]);
  const handleNavigation = (id: string) => {
    router.push(`${id}`);
  };
  return (
    <div className="w-full">
      <div className="container flex flex-col mx-auto bg-white">
        <aside
          className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
          id="sidenav-main"
        >
          <div className="relative pl-3 my-5 overflow-y-scroll hidescbar">
            <div className="flex flex-col w-full font-medium">
              {chatTitle?.map((data) => {
                return (
                  <SideBarMenuItem
                    id={data?.id}
                    key={data?.id}
                    title={data?.title}
                    onClick={handleNavigation}
                  />
                );
              })}
            </div>
          </div>

          {/* <SideBarUserDetails email={userData?.signInDetails?.loginId} /> */}
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
