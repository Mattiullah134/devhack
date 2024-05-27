"use client";

interface ChatType {
  title?: string;
  image?: string;
  description: string;
}
const Chat = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen ">
      <div className="  flex justify-center items-center h-52">
        <p className=" dark:text-neutral-400/75 text-stone-500">
          Start a conversation....
        </p>
      </div>
    </div>
  );
};

export default Chat;
