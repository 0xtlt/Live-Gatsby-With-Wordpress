import React from 'react';
import { Link } from "gatsby";

function SearchResult({ post }){
    return (
        <Link to={post.node.path} dangerouslySetInnerHTML={{ __html: post.node.title }} />
    )
}

export default SearchResult