"use client";
import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";

const Feed = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPrompts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext: any) => {
    const regex = new RegExp(searchtext, "i");
    return prompts.filter(
      (item: any) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearch = (e: any) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName: any) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearch}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={prompts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
