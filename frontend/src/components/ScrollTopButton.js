import React from 'react'
import "../ScrollTopButton.css"
function ScrollTopButton(props) {
    const scrollToTop=()=>{
        window.scrollTo(0,0);
    }
  return (
    <>
    <div className='position-fixed end-0 bottom-0 mb-2 me-2' style={{zIndex:"99"}}>
       <button onClick={scrollToTop} className='sbtn'>&uarr;</button>
    </div>
    </>
  )
}

export default ScrollTopButton