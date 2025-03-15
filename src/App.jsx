import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function App() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(4);
  const [direction, setDirection] = useState("right");
  const playgroundDOMRef = useRef(null);

  const handleKeyDown = (e) => {
    const pressedKey = e.key;

    if (pressedKey === "ArrowRight") {
      if (x === 9) return;

      setX(x + 1);
      setDirection("right");
    } else if (pressedKey === "ArrowLeft") {
      if (x === 0) return;

      setX(x - 1);
      setDirection("left");
    } else if (pressedKey === "ArrowDown") {
      if (y === 9) return;

      setY(y + 1);
    } else if (pressedKey === "ArrowUp") {
      if (y === 0) return;

      setY(y - 1);
    } else if (pressedKey === " ") {
      if (y === 0) return;

      setY(4);

      setTimeout(() => {
        setY((y) => y + 1);
      }, 350);
    }
  };

  useEffect(() => {
    playgroundDOMRef.current.focus();
  }, []);

  return (
    <Playground ref={playgroundDOMRef} onKeyDown={handleKeyDown} tabIndex={0}>
      <Pikachu $x={x} $y={y} $direction={direction} />
    </Playground>
  );
}

const Playground = styled.div`
  width: 800px;
  height: 800px;
  background-image: url("/grass.webp");
  background-repeat: repeat;
  position: relative;
`;

const Pikachu = styled.div`
  width: 80px;
  height: 80px;
  background-image: url("/pikachu.webp");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: ${(props) => props.$y * 80}px;
  left: ${(props) => props.$x * 80}px;
  transition: all 350ms;

  transform: scaleX(${(props) => (props.$direction === "right" ? 1 : -1)});
`;

export default App;
