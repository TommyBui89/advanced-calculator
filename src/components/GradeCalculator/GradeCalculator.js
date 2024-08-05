import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './GradeCalculator.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const GradeCalculator = ({ theme }) => {
    const [grades, setGrades] = useState([{ name: '', score: '', weight: '' }]);
    const [finalGrade, setFinalGrade] = useState('');
    const [gradingSystem, setGradingSystem] = useState('percentage');
    const [goalGrade, setGoalGrade] = useState('');
    const [gradeInputError, setGradeInputError] = useState('');
    const [goalError, setGoalError] = useState('');
    const [weightError, setWeightError] = useState('');

    const calculateTotalWeight = () => grades.reduce((total, grade) => total + (parseFloat(grade.weight) || 0), 0);

    const handleAddGrade = () => {
        const totalWeight = calculateTotalWeight();
        if (totalWeight < 100) {
            setGrades([...grades, { name: '', score: '', weight: '' }]);
        } else {
            setGradeInputError('Total weight cannot exceed 100%.');
        }
    };

    const handleGradeChange = (index, field, value) => {
        const newGrades = [...grades];
        newGrades[index][field] = value;

        if (field === 'weight') {
            const totalWeight = calculateTotalWeight() - (parseFloat(grades[index].weight) || 0) + (parseFloat(value) || 0);
            if (totalWeight > 100) {
                setGradeInputError('Total weight cannot exceed 100%.');
                return;
            } else {
                setGradeInputError('');
            }
        }

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
            setWeightError('');
        } else {
            setWeightError('The total weight should be 100%. Please adjust the weights.');
        }
    };

    const handleCalculateGoal = () => {
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

        const remainingWeight = 100 - totalWeight;
        const requiredScore = (parseFloat(goalGrade) - weightedSum) / (remainingWeight / 100);

        if (totalWeight <= 100 && requiredScore <= 100) {
            setGoalError(`You need to score at least ${requiredScore.toFixed(2)}% in the remaining ${remainingWeight}% weight to achieve your goal.`);
        } else {
            setGoalError('It is not possible to achieve the goal with the current grades and weights.');
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

    const chartData = grades.map((grade, index) => ({
        name: grade.name || `Assessment ${index + 1}`,
        score: parseFloat(grade.score) || 0,
        weight: parseFloat(grade.weight) || 0,
    }));

    return (
        <div className={`gc-container ${theme}`}>
            <div className="gc-input-section">
                <div className="gc-grades-input">
                    <label htmlFor="grading-Inputs">Grading Inputs</label>
                    <div className='gc-line'></div>
                    {grades.map((grade, index) => (
                        <div key={index} className="gc-grade-row">
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
                            <button onClick={() => handleDeleteGrade(index)} className="gc-delete-grade-button">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}

                    {gradeInputError && <div className="gc-error">{gradeInputError}</div>}

                    <div className="gc-add-grade-container">
                        <button onClick={handleAddGrade} className="gc-add-grade-button">Add Another Assessment</button>
                    </div>
                </div>

                <div className="gc-goal-container">
                    <label htmlFor="goal-grade">Goal Grade</label>
                    <div className='gc-line'></div>
                    <input
                        type="number"
                        id="goal-grade"
                        value={goalGrade}
                        onChange={(e) => setGoalGrade(e.target.value)}
                        placeholder="Enter Goal Grade"
                    />
                    <button onClick={handleCalculateGoal} className="gc-calculate-goal-button">Calculate Required Score</button>
                    {goalError && <div className="gc-error">{goalError}</div>}
                </div>
            </div>
            
            <div className="gc-chart-section">
                <div className="gc-chart-container">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#555' : '#ccc'} />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: theme === 'dark' ? '#ffffff' : '#000' }}
                            />
                            <YAxis
                                tick={{ fill: theme === 'dark' ? '#ffffff' : '#000' }}
                                domain={[0, 100]}
                            />
                            <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }} />
                            <Legend wrapperStyle={{ color: theme === 'dark' ? '#ffffff' : '#000' }} />
                            <Bar dataKey="score" fill={theme === 'dark' ? '#36A2EB' : 'rgba(75,192,192,0.4)'} />
                            <Bar dataKey="weight" fill={theme === 'dark' ? '#FF6384' : 'rgba(255,99,132,0.4)'} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="gc-final-grade-container">
                    <div className="gc-grading-system-container">
                        <label htmlFor="grading-system">Grading System</label>
                        <div className='gc-line'></div>
                        <select
                            id="grading-system"
                            value={gradingSystem}
                            onChange={(e) => setGradingSystem(e.target.value)}
                        >
                            <option value="percentage">Percentage</option>
                            <option value="gpa">GPA</option>
                            <option value="letter">Letter Grade</option>
                        </select>
                        {weightError && <div className="gc-error">{weightError}</div>}
                        <div className="gc-calculate-grade-container">
                            <button onClick={handleCalculateGrade} className="gc-calculate-grade-button">Calculate Final Grade</button>
                        </div>
                    </div>

                    {finalGrade && <div className="gc-final-grade">Final Grade: {finalGrade}</div>}
                </div>
            </div>
        </div>
    );
};

export default GradeCalculator;
