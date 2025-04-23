// A simple Monkeytype-style typing website
import { useState, useEffect, useRef } from "react";

const wordsList = "the quick brown fox jumps over the lazy dog hello world react typing test keyboard speed accuracy practice".split(" ");

function generateWords(count = 30) {
  const words = [];
  for (let i = 0; i < count; i++) {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    words.push(randomWord);
  }
  return words;
}

export default function TypingTest() {
  const [words, setWords] = useState(generateWords());
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    if (!startTime) setStartTime(Date.now());

    const value = e.target.value;
    if (value.endsWith(" ")) {
      const currentWord = value.trim();
      if (currentWord === words[currentIndex]) {
        setCorrect((c) => c + 1);
      }
      setCurrentIndex((i) => i + 1);
      setInput("");

      if (currentIndex + 1 === words.length) {
        setIsFinished(true);
      }
    } else {
      setInput(value);
    }
  };

  const getWPM = () => {
    const minutes = (Date.now() - startTime) / 60000;
    return Math.round(correct / minutes);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Typing Practice</h1>
      <div className="max-w-2xl text-lg flex flex-wrap gap-2 mb-4">
        {words.map((word, index) => (
          <span
            key={index}
            className={`$ {
              index === currentIndex
                ? "underline text-blue-600"
                : index < currentIndex
                ? "text-gray-400"
                : ""
            }`}
          >
            {word}
          </span>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        className="border border-gray-300 rounded p-2 w-64 text-center"
        value={input}
        onChange={handleChange}
        disabled={isFinished}
      />
      {isFinished && (
        <div className="mt-6 text-xl">
          <p>WPM: {getWPM()}</p>
          <p>Accuracy: {Math.round((correct / words.length) * 100)}%</p>
        </div>
      )}
    </div>
  );
}
