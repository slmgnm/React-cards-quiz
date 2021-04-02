import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import FlashcardList from "./FlashcardList";
import "./app.css";
function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef();
  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => setCategories(response.data.trivia_categories));
  }, []);

  useEffect(() => {
    
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios.get("https://opentdb.com/api.php", {
      params:{
        amount:amountEl.current.value,
        categories:categoryEl.current.value
      }
    }).then((response) =>
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
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category"> Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount"> Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountEl}></input>
        </div>
        <div className="form-group">
          <button className="btn"> Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

export default App;
