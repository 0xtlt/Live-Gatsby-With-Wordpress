import React from 'react'
import { Link } from "gatsby"
import Img from "gatsby-image"

function Post({ title, excerpt, path, img }) {
    return (
        <div className="post">
            <Img className="backgroundImage" fluid={img} />
            <div className="center">
                <h2 dangerouslySetInnerHTML={{ __html: title }} />
                <div className="excerpt" dangerouslySetInnerHTML={{__html: excerpt }} />
                <Link to={path} className="button">Lire plus</Link>
            </div>
        </div>
    )
}

export default Post