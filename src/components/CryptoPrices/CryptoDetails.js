import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Select, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, faChartBar, faBolt, faTrophy, faCoins, 
  faExchangeAlt, faCheck 
} from '@fortawesome/free-solid-svg-icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/CryptoApi.js';
import LineChart from './CryptoLineChart';
import millify from 'millify';
import './CryptoDetails.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <p>Loading...</p>;

  const stats = [
    { title: 'Price to USD', value: `$ ${millify(cryptoDetails.price)}`, icon: faDollarSign },
    { title: 'Rank', value: cryptoDetails.rank, icon: faChartBar },
    { title: '24h Volume', value: `$ ${millify(cryptoDetails['24hVolume'])}`, icon: faBolt },
    { title: 'Market Cap', value: `$ ${millify(cryptoDetails.marketCap)}`, icon: faCoins },
  ];

  const otherStats = [
    { title: 'All-time-high (avg.)', value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`, icon: faTrophy },
    { title: 'Number of Markets', value: cryptoDetails.numberOfMarkets, icon: faExchangeAlt },
    { title: 'Number of Exchanges', value: cryptoDetails.numberOfExchanges, icon: faExchangeAlt },
    { title: 'Approved Supply', value: cryptoDetails.approvedSupply ? 'Yes' : 'No', icon: faCheck },
  ];

  return (
    <div className="coin-detail-container">
      <div className="coin-header-container">
        <div className="coin-header">
          <img src={cryptoDetails.iconUrl} alt={cryptoDetails.name} className="coin-image" />
          <Title level={2} className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol})
          </Title>
        </div>
        <Select
          defaultValue="7d"
          className="select-timeperiod"
          onChange={(value) => setTimePeriod(value)}
        >
          {['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'].map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
      </div>

      <div className='separator'></div>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <div className="stats-description-row">
        <div className="description-column">
          <Title level={3}>What is {cryptoDetails.name}?</Title>
          <Paragraph>{cryptoDetails.description}</Paragraph>
        </div>

        <div className="stats-column">
          <Title level={3}>Value Statistics</Title>
          {stats.map(({ icon, title, value }) => (
            <Row className="coin-stat" key={title}>
              <Col className="coin-stat-name">
                <FontAwesomeIcon icon={icon} /> {title}
              </Col>
              <Col className="stat-value">{value}</Col>
            </Row>
          ))}
        </div>

        <div className="stats-column">
          <Title level={3}>Other Statistics</Title>
          {otherStats.map(({ icon, title, value }) => (
            <Row className="coin-stat" key={title}>
              <Col className="coin-stat-name">
                <FontAwesomeIcon icon={icon} /> {title}
              </Col>
              <Col className="stat-value">{value}</Col>
            </Row>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
