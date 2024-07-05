import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './NormalCalculator.css';

const NormalCalculator = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);

    const handleClick = (value) => {
        setInput(input + value);
    };

    const clearInput = () => {
        setInput('');
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const calculateResult = () => {
        try {
            const evaluatedResult = evaluate(input); // Using mathjs to evaluate the expression
            setHistory([...history, { expression: input, result: evaluatedResult }]);
            setInput(evaluatedResult.toString());
        } catch (error) {
            setInput('Error');
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                <div className="display">
                    <input type="text" value={input} readOnly />
                </div>
                <div className="buttons">
                    <button onClick={() => handleClick('7')}>7</button>
                    <button onClick={() => handleClick('8')}>8</button>
                    <button onClick={() => handleClick('9')}>9</button>
                    <button onClick={() => handleClick('+')}>+</button>
                    <button onClick={() => handleClick('4')}>4</button>
                    <button onClick={() => handleClick('5')}>5</button>
                    <button onClick={() => handleClick('6')}>6</button>
                    <button onClick={() => handleClick('-')}>-</button>
                    <button onClick={() => handleClick('1')}>1</button>
                    <button onClick={() => handleClick('2')}>2</button>
                    <button onClick={() => handleClick('3')}>3</button>
                    <button onClick={() => handleClick('*')}>*</button>
                    <button onClick={clearInput}>C</button>
                    <button onClick={() => handleClick('0')}>0</button>
                    <button onClick={calculateResult}>=</button>
                    <button onClick={() => handleClick('/')}>/</button>
                    <button onClick={() => handleClick('(')}>(</button>
                    <button onClick={() => handleClick(')')}>)</button>
                    <button onClick={() => handleClick('sin(')}>sin</button>
                    <button onClick={() => handleClick('cos(')}>cos</button>
                    <button onClick={() => handleClick('tan(')}>tan</button>
                    <button onClick={() => handleClick('log(')}>log</button>
                    <button onClick={() => handleClick('sqrt(')}>sqrt</button>
                    <button onClick={() => handleClick('pi')}>π</button>
                    <button onClick={() => handleClick('e')}>e</button>
                    <button onClick={() => handleClick('^')}>^</button>
                    <button onClick={() => handleClick('abs(')}>abs</button>
                    <button onClick={() => handleClick('exp(')}>exp</button>
                    <button onClick={() => handleClick('ln(')}>ln</button>
                </div>
            </div>
            <div className="history">
                <div className="history_container">
                    <h2>History</h2>
                    <button onClick={clearHistory}>Clear History</button>
                </div>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            {item.expression} = {item.result}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NormalCalculator;
