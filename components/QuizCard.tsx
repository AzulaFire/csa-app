import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { shuffleArray } from '@/util/functions';
import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface QuizOption {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface QuizCardProps {
  questionData: QuizOption;
  index: number;
  reset: boolean; // Receive reset prop
  numQuestions: number;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const QuizCard: React.FC<QuizCardProps> = ({
  questionData,
  index,
  reset, // Receive reset prop
  numQuestions,
  score,
  setScore,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState<boolean | null>(null);

  // Shuffle options once when the component mounts or resets
  useEffect(() => {
    setShuffledOptions(shuffleArray([...questionData.options]));
    setSelectedOption(null); // Reset selected option
    setIsCorrect(null); // Reset correctness
    setShowExplanation(null); // Reset explanation
    setScore(0);
  }, [questionData.options, reset, setScore]); // Reset on `reset` prop change

  const handleClick = (option: string) => {
    setSelectedOption(option);
    if (option === questionData.correctAnswer) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleExplanationClick = () => {
    setShowExplanation(!showExplanation);
  };

  console.log(score);

  return (
    <Card className='bg-gray-50 w-full lg:w-[1000px]'>
      <CardHeader>
        <CardTitle>
          {`Question ${index + 1}:`}{' '}
          <span className='text-sm font-normal'>{`Current Score: ${(
            (score / numQuestions) *
            100
          ).toFixed(0)}%`}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='w-full items-center gap-4 inline-flex justify-between flex-col lg:flex-row'>
          <div className='flex flex-col space-y-1.5'>
            {questionData.question}
          </div>
          <div>
            {/* Only show icon if answer is correct */}
            {isCorrect && <FaCheckCircle className='text-green-500 w-6 h-6' />}
            {/* Show the red icon if the answer is incorrect */}
            {!isCorrect && isCorrect !== null && (
              <>
                <Button onClick={handleExplanationClick}>
                  Show Explanation
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col justify-start gap-4 items-start'>
        {shuffledOptions.map((option, i) => {
          let buttonClass = 'w-full bg-sky-950'; // Default class (initial state)

          // Set button color based on correctness when answers are revealed
          if (selectedOption) {
            if (option === questionData.correctAnswer) {
              buttonClass += isCorrect ? ' bg-lime-500' : ' '; // Green if correct, red if incorrect
            } else if (option === selectedOption) {
              buttonClass += isCorrect ? ' bg-lime-500' : ' bg-rose-700'; // Red if incorrect
            }
          }

          return (
            <Button
              variant='alternative'
              size='xl'
              className={`${buttonClass} ${
                option?.length > 50
                  ? 'text-wrap h-24'
                  : option?.length > 36
                  ? 'text-wrap h-20'
                  : ''
              }`}
              key={i}
              onClick={() => handleClick(option)}
            >
              {option}
            </Button>
          );
        })}
        {showExplanation && (
          <div>
            <p className='font-bold mb-4'>
              Correct Answer: {questionData.correctAnswer}
            </p>
            <p>{questionData.explanation}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
