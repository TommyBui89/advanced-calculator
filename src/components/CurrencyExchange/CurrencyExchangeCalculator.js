import React, { useState, useEffect } from 'react';
import './CurrencyExchangeCalculator.css';

const API_KEY = '80b7d78856f48d704513030b';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const currencyOptions = [
    { code: 'AED', name: 'UAE Dirham', flag: '🇦🇪' },
    { code: 'AFN', name: 'Afghan Afghani', flag: '🇦🇫' },
    { code: 'ALL', name: 'Albanian Lek', flag: '🇦🇱' },
    { code: 'AMD', name: 'Armenian Dram', flag: '🇦🇲' },
    { code: 'ANG', name: 'Netherlands Antillean Guilder', flag: '🇳🇱' },
    { code: 'AOA', name: 'Angolan Kwanza', flag: '🇦🇴' },
    { code: 'ARS', name: 'Argentine Peso', flag: '🇦🇷' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'AWG', name: 'Aruban Florin', flag: '🇦🇼' },
    { code: 'AZN', name: 'Azerbaijani Manat', flag: '🇦🇿' },
    { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark', flag: '🇧🇦' },
    { code: 'BBD', name: 'Barbadian Dollar', flag: '🇧🇧' },
    { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩' },
    { code: 'BGN', name: 'Bulgarian Lev', flag: '🇧🇬' },
    { code: 'BHD', name: 'Bahraini Dinar', flag: '🇧🇭' },
    { code: 'BIF', name: 'Burundian Franc', flag: '🇧🇮' },
    { code: 'BMD', name: 'Bermudian Dollar', flag: '🇧🇲' },
    { code: 'BND', name: 'Brunei Dollar', flag: '🇧🇳' },
    { code: 'BOB', name: 'Bolivian Boliviano', flag: '🇧🇴' },
    { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
    { code: 'BSD', name: 'Bahamian Dollar', flag: '🇧🇸' },
    { code: 'BTN', name: 'Bhutanese Ngultrum', flag: '🇧🇹' },
    { code: 'BWP', name: 'Botswana Pula', flag: '🇧🇼' },
    { code: 'BYN', name: 'Belarusian Ruble', flag: '🇧🇾' },
    { code: 'BZD', name: 'Belize Dollar', flag: '🇧🇿' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'CDF', name: 'Congolese Franc', flag: '🇨🇩' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'CLP', name: 'Chilean Peso', flag: '🇨🇱' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'COP', name: 'Colombian Peso', flag: '🇨🇴' },
    { code: 'CRC', name: 'Costa Rican Colón', flag: '🇨🇷' },
    { code: 'CUP', name: 'Cuban Peso', flag: '🇨🇺' },
    { code: 'CVE', name: 'Cape Verdean Escudo', flag: '🇨🇻' },
    { code: 'CZK', name: 'Czech Koruna', flag: '🇨🇿' },
    { code: 'DJF', name: 'Djiboutian Franc', flag: '🇩🇯' },
    { code: 'DKK', name: 'Danish Krone', flag: '🇩🇰' },
    { code: 'DOP', name: 'Dominican Peso', flag: '🇩🇴' },
    { code: 'DZD', name: 'Algerian Dinar', flag: '🇩🇿' },
    { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
    { code: 'ERN', name: 'Eritrean Nakfa', flag: '🇪🇷' },
    { code: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'FJD', name: 'Fijian Dollar', flag: '🇫🇯' },
    { code: 'FKP', name: 'Falkland Islands Pound', flag: '🇫🇰' },
    { code: 'FOK', name: 'Faroese Króna', flag: '🇫🇴' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'GEL', name: 'Georgian Lari', flag: '🇬🇪' },
    { code: 'GGP', name: 'Guernsey Pound', flag: '🇬🇬' },
    { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
    { code: 'GIP', name: 'Gibraltar Pound', flag: '🇬🇮' },
    { code: 'GMD', name: 'Gambian Dalasi', flag: '🇬🇲' },
    { code: 'GNF', name: 'Guinean Franc', flag: '🇬🇳' },
    { code: 'GTQ', name: 'Guatemalan Quetzal', flag: '🇬🇹' },
    { code: 'GYD', name: 'Guyanese Dollar', flag: '🇬🇾' },
    { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
    { code: 'HNL', name: 'Honduran Lempira', flag: '🇭🇳' },
    { code: 'HRK', name: 'Croatian Kuna', flag: '🇭🇷' },
    { code: 'HTG', name: 'Haitian Gourde', flag: '🇭🇹' },
    { code: 'HUF', name: 'Hungarian Forint', flag: '🇭🇺' },
    { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩' },
    { code: 'ILS', name: 'Israeli New Shekel', flag: '🇮🇱' },
    { code: 'IMP', name: 'Isle of Man Pound', flag: '🇮🇲' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'IQD', name: 'Iraqi Dinar', flag: '🇮🇶' },
    { code: 'IRR', name: 'Iranian Rial', flag: '🇮🇷' },
    { code: 'ISK', name: 'Icelandic Króna', flag: '🇮🇸' },
    { code: 'JEP', name: 'Jersey Pound', flag: '🇯🇪' },
    { code: 'JMD', name: 'Jamaican Dollar', flag: '🇯🇲' },
    { code: 'JOD', name: 'Jordanian Dinar', flag: '🇯🇴' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { code: 'KGS', name: 'Kyrgyzstani Som', flag: '🇰🇬' },
    { code: 'KHR', name: 'Cambodian Riel', flag: '🇰🇭' },
    { code: 'KID', name: 'Kiribati Dollar', flag: '🇰🇮' },
    { code: 'KMF', name: 'Comorian Franc', flag: '🇰🇲' },
    { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
    { code: 'KWD', name: 'Kuwaiti Dinar', flag: '🇰🇼' },
    { code: 'KYD', name: 'Cayman Islands Dollar', flag: '🇰🇾' },
    { code: 'KZT', name: 'Kazakhstani Tenge', flag: '🇰🇿' },
    { code: 'LAK', name: 'Lao Kip', flag: '🇱🇦' },
    { code: 'LBP', name: 'Lebanese Pound', flag: '🇱🇧' },
    { code: 'LKR', name: 'Sri Lankan Rupee', flag: '🇱🇰' },
    { code: 'LRD', name: 'Liberian Dollar', flag: '🇱🇷' },
    { code: 'LSL', name: 'Lesotho Loti', flag: '🇱🇸' },
    { code: 'LYD', name: 'Libyan Dinar', flag: '🇱🇾' },
    { code: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦' },
    { code: 'MDL', name: 'Moldovan Leu', flag: '🇲🇩' },
    { code: 'MGA', name: 'Malagasy Ariary', flag: '🇲🇬' },
    { code: 'MKD', name: 'Macedonian Denar', flag: '🇲🇰' },
    { code: 'MMK', name: 'Myanmar Kyat', flag: '🇲🇲' },
    { code: 'MNT', name: 'Mongolian Tögrög', flag: '🇲🇳' },
    { code: 'MOP', name: 'Macanese Pataca', flag: '🇲🇴' },
    { code: 'MRU', name: 'Mauritanian Ouguiya', flag: '🇲🇷' },
    { code: 'MUR', name: 'Mauritian Rupee', flag: '🇲🇺' },
    { code: 'MVR', name: 'Maldivian Rufiyaa', flag: '🇲🇻' },
    { code: 'MWK', name: 'Malawian Kwacha', flag: '🇲🇼' },
    { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
    { code: 'MYR', name: 'Malaysian Ringgit', flag: '🇲🇾' },
    { code: 'MZN', name: 'Mozambican Metical', flag: '🇲🇿' },
    { code: 'NAD', name: 'Namibian Dollar', flag: '🇳🇦' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'NIO', name: 'Nicaraguan Córdoba', flag: '🇳🇮' },
    { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
    { code: 'NPR', name: 'Nepalese Rupee', flag: '🇳🇵' },
    { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
    { code: 'OMR', name: 'Omani Rial', flag: '🇴🇲' },
    { code: 'PAB', name: 'Panamanian Balboa', flag: '🇵🇦' },
    { code: 'PEN', name: 'Peruvian Sol', flag: '🇵🇪' },
    { code: 'PGK', name: 'Papua New Guinean Kina', flag: '🇵🇬' },
    { code: 'PHP', name: 'Philippine Peso', flag: '🇵🇭' },
    { code: 'PKR', name: 'Pakistani Rupee', flag: '🇵🇰' },
    { code: 'PLN', name: 'Polish Złoty', flag: '🇵🇱' },
    { code: 'PYG', name: 'Paraguayan Guaraní', flag: '🇵🇾' },
    { code: 'QAR', name: 'Qatari Riyal', flag: '🇶🇦' },
    { code: 'RON', name: 'Romanian Leu', flag: '🇷🇴' },
    { code: 'RSD', name: 'Serbian Dinar', flag: '🇷🇸' },
    { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
    { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼' },
    { code: 'SAR', name: 'Saudi Riyal', flag: '🇸🇦' },
    { code: 'SBD', name: 'Solomon Islands Dollar', flag: '🇸🇧' },
    { code: 'SCR', name: 'Seychellois Rupee', flag: '🇸🇨' },
    { code: 'SDG', name: 'Sudanese Pound', flag: '🇸🇩' },
    { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'SHP', name: 'Saint Helena Pound', flag: '🇸🇭' },
    { code: 'SLE', name: 'Sierra Leonean Leone', flag: '🇸🇱' },
    { code: 'SLL', name: 'Sierra Leonean Leone', flag: '🇸🇱' },
    { code: 'SOS', name: 'Somali Shilling', flag: '🇸🇴' },
    { code: 'SRD', name: 'Surinamese Dollar', flag: '🇸🇷' },
    { code: 'SSP', name: 'South Sudanese Pound', flag: '🇸🇸' },
    { code: 'STN', name: 'São Tomé and Príncipe Dobra', flag: '🇸🇹' },
    { code: 'SYP', name: 'Syrian Pound', flag: '🇸🇾' },
    { code: 'SZL', name: 'Eswatini Lilangeni', flag: '🇸🇿' },
    { code: 'THB', name: 'Thai Baht', flag: '🇹🇭' },
    { code: 'TJS', name: 'Tajikistani Somoni', flag: '🇹🇯' },
    { code: 'TMT', name: 'Turkmenistani Manat', flag: '🇹🇲' },
    { code: 'TND', name: 'Tunisian Dinar', flag: '🇹🇳' },
    { code: 'TOP', name: 'Tongan Paʻanga', flag: '🇹🇴' },
    { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
    { code: 'TTD', name: 'Trinidad and Tobago Dollar', flag: '🇹🇹' },
    { code: 'TVD', name: 'Tuvaluan Dollar', flag: '🇹🇻' },
    { code: 'TWD', name: 'New Taiwan Dollar', flag: '🇹🇼' },
    { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { code: 'UAH', name: 'Ukrainian Hryvnia', flag: '🇺🇦' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'UYU', name: 'Uruguayan Peso', flag: '🇺🇾' },
    { code: 'UZS', name: 'Uzbekistani Som', flag: '🇺🇿' },
    { code: 'VES', name: 'Venezuelan Bolívar Soberano', flag: '🇻🇪' },
    { code: 'VND', name: 'Vietnamese Đồng', flag: '🇻🇳' },
    { code: 'VUV', name: 'Vanuatu Vatu', flag: '🇻🇺' },
    { code: 'WST', name: 'Samoan Tala', flag: '🇼🇸' },
    { code: 'XAF', name: 'Central African CFA Franc', flag: '🇨🇫' },
    { code: 'XCD', name: 'East Caribbean Dollar', flag: '🇪🇨' },
    { code: 'XDR', name: 'Special Drawing Rights', flag: '🏳️' },
    { code: 'XOF', name: 'West African CFA Franc', flag: '🇨🇫' },
    { code: 'XPF', name: 'CFP Franc', flag: '🇵🇫' },
    { code: 'YER', name: 'Yemeni Rial', flag: '🇾🇪' },
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
    { code: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲' },
    { code: 'ZWL', name: 'Zimbabwean Dollar', flag: '🇿🇼' },
];

const CurrencyExchangeCalculator = () => {
    const [amount, setAmount] = useState('');
    const [baseCurrency, setBaseCurrency] = useState('AUD');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [exchangeRate, setExchangeRate] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState('');
    const [liveRates, setLiveRates] = useState([]);
    const [liveBaseCurrency, setLiveBaseCurrency] = useState('AUD');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (baseCurrency && targetCurrency) {
            fetch(`${BASE_URL}/latest/${baseCurrency}`)
                .then(response => response.json())
                .then(data => {
                    if (data.conversion_rates) {
                        setExchangeRate(data.conversion_rates[targetCurrency]);
                    }
                })
                .catch(error => console.error('Error fetching exchange rate:', error));
        }
    }, [baseCurrency, targetCurrency]);

    useEffect(() => {
        if (liveBaseCurrency) {
            fetch(`${BASE_URL}/latest/${liveBaseCurrency}`)
                .then(response => response.json())
                .then(data => {
                    if (data.conversion_rates) {
                        setLiveRates(data.conversion_rates);
                    }
                })
                .catch(error => console.error('Error fetching live rates:', error));
        }
    }, [liveBaseCurrency]);

    useEffect(() => {
        handleConvert();
    }, [amount, exchangeRate]);

    const handleConvert = () => {
        if (amount && exchangeRate) {
            setConvertedAmount((amount * exchangeRate).toFixed(2));
        } else {
            setConvertedAmount('');
        }
    };

    const handleClear = () => {
        setAmount('');
        setConvertedAmount('');
    };

    const switchCurrencies = () => {
        const tempCurrency = baseCurrency;
        setBaseCurrency(targetCurrency);
        setTargetCurrency(tempCurrency);

        const tempAmount = amount;
        setAmount(convertedAmount);
        setConvertedAmount(tempAmount);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredRates = Object.keys(liveRates)
        .filter(currency => {
            const currencyName = currencyOptions.find(option => option.code === currency)?.name.toLowerCase() || '';
            return (
                currency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                currencyName.includes(searchQuery.toLowerCase())
            );
        })
        .reduce((obj, key) => {
            obj[key] = liveRates[key];
            return obj;
        }, {});

    return (
        <div className="converter-container">
            <div className="converter">
                <div className="input-group">
                    <div className="input-container">
                        <label>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>
                    <div className="input-container">
                        <label>From</label>
                        <select
                            value={baseCurrency}
                            onChange={(e) => setBaseCurrency(e.target.value)}
                        >
                            {currencyOptions.map(option => (
                                <option key={option.code} value={option.code}>
                                    {option.flag} {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="switch-container" onClick={switchCurrencies}>
                        <span className="switch-button">⇆</span>
                    </div>
                    <div className="input-container">
                        <label>To</label>
                        <select
                            value={targetCurrency}
                            onChange={(e) => setTargetCurrency(e.target.value)}
                        >
                            {currencyOptions.map(option => (
                                <option key={option.code} value={option.code}>
                                    {option.flag} {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-container">
                        <label>Converted Amount</label>
                        <input
                            type="text"
                            value={convertedAmount}
                            readOnly
                            placeholder="Converted amount"
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button className="convert-button" onClick={handleConvert}>Convert</button>
                    <button className="clear-button" onClick={handleClear}>Clear</button>
                </div>
            </div>

            <div className='separator'></div>

            <div>
                <h2 style={{ margin: '20px 0' }}>Live Exchange Rates</h2>
                <div className="live-rates">
                    <div className="live-rates-group">
                        <div className="live-rates-header">
                            <label>Base Currency:</label>
                            <select
                                value={liveBaseCurrency}
                                onChange={(e) => setLiveBaseCurrency(e.target.value)}
                            >
                                {currencyOptions.map(option => (
                                    <option key={option.code} value={option.code}>
                                        {option.flag} {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="search-container">
                            <label>Search:</label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearch}
                                placeholder="Search by currency code or name"
                            />
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="rates-table">
                            <thead>
                                <tr>
                                    <th>Currency</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filteredRates).map(currency => (
                                    <tr key={currency}>
                                        <td>
                                            {currencyOptions.find(option => option.code === currency)?.flag || ''} {currencyOptions.find(option => option.code === currency)?.name || currency}
                                        </td>
                                        <td>{filteredRates[currency].toFixed(4)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyExchangeCalculator;
