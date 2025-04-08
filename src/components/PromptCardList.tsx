import React from 'react'
import PromptCard from './PromptCard';

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
  data: Prompt[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList: React.FC<PromptCardListProps> = ({ data, handleTagClick }) => {
  return (
    <>
      <div className='mt-16 prompt_layout'>
        {data.map((prompt)=>(
            <PromptCard 
            key={prompt._id}
            prompt={prompt}
            handleTagClick={handleTagClick}
            />
        ))}
      </div>
    </>
  )
}

export default PromptCardList
