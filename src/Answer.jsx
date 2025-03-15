import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [direction, setDirection] = useState("right");
  const playgroundDOMRef = useRef(null);

  useEffect(() => {
    playgroundDOMRef.current.focus();
  }, []);

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
    } else if (pressedKey === "ArrowUp") {
      if (y === 0) return;

      setY(y - 1);
    } else if (pressedKey === "ArrowDown") {
      if (y === 9) return;

      setY(y + 1);
    } else if (pressedKey === " ") {
      if (y === 0) return;

      setY(y - 1);

      setTimeout(() => {
        setY((y) => y + 1);
      }, 500);
    }
  };

  return (
    <Playground ref={playgroundDOMRef} tabIndex={0} onKeyDown={handleKeyDown}>
      <Pikachu $x={x} $y={y} $direction={direction} />
    </Playground>
  );
}

const Playground = styled.div`
  width: 1000px;
  height: 1000px;
  background-image: url("./grass.webp");
  background-position: center;
  background-repeat: repeat;
  position: relative;
`;

const Pikachu = styled.div`
  width: 100px;
  height: 100px;
  background-image: url("./pikachu.webp");
  background-position: center;
  background-size: contain;
  position: absolute;
  top: ${(props) => props.$y * 100}px;
  left: ${(props) => props.$x * 100}px;
  transform: scaleX(${(props) => (props.$direction === "right" ? 1 : -1)});
  transition: all 350ms;
`;

export default App;
