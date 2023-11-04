import { useState, useEffect } from "react";

const words = [
  { text: "Embrace Learning with Joyful Enthusiasm." },
  { text: "Don't wait for opportunity; create it." },
  { text: "Your attitude determines your direction." },
  { text: "Be the best version of yourself, one day at a time." },
];

function WordDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[currentIndex].text);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCurrentWord(words[currentIndex].text);
  }, [currentIndex]);

  return (
    <div>
      <div className="change">{currentWord}</div>
    </div>
  );
}

export default WordDisplay;
