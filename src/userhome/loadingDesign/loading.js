import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './loading.css'
import Avatar from '@mui/material/Avatar';
import BMCC from './../assets/mydo.png'

const LoadingRhombus = styled.div`
  width: ${(props) => props.size * 4}px;
  height: ${(props) => props.size}px;
  position: relative;

  * {
    box-sizing: border-box;
  }

  .rhombus {
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    background-color: ${(props) => props.color};
    left: ${(props) => props.size * 4}px;
    position: absolute;
    margin: 0 auto;
    border-radius: 2px;
    transform: translateY(0) rotate(45deg) scale(0);
    animation: looping-rhombuses-spinner-animation
      ${(props) => props.animationDuration}ms linear infinite;
  }
  .rhombus:nth-child(1) {
    animation-delay: calc(${(props) => props.animationDuration}ms * 1 / -1.5);
  }
  .rhombus:nth-child(2) {
    animation-delay: calc(${(props) => props.animationDuration}ms * 2 / -1.5);
  }
  .rhombus:nth-child(3) {
    animation-delay: calc(${(props) => props.animationDuration}ms * 3 / -1.5);
  }
  @keyframes looping-rhombuses-spinner-animation {
    0% {
      transform: translateX(0) rotate(45deg) scale(0);
    }
    50% {
      transform: translateX(-233%) rotate(45deg) scale(1);
    }
    100% {
      transform: translateX(-466%) rotate(45deg) scale(0);
    }
  }
`;

const propTypes = {
  size: PropTypes.number,
  animationDuration: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

function generateSpinners(num) {
  return Array.from({ length: num }).map((val, index) => (
    <div key={index} className="rhombus" />
  ));
}

const LoopingRhombusesSpinner = ({
  size = 27,
  color = '#043F97',
  animationDuration = 2500,
  className = '',
  style,
  ...props
}) => {
  const num = 6;

  return (
    <>
    <div className='loadings'>
        <div className="loadingcontainer">
        <div className='loadingcontent'>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'10px',flexDirection:'column'}}>
        <Avatar alt="" src={BMCC} sx={{width: 80, height: 80}} />
          <h1 style={{margin:'0px',marginLeft:'5px',color:'#043F97'}}>Marilao Youth Development Office</h1>
        </div>
        <LoadingRhombus
          size={size}
          color={color}
          animationDuration={animationDuration}
          className={`looping-rhombuses-spinner${className ? ' ' + className : ''}`}
          style={style}
          {...props}
        >
          {generateSpinners(num)}
        </LoadingRhombus>
    </div>
    </div>
    </div>
    </>
  );
};

LoopingRhombusesSpinner.propTypes = propTypes;

export default LoopingRhombusesSpinner;