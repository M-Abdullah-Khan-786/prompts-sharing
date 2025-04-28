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
    _id: string;
    username?: string;
    email?: string;
    image?: string;
  };
};

type PromptCardListProps = {
  prompt: Prompt;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (prompt: Prompt) => void;
  handleDelete?: (prompt: Prompt) => void;
};

const PromptCard: React.FC<PromptCardListProps> = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [isCopied, setIsCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setIsCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => {
      setIsCopied("");
    }, 3000);
  };

  const handleProfileClick = () => {
    if (!prompt.creator) return;

    if (prompt.creator._id === session?.user.id) {
      return router.push("/profile");
    }
    router.push(
      `/profile/${prompt.creator._id}?name=${prompt.creator.username}`
    );
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
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
        #{prompt.tag}
      </p>
      {session?.user.id === prompt.creator?._id && pathName == "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit?.(prompt)}
          >
            Edit
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete?.(prompt)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
