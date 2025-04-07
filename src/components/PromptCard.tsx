"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type Prompt = {
  _id: string;
  prompt: string;
  tag: string;
  creator?: {
    username?: string;
    email?: string;
    image?: string;
  };
};

type PromptCardListProps = {
  prompt: Prompt;
  handleTagClick: (tag: string) => void;
};

const PromptCard: React.FC<PromptCardListProps> = ({
  prompt,
  handleTagClick,
}) => {
  const [isCopied, setIsCopied] = useState("");


  const handleCopy = ()=>{
    setIsCopied(prompt.prompt)
    navigator.clipboard.writeText(prompt.prompt)
    setTimeout(() => {
      setIsCopied("")
    }, 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={
              prompt.creator?.image ||
              "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
            }
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900">
              {prompt.creator?.username || "Anonymous User"}
            </h3>
            <p className="text-sm text-gray-500">
              {prompt.creator?.email || "Anonymous@gmail.com"}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              isCopied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
      >
        {prompt.tag}
      </p>
    </div>
  );
};

export default PromptCard;
