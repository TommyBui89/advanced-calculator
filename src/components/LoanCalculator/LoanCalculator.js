import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './LoanCalculator.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const LoanCalculator = ({ theme }) => {
    const [principal, setPrincipal] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [years, setYears] = useState('');
    const [paymentFrequency, setPaymentFrequency] = useState('monthly');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [finalTotal, setFinalTotal] = useState('');
    const [amortizationData, setAmortizationData] = useState([]);

    const paymentPeriods = {
        weekly: 52,
        fortnightly: 26,
        monthly: 12,
        quarterly: 4,
        yearly: 1,
    };

    const calculatePayment = () => {
        const principalAmount = parseFloat(principal);
        const annualInterestRate = parseFloat(interestRate) / 100;
        const numberOfPayments = parseInt(years) * paymentPeriods[paymentFrequency];
        const interestRatePerPeriod = annualInterestRate / paymentPeriods[paymentFrequency];

        const x = Math.pow(1 + interestRatePerPeriod, numberOfPayments);
        const payment = (principalAmount * x * interestRatePerPeriod) / (x - 1);

        if (!isNaN(payment) && payment !== Infinity) {
            const totalPaid = payment * numberOfPayments;
            const interestPaid = totalPaid - principalAmount;
            setPaymentAmount(payment.toFixed(2));
            setTotalInterest(interestPaid.toFixed(2));
            setFinalTotal(totalPaid.toFixed(2));
            calculateAmortization(principalAmount, interestRatePerPeriod, numberOfPayments, payment);
        } else {
            setPaymentAmount('');
            setTotalInterest('');
            setFinalTotal('');
        }
    };

    const calculateAmortization = (principal, interestRate, numberOfPayments, payment) => {
        let balance = principal;
        const amortizationSchedule = [];
        for (let i = 1; i <= numberOfPayments; i++) {
            const interest = balance * interestRate;
            const principalPaid = payment - interest;
            balance -= principalPaid;
            amortizationSchedule.push({ month: i, balance: Math.max(balance, 0) });
        }
        setAmortizationData(amortizationSchedule);
    };

    const clearFields = () => {
        setPrincipal('');
        setInterestRate('');
        setYears('');
        setPaymentFrequency('monthly');
        setPaymentAmount('');
        setTotalInterest('');
        setFinalTotal('');
        setAmortizationData([]);
    };

    const chartData = {
        labels: amortizationData.map(data => `Period ${data.month}`),
        datasets: [
            {
                label: 'Loan Balance',
                data: amortizationData.map(data => data.balance),
                fill: false,
                backgroundColor: theme === 'dark' ? '#36A2EB' : 'rgba(75,192,192,0.4)',
                borderColor: theme === 'dark' ? '#36A2EB' : 'rgba(75,192,192,1)',
            },
        ],
    };

    const pieData = {
        labels: ['Principal', 'Interest'],
        datasets: [
            {
                data: [parseFloat(principal), parseFloat(totalInterest)],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
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
            },
            y: {
                ticks: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
                grid: {
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

    const pieOptions = {
        plugins: {
            legend: {
                labels: {
                    color: theme === 'dark' ? '#fff' : '#000',
                },
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    };

    return (
        <div className={`${styles.loanCalculatorContainer} ${theme === 'dark' ? styles.dark : ''}`}>
            <div className={styles.calculator}>
                <div className={styles.topInputGroup}>
                    <div className={styles.inputGroup}>
                        <label>Principal Amount</label>
                        <input
                            type="number"
                            value={principal}
                            onChange={(e) => setPrincipal(e.target.value)}
                            placeholder="Enter Principal Amount"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Annual Interest Rate (%)</label>
                        <input
                            type="number"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            placeholder="Enter Interest Rate"
                        />
                    </div>
                </div>
                <div className={styles.bottomInputGroup}>
                    <div className={styles.inputGroup}>
                        <label>Loan Term (Years)</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            placeholder="Enter Loan Term"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Payment Frequency</label>
                        <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}>
                            <option value="weekly">Weekly</option>
                            <option value="fortnightly">Fortnightly</option>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>

                <div className={styles.buttonGroup}>
                    <button className={styles.calculateButton} onClick={calculatePayment}>Calculate</button>
                    <button className={styles.clearButton} onClick={clearFields}>Clear</button>
                </div>
                {paymentAmount && (
                    <div className={styles.resultsContainer}>
                        <div className={styles.results}>
                            <div className={styles.resultBox}>
                                <h3>{`${paymentFrequency.charAt(0).toUpperCase() + paymentFrequency.slice(1)} Payment: $${paymentAmount}`}</h3>
                            </div>
                            <div className={styles.resultBox}>
                                <h3>Total Interest: ${totalInterest}</h3>
                            </div>
                            <div className={styles.resultBox}>
                                <h3>Final Total: ${finalTotal}</h3>
                            </div>
                            <div className={styles.resultBox}>
                                <h3>Total without Interest (Principal): ${principal}</h3>
                            </div>
                        </div>
                        <div className={styles.charts}>
                            <div className={styles.chart}>
                                <Line data={chartData} options={chartOptions} />
                            </div>
                            <div className={styles.pieChart}>
                                <Pie data={pieData} options={pieOptions} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoanCalculator;