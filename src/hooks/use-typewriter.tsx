import { useState, useEffect, useCallback, useMemo } from "react";

export const useTypewriter = (
  words: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  delayBetweenWords: number = 2000
) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Memoize the current word to avoid recalculation
  const currentWord = useMemo(
    () => words[currentWordIndex],
    [words, currentWordIndex]
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Wait before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentWord,
    isDeleting,
    words.length,
    typingSpeed,
    deletingSpeed,
    delayBetweenWords,
  ]);

  return currentText;
};
