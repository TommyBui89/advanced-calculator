import React from 'react';
import { Typography, Row, Col, Statistic, Button } from 'antd';
import { Link } from 'react-router-dom';
import CryptoCurrencies from './CryptoCurrencies.js';
import { useGetCryptosQuery } from '../../services/CryptoApi.js';
import millify from 'millify';
import './CryptoPrices.css';

const { Title } = Typography;

const CryptoPrices = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <p>Loading...</p>;

  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Crypto Currencies" value={millify(globalStats.total)} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>

      <Title level={2} className="crypto-heading">Top 10 Crypto Currencies in the world</Title>
      <CryptoCurrencies simplified />

      <div className="show-more-container">
        <Link to="/crypto/cryptocurrencies">
          <Button type="primary" size="large">Show More</Button>
        </Link>
      </div>
    </>
  );
};

export default CryptoPrices;
