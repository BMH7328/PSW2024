import React, { useState, useEffect } from "react";
import { Container, Button, Card, Alert } from "react-bootstrap";

const questions = [
  {
    question: "Question 1: What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: 2,
  },
  {
    question: "Question 2: Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    question: "Question 3: What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1,
  },
  {
    question:
      "Question 4: Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Japan", "Vietnam"],
    correctAnswer: 2,
  },
  {
    question: "Question 5: Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctAnswer: 1,
  },
  {
    question: "Question 6: What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correctAnswer: 3,
  },
  {
    question: "Question 7: Which element has the chemical symbol 'O'?",
    options: ["Oxygen", "Gold", "Silver", "Iron"],
    correctAnswer: 0,
  },
  {
    question: "Question 8: What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: 2,
  },
  {
    question: "Question 9: Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Claude Monet",
    ],
    correctAnswer: 1,
  },
  {
    question: "Question 10: In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1931"],
    correctAnswer: 1,
  },
];

const App = () => {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timer, setTimer] = useState(300);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  const handleStart = () => {
    setPage(1);
    startTimer();
  };

  const handleAnswer = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedOption;
      return newAnswers;
    });
  };

  const calculateScore = () => {
    const correctCount = answers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    return correctCount;
  };

  const handleFinish = () => {
    stopTimer();
    setPage(2);
  };

  const handleRestart = () => {
    setPage(0);
    setAnswers(Array(questions.length).fill(null));
    setTimer(300);
  };

  useEffect(() => {
    if (timer === 0) {
      stopTimer();
      setPage(2);
    }
  }, [timer]);

  return (
    <Container className="mt-5 text-center">
      {page === 0 && (
        <div>
          <h1 className="mt-5"> Welcome to the Quiz Test</h1>
          <Button variant="primary" onClick={handleStart}>
            Start
          </Button>
        </div>
      )}
      {page === 1 && (
        <div>
          <h4>
            Time: {Math.floor(timer / 60)}:{timer % 60}
          </h4>
          {questions.map((q, index) => (
            <Card key={index} className="mt-3">
              <Card.Body>
                <Card.Title>{q.question}</Card.Title>
                {q.options.map((option, optionIndex) => (
                  <Button
                    key={optionIndex}
                    variant={
                      answers[index] === optionIndex
                        ? "primary"
                        : "outline-primary"
                    }
                    className="m-2"
                    onClick={() => handleAnswer(index, optionIndex)}
                  >
                    {option}
                  </Button>
                ))}
              </Card.Body>
            </Card>
          ))}
          <Button
            variant="primary"
            className="mt-5 mb-5"
            onClick={handleFinish}
          >
            Submit
          </Button>
        </div>
      )}
      {page === 2 && (
        <div>
          <h2>Results</h2>
          <Alert
            variant={
              calculateScore() / questions.length >= 0.5 ? "success" : "danger"
            }
          >
            Correct Answers: {calculateScore()} / {questions.length}
          </Alert>
          {questions.map((q, index) => (
            <Card key={index} className="mt-3">
              <Card.Body>
                <Card.Title>{q.question}</Card.Title>
                <div>
                  Your Answer: {q.options[answers[index]]}
                  {answers[index] === q.correctAnswer ? (
                    <span style={{ color: "green", marginLeft: "10px" }}>
                      Correct!
                    </span>
                  ) : (
                    <span style={{ color: "red", marginLeft: "10px" }}>
                      <br />
                      Incorrect! Correct Answer: {q.options[q.correctAnswer]}
                    </span>
                  )}
                </div>
              </Card.Body>
            </Card>
          ))}
          <Button variant="primary" className="mt-3" onClick={handleRestart}>
            Back to home
          </Button>
        </div>
      )}
    </Container>
  );
};

export default App;
