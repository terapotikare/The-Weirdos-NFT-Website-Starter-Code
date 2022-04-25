import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Vector from "../Icons/Vector";

const VectorContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translate(-50%);
  width: 100%;
  height: 100%;
  overflow: hidden;

  svg {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 48em) {
    left: 1rem;
  }
`;

const Bounce = keyframes`
from {transform:translateX(-50%) scale(0.5);}
to   {transform:translateX(-50%) scale(1);}


`;
const Ball = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.text};
  animation: ${Bounce} 0.5s linear infinite alternate;
  @media (max-width: 48em) {
    left: 1rem;
  }
`;
const DrawSvg = () => {
  const ref = useRef(null);
  const ballref = useRef(null);

  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
    let element = ref.current;
    let svg = document.getElementsByClassName("svg-path")[0];

    const lenght = svg.getTotalLength();

    //start positioning of svg drawing
    svg.style.strokeDasharray = lenght;

    //Hide svg before scrolling start
    svg.style.strokeDashoffset = lenght;

    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          const draw = lenght * self.progress;
          console.log(self.progress);
          //also reverse the drawiing when scroll goes up
          svg.style.strokeDashoffset = lenght - draw;
        },
        onToggle: (self) => {
          if (self.isActive) {
            //console.log("Scrolling is active");
            ballref.current.style.display = "none";
          } else {
            //console.log("Scrolling is  not active");
            ballref.current.style.display = "inline-block";
          }
        },
      },
    });

    return () => {
      if (t1) t1.kill();
    };
  }, []);
  return (
    <>
      <Ball ref={ballref} />
      <VectorContainer ref={ref}>
        <Vector />
      </VectorContainer>
    </>
  );
};

export default DrawSvg;
