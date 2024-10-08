import React, { useState, useEffect } from 'react';
import QRCodeDisplay from './components/QRCodeDisplay';
import QuestionScreen from './components/QuestionScreen';
import io from 'socket.io-client';
import './styles/styles.css';

const socket = io.connect('http://localhost:5000');

const questions = [
    {
        question: "What is the capital of France?",
        options: { A: "Paris", B: "London", C: "Berlin", D: "Rome" },
        answer: "A",
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: { A: "Homer", B: "Shakespeare", C: "Dante", D: "Goethe" },
        answer: "B",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: { A: "Venus", B: "Mars", C: "Jupiter", D: "Saturn" },
        answer: "B",
    },
    {
        question: "What is the boiling point of water?",
        options: { A: "90°C", B: "80°C", C: "100°C", D: "110°C" },
        answer: "C",
    },
    {
        question: "Who painted the Mona Lisa?",
        options: { A: "Michelangelo", B: "Leonardo da Vinci", C: "Van Gogh", D: "Picasso" },
        answer: "B",
    }
];

function App() {
    const [player, setPlayer] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        socket.on('correctAnswer', (message) => {
            setIsCorrect(true); // Show "Congratulations" for correct answer
            if (currentQuestion === questions.length - 1) {
                setTimeout(() => {
                    setIsGameOver(true); // End game after the last question
                }, 1000); // 1-second delay before showing Game Over
            } else {
                setTimeout(() => {
                    setCurrentQuestion((prev) => prev + 1); // Move to next question after a delay
                    setIsCorrect(false); // Reset state for the next question
                }, 2000); // 2-second delay before moving to the next question
            }
        });

        socket.on('wrongAnswer', (message) => {
            alert(message); // Display alert on wrong answer
        });

        return () => {
            socket.off('correctAnswer');
            socket.off('wrongAnswer');
        };
    }, [currentQuestion]);

    const submitAnswer = (answer) => {
        const correctAnswer = questions[currentQuestion].answer;
        if (answer === correctAnswer) {
            socket.emit('correctAnswer', player); // Emit correct answer event to backend
        } else {
            socket.emit('wrongAnswer', player); // Emit wrong answer event to backend
        }
    };

    const handlePlayerJoin = (name) => {
        setPlayer(name); // Set player's name once they join
    };

    const current = questions[currentQuestion];

    return (
        <div className="app-container">
            {player === '' ? (
                <QRCodeDisplay handlePlayerJoin={handlePlayerJoin} />
            ) : isGameOver ? (
                <h2>Game Over! Thank you for playing.</h2>
            ) : (
                <>
                    <QuestionScreen
                        question={current.question}
                        options={current.options}
                        submitAnswer={submitAnswer}
                        isCorrect={isCorrect}
                    />
                    {isCorrect && <h2>Congratulations {player}!</h2>}
                </>
            )}
        </div>
    );
}

export default App;
