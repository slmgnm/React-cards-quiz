import React, { useEffect, useState } from "react";
import axios from "axios";
import FlashcardList from "./FlashcardList";
import "./app.css";
function App() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((response) =>
      setFlashcards(
        response.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          console.log(response);
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        }),
      ),
    );
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  return <FlashcardList flashcards={flashcards} />;
}

// const SAMPLE_FLASHCARDS = [
//   {
//     id: 1,
//     question: "What is 2 +2",
//     answer: 4,
//     options: ["2", "4", "3", "5"],
//   },
//   {
//     id: 2,
//     question: "What is your name",
//     answer: "tameem",
//     options: ["Tameem", "Ahmad", "Hassan", "5"],
//   },
// ];

export default App;
