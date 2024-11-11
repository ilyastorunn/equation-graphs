import React from "react";

const symbols = ["√", "∛", "∞", "ƒ", "π", "e", "^", "*", "/", "+", "-", "(", ")"];

const MathKeyboard = ({ onSymbolClick }) => {
    return (
        <div className="grid grid-cols-4 gap-2 p-4">
            {symbols.map((symbol, index) => (
                <button
                    key={index}
                    className="bg-gray-200 hover:bg-gray-300 text-lg p-2 rounded shadow"
                    onClick={() => onSymbolClick(symbol)}
                >
                    {symbol}
                </button>
            ))}
        </div>
    );
};

export default MathKeyboard;