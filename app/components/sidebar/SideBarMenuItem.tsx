import Link from "next/link";
import React from "react";

const SideBarMenuItem = ({
  title,
  id,
  onClick,
}: {
  title: string;
  id: string;
  onClick: (id: string) => void;
}) => {
  return (
    <div onClick={() => onClick(id)}>
      <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem] hover:bg-gray-50">
        <a
          href="javascript:;"
          className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
        >
          {title}
        </a>
      </span>
    </div>
  );
};

export default SideBarMenuItem;
