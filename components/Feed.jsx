'use client'

import { useState, useEffect } from "react";

import PromtCard from "./PromtCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post)=> (
        <PromtCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [post, setPost] = useState([]);

  const handleSearchChange = (e)=>{

  }

  useEffect(() => {
    const fecthPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPost(data);
    }
    fecthPosts();
  }, []);
  

  return (
    <section className="feed">
      <form 
        className="relative w-full flex-center">
          <input 
            type="text"
            placeholder='Search for a tag or username'  
            value={searchText} 
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
        </form>

        <PromptCardList
          data={post}
          handleTagClick={()=> {}}
          />
    </section>
  )
}

export default Feed