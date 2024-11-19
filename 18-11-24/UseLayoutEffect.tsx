// Create a react component to apply fading effect to heading tag using useLayoutEffect()  hook.

import React, { useState, useLayoutEffect, useCallback } from "react";

const UseLayoutEffect: React.FC = () => {
  const [opacity, setOpacity] = useState(1);
  const [direction, setDirection] = useState<"fade-in" | "fade-out">(
    "fade-out"
  );

  // useCallback to toggle the fade direction
  const toggleFade = useCallback(() => {
    setDirection((prevDirection) =>
      prevDirection === "fade-out" ? "fade-in" : "fade-out"
    );
  }, []);

  // useLayoutEffect to handle the fade effect
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setOpacity((prevOpacity) => {
        if (direction === "fade-out") {
          return prevOpacity > 0 ? prevOpacity - 0.1 : 0;
        } else {
          return prevOpacity < 1 ? prevOpacity + 0.1 : 1;
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ opacity, transition: "opacity 0.1s linear" }}>
        Fading Heading
      </h1>
      <button onClick={toggleFade} style={{ marginTop: "20px" }}>
        Toggle Fade
      </button>
    </div>
  );
};

export default UseLayoutEffect;
