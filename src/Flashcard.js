import React, { useState, useEffect, useRef } from "react";

const Flashcard = ({ flashcard }) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const frontEl = useRef();
  const backEl = useRef();
  const maxHieght = () => {
    const frontHieght = frontEl.current.getBoundingClientRect().height;
    const backHieght = backEl.current.getBoundingClientRect().height;
    setHeight(() => Math.max(frontHieght, backHieght, 100));
  };
  useEffect(maxHieght, [
    flashcard.question,
    flashcard.options,
    flashcard.answer,
  ]);
  useEffect(() => {
    window.addEventListener("resize", maxHieght);
    return () => window.removeEventListener("resize", maxHieght);
  }, []);
  return (
    <div
      onClick={() => setFlip(!flip)}
      className={`card ${flip ? "flip" : ""}`}
      style={{ height: height }}>
      <div className="front" ref={frontEl}>
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option) => {
            return (
              <div className="flashcard-option" key={option}>
                {" "}
                {option}{" "}
              </div>
            );
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>
    </div>
  );
};

export default Flashcard;
