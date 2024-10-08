import React, { useState } from 'react';

const PlayerScreen = ({ submitAnswer }) => {
    const [name, setName] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        submitAnswer(name, answer);
    };

    return (
        <div className="player-screen">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PlayerScreen;
