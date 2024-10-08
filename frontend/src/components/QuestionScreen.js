import React from 'react';

const QuestionScreen = ({ question, options, submitAnswer, isCorrect }) => {
    return (
        <div className="question-screen" style={{ textAlign: 'center' }}>
            <h2>{question}</h2>
            <div
                className="options"
                style={{
                    display: 'flex',
                    flexDirection: 'column', // Stack buttons vertically
                    alignItems: 'center', // Align the buttons horizontally in the center
                    justifyContent: 'center', // Align vertically in the center
                    height: '50vh', // Adjust height for better centering
                }}
            >
                {Object.keys(options).map((key) => (
                    <button
                        key={key}
                        onClick={() => submitAnswer(key)}
                        style={{
                            margin: '10px',
                            padding: '15px',
                            backgroundColor: isCorrect ? '#12B34C' : '#1B8CEF', // Optional visual feedback
                            border: '2px solid black',
                            cursor: 'pointer',
                            width: '200px', // Set fixed width for buttons
                            textAlign: 'center',
                        }}
                    >
                        {key}: {options[key]}
                    </button>
                ))}
            </div>
            {isCorrect && <p style={{ marginTop: '20px' }}>Correct! Moving to the next question...</p>}
        </div>
    );
};

export default QuestionScreen;
