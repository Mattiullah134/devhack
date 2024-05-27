import React from "react";

const SideBarUserDetails = ({
  userName,
  email,
  image,
}: {
  userName?: string;
  email: string | undefined;
  image?: string;
}) => {
  return (
    <div className="flex items-center fixed bottom-0 justify-between px-8 py-5">
      <div className="flex items-center mr-5">
        <div className="mr-5">
          <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
            {image ? (
              <img
                className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                src={image}
                alt={userName ? userName : "user image"}
              />
            ) : (
              <img
                className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
                alt="avatar image"
              />
            )}
          </div>
        </div>
        <div className="mr-2 ">
          {userName && (
            <a
              href="javascript:void(0)"
              className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
            >
              {userName}
            </a>
          )}
          <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">
            {email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBarUserDetails;
