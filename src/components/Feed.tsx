'use client'
import { useEffect, useState } from "react"
import PromptCardList from "./PromptCardList"

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [prompts, setPrompts] = useState([])

  const handleSearch = (e:any) => {
    setSearchText(e.target.value)
  }

  const fetchPosts = async ()=>{
    try {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPrompts(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleTagClick = (tag: string) => {
    console.log(tag)
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or username"
        value={searchText}
        onChange={handleSearch}
        required
        className="search_input peer"
        />
      </form>
      <PromptCardList
      data={prompts}
      handleTagClick = {handleTagClick}
      />
    </section>
  )
}

export default Feed