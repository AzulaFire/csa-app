'use client';

import Navbar from '@/components/Navbar';
import { shuffleArray } from '@/util/functions';
import { useEffect, useRef, useState } from 'react';
import quizData from '../data/data';
import QuizCard from '@/components/QuizCard';

interface QuizOption {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const HomePage: React.FC = () => {
  const [numQuestions, setNumQuestions] = useState(10);
  const [shuffledQuiz, setShuffledQuiz] = useState<QuizOption[]>([]);
  const [reset, setReset] = useState(false); // Added reset state
  const [score, setScore] = useState(0);
  const forceUpdate = useRef(0);

  const triggerReload = () => {
    setReset((prev) => !prev); // Toggle reset state
    forceUpdate.current += 1; // Trigger a re-render
  };

  useEffect(() => {
    const randomQuestions = getRandomQuestions(numQuestions);
    setShuffledQuiz(randomQuestions);
  }, [numQuestions, reset]); // Depend on reset state for quiz reset

  // Function to get a random subset of questions
  const getRandomQuestions = (num: number): QuizOption[] => {
    // Shuffle quizData and get the first 'num' questions
    const shuffled = shuffleArray([...quizData]);
    return shuffled.slice(0, num);
  };

  return (
    <>
      <Navbar
        title='ServiceNow CSA Study App'
        setNumQuestions={setNumQuestions}
        triggerReload={triggerReload}
      />
      <main className='container my-2 flex items-center justify-center'>
        {/* Display the questions in a responsive grid layout */}
        <div className='grid grid-cols-1 gap-8'>
          {shuffledQuiz.map((questionData, index) => (
            <QuizCard
              key={index}
              questionData={questionData}
              index={index}
              reset={reset} // Pass reset flag to QuizCard
              numQuestions={numQuestions}
              score={score}
              setScore={setScore}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
