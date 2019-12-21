import React, { useState, useEffect } from 'react'
import EmblaCarouselReact from 'embla-carousel-react'
import Img from "gatsby-image"
//import NextIcon from "../icons/next.svg"
import { Link } from 'gatsby';

function HomeSlider({ posts }) {
    const [slider, setSlider] = useState(null);
    const [whereWeAre, setWhereWeAre] = useState(0);

    useEffect(() => {
        if (slider) {
            slider.on("select", () => {
                console.log(slider.selectedScrollSnap(), whereWeAre);
                setWhereWeAre(slider.selectedScrollSnap());
            });
        }
      }, [slider, setWhereWeAre]);

    return (
        <div className="homeslider">
            <EmblaCarouselReact emblaRef={setSlider} options={{ loop: false, containScroll: true, align: "start" }}>
                <div style={{ display: 'flex' }}>
                    {posts.map(post => <Link key={post.node.path} to={post.node.path} className="wrapper">
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