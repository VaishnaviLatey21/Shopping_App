import React, { useRef } from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Image1 from "../Images/Image1.jpg";
import Image2 from "../Images/Image2.jpg";
import Image3 from "../Images/Image3.jpg";


function Slider() {
    const images = [Image1, Image2, Image3];

    const elementRef = useRef(null);
  
    const handleNext = (element) => {
        if (elementRef.current) {
            elementRef.current.scrollLeft += 1500;
        }
    };
  
    const handlePrev = (element) => {
        if (elementRef.current) {
            elementRef.current.scrollLeft -= 1500;
        }
    };
  
  
  
    return (
        <div className='relative mt-2'>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <IoChevronBackOutline className="cursor-pointer text-[60px] text-white" onClick={handlePrev} />
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center p-2">
                <IoChevronForwardOutline className="cursor-pointe  text-[60px] text-white" onClick={handleNext} />
            </div>
  
            <div className='text-white flex overflow-x-auto px-18 scrollbar-hide scroll-smooth'
                ref={elementRef}>
                {
                    images.map((image, index) => (
                        <div key={index} className='pb-7 grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 '
                        style={{
                            backgroundImage: `url(${image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            // className: "flex flex-col justify-center text-center",
                            minHeight: "500px",
                            minWidth: "98%",
                            marginRight: "16px"
                        }}>
                           
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Slider