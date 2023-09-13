import React, { useState, useEffect } from 'react';
import '../css/scrollBtn.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the button when the user scrolls down
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Add smooth scrolling animation
    });
  };

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <KeyboardArrowUpIcon sx={{fontSize:'50px'}}/>
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
