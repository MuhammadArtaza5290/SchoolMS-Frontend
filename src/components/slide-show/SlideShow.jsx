import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import image1 from '../../assets/school.jpg'
import image2 from '../../assets/library.jpg'
import image3 from '../../assets/computer3.jpg'
function SlideShow() {
    const images = [image1, image2, image3]
  return (
       <div className="slideshow-container" style={{ maxWidth: '90%',  margin: '0 auto' }}>
      <Slide
      duration={3000}
  autoplay={true}
  transitionDuration={1000}
  infinite={true}
  indicators={true}
>
        {images.map((image, index) => (
          <div key={index} style={{ textAlign: 'center' }}>
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '550px', borderRadius: '10px' }}/>
          </div>
        ))}
      </Slide>
    </div>

  )
}

export default SlideShow