import React, { useState, useEffect  } from "react"
import { Link, graphql } from "gatsby"
import EmblaCarouselReact from 'embla-carousel-react'
import Img from "gatsby-image"

import NextIcon from "../icons/next.svg"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import HomeSlider from "../components/homeSlider"
import SearchBar from "../components/search";

const IndexPage = ({ data }) => {
  const [slider, setSlider] = useState(null);
  const [whereWeAre, setWhereWeAre] = useState(0);

  useEffect(() => {
    if (slider) {
        slider.on("select", () => {
          setWhereWeAre(slider.selectedScrollSnap());
        });
    }
  }, [slider, setWhereWeAre]);

  return (
    <Layout>
      <SEO title="Home" />
      <div className="homepage">
        <div className="leftPart">
          <EmblaCarouselReact emblaRef={setSlider} options={{ loop: false }}>
            <div style={{ display: 'flex' }}>
              {data.allWordpressPost.edges.slice(0, 3).map(post => <Post key={post.node.path} title={post.node.title} img={post.node.featured_media.localFile.childImageSharp.fluid} excerpt={post.node.excerpt} path={post.node.path} />)}
            </div>
          </EmblaCarouselReact>
          <div className="navigator">
            <span className="number">0{whereWeAre + 1}</span>
            <div className="bars">
              <span className={"bar" + (whereWeAre === 0 ? " active" : "")} />
              <span className={"bar" + (whereWeAre === 1 ? " active" : "")} />
              <span className={"bar" + (whereWeAre === 2 ? " active" : "")} />
            </div>
            <span className="number">03</span>
            <div className="arrows">
              <button className={whereWeAre === 0 ? "disabled" : ""} onClick={()=>slider.scrollPrev()}><NextIcon /></button>
              <button className={whereWeAre === 2 ? "disabled" : ""} onClick={()=>slider.scrollNext()}><NextIcon /></button>
            </div>
          </div>
        </div>
        <div className="rightPart">
          <div className="navbar">
            {data.allWordpressPage.edges.sort((a,b) => a.node.featured_media ? 1 : -1).map(page => <Link key={page.node.path} to={page.node.path}>{page.node.featured_media ? <li><Img className="picture" fluid={page.node.featured_media.localFile.childImageSharp.fluid} /></li> : <li dangerouslySetInnerHTML={{ __html: page.node.title }} />}</Link>)}
          </div>
          <SearchBar />
          <HomeSlider categories={data.allWordpressCategory} posts={data.allWordpressPost.edges.slice(3)} />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
{
  allWordpressPost {
    edges {
      node {
        title
        excerpt
        path
        featured_media {
          localFile{
              childImageSharp {
                fluid(maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              } 
          }
        }
        categories {
          id
          name
        }
      }
    }
  }

  allWordpressPage {
    edges {
      node {
        id
        title
        path
        featured_media {
          localFile{
              childImageSharp {
                fluid(maxWidth: 100) {
                  ...GatsbyImageSharpFluid
                }
              } 
          }
        }
      }
    }
  }
  
  allWordpressCategory {
    edges {
      node {
        id
        name
      }
    }
  }
}
`

// {data.allWordpressPost.edges.map(post => <Post title={post.node.title} excerpt={post.node.excerpt} path={post.node.path} />)}
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>