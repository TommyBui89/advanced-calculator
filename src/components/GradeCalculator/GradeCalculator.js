import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './GradeCalculator.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GradeCalculator = ({ theme }) => {
    const [grades, setGrades] = useState([{ name: '', score: '', weight: '' }]);
    const [finalGrade, setFinalGrade] = useState('');
    const [gradingSystem, setGradingSystem] = useState('percentage');

    const calculateTotalWeight = () => {
        return grades.reduce((total, grade) => total + (parseFloat(grade.weight) || 0), 0);
    };

    const handleAddGrade = () => {
        const totalWeight = calculateTotalWeight();
        if (totalWeight < 100) {
            setGrades([...grades, { name: '', score: '', weight: '' }]);
        } else {
            alert('Total weight cannot exceed 100%.');
        }
    };

    const handleGradeChange = (index, field, value) => {
        const newGrades = [...grades];
        newGrades[index][field] = value;
        setGrades(newGrades);
    };

    const handleDeleteGrade = (index) => {
        const newGrades = grades.filter((_, i) => i !== index);
        setGrades(newGrades);
    };

    const handleCalculateGrade = () => {
        let totalWeight = 0;
        let weightedSum = 0;

        grades.forEach((grade) => {
            const score = parseFloat(grade.score);
            const weight = parseFloat(grade.weight);
            if (!isNaN(score) && !isNaN(weight)) {
                weightedSum += score * (weight / 100);
                totalWeight += weight;
            }
        });

        if (totalWeight === 100) {
            setFinalGrade(convertGrade(weightedSum.toFixed(2)));
        } else {
            alert('The total weight should be 100%. Please adjust the weights.');
        }
    };

    const convertGrade = (grade) => {
        const numericGrade = parseFloat(grade);
        switch (gradingSystem) {
            case 'percentage':
                return `${numericGrade}%`;
            case 'gpa':
                return (numericGrade / 20).toFixed(2); // Assuming a 5.0 scale GPA
            case 'letter':
                return convertToLetterGrade(numericGrade);
            default:
                return grade;
        }
    };

    const convertToLetterGrade = (numericGrade) => {
        if (numericGrade >= 90) return 'A';
        if (numericGrade >= 80) return 'B';
        if (numericGrade >= 70) return 'C';
        if (numericGrade >= 60) return 'D';
        return 'F';
    };

    const chartData = {
        labels: grades.map((grade, index) => grade.name || `Assessment ${index + 1}`),
        datasets: [
            {
                label: 'Scores',
                data: grades.map((grade) => parseFloat(grade.score) || 0),
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
            {
                label: 'Weights',
                data: grades.map((grade) => parseFloat(grade.weight) || 0),
                backgroundColor: 'rgba(255,99,132,0.4)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                ticks: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
                grid: {
                    color: theme === 'dark' ? '#444' : '#ccc',
                },
                label: {
                    color: theme === 'dark' ? '#444' : '#ccc',
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
                grid: {
                    color: theme === 'dark' ? '#444' : '#ccc',
                },
                label: {
                    color: theme === 'dark' ? '#444' : '#ccc',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
            },
        },
    };

    return (
        <div className={`grade-calculator-container ${theme}`}>
            <h2>Grade Calculator</h2>
            <div className="grades-input">
                {grades.map((grade, index) => (
                    <div key={index} className="grade-input-row">
                        <input
                            type="text"
                            placeholder="Assessment Name"
                            value={grade.name}
                            onChange={(e) => handleGradeChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Score"
                            value={grade.score}
                            onChange={(e) => handleGradeChange(index, 'score', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Weight (%)"
                            value={grade.weight}
                            onChange={(e) => handleGradeChange(index, 'weight', e.target.value)}
                        />
                        <button onClick={() => handleDeleteGrade(index)} className="delete-grade-button">Delete</button>
                    </div>
                ))}
            </div>

            <div className="add-grade-container">
                <button onClick={handleAddGrade} className="add-grade-button">Add Another Assessment</button>
            </div>

            <div className="button-container">
                <div className="grading-system-container">
                    <label htmlFor="grading-system">Grading System: </label>
                    <select
                        id="grading-system"
                        value={gradingSystem}
                        onChange={(e) => setGradingSystem(e.target.value)}
                    >
                        <option value="percentage">Percentage</option>
                        <option value="gpa">GPA</option>
                        <option value="letter">Letter Grade</option>
                    </select>
                </div>
                <div className="calculate-grade-container">
                    <button onClick={handleCalculateGrade} className="calculate-grade-button">Calculate Final Grade</button>
                </div>
            </div>

            {finalGrade && <div className="final-grade">Final Grade: {finalGrade}</div>}
            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default GradeCalculator;
