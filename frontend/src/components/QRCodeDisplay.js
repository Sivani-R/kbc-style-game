import React, { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeDisplay = ({ handlePlayerJoin }) => {
    const [playerName, setPlayerName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePlayerJoin(playerName);
    };

    return (
        <div className="qr-code-display">
            <h2>Scan the QR Code to Join</h2>
            <QRCode value="http://localhost:3000" size={150} />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    required
                />
                <button type="submit">Join Game</button>
            </form>
        </div>
    );
};

export default QRCodeDisplay;
