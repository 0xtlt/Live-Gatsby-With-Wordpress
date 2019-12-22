import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import SearchResult from "./searchResult";
import SearchIcon from "../icons/search.svg";

function SearchBar() {
    const data = useStaticQuery(graphql`
{
    allWordpressPost {
      edges {
        node {
          id
          title
          path
        }
      }
    }
}
  `)

    const [query, setQuery] = useState("");

    function searchR(post){
        return post.node.title.toLowerCase().replace(/&rsquo;/g, "'").includes(query.toLowerCase());
    }

    return (
        <div className="searchbar">
            <div className="top">
                <SearchIcon />
                <input type="text" placeholder={"Search"} onChange={e => setQuery(e.target.value)} value={query} />
            </div>
            <div className="content">
                {query === "" ? "" : data.allWordpressPost.edges.filter(searchR).map(post => <SearchResult key={post.node.id} post={post} />)}
            </div>
        </div>
    )
}

export default SearchBar