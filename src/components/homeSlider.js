import React, { useState, useEffect } from 'react'
import EmblaCarouselReact from 'embla-carousel-react'
import Img from "gatsby-image"
//import NextIcon from "../icons/next.svg"
import { Link } from 'gatsby';

function HomeSlider({ posts, categories }) {
    const [slider, setSlider] = useState(null);
    const [whereWeAre, setWhereWeAre] = useState(0);
    const [filterCategory, setFilterCategory] = useState(false);

    useEffect(() => {
        if (slider) {
            slider.on("select", () => {
                console.log(slider.selectedScrollSnap(), whereWeAre);
                setWhereWeAre(slider.selectedScrollSnap());
            });
        }
      }, [slider, setWhereWeAre]);

    /**
     * @param {number} id
     */
    function changeFilter(id) {
        if(id === filterCategory){
            setFilterCategory(false);
        } else {
            setFilterCategory(id);
        }
    }

    /**
     * @param {object} post
     */
    function verifyCategory(post) {
        let returnedValue = !filterCategory ? true : false;

        post.node.categories.forEach(category => {
            if(category.id === filterCategory){
                returnedValue = true;
            }
        });

        return returnedValue;
    }

    return (
        <div className="homeslider">
            <div className="filters">{categories.edges.map(category => <button key={category.node.id} className={category.node.id === filterCategory ? "active" : ""} onClick={()=>changeFilter(category.node.id)}>{category.node.name}</button>)}</div>
            <EmblaCarouselReact emblaRef={setSlider} options={{ loop: false, containScroll: true, align: "start" }}>
                <div style={{ display: 'flex' }}>
                    {posts.filter(verifyCategory).map(post => <Link key={post.node.path} to={post.node.path} className="wrapper">
                        <div className="littlePost">
                            <Img fluid={post.node.featured_media.localFile.childImageSharp.fluid} className="picture" />
                            <h3 dangerouslySetInnerHTML={{ __html: post.node.title }} />
                        </div>    
                    </Link>)}
                </div>
            </EmblaCarouselReact>
        </div>
    )
}

export default HomeSlider