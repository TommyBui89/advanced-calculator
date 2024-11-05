import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useGetCryptosQuery } from '../../services/CryptoApi.js';
import millify from 'millify';
import './CryptoCurrencies.css';

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching, error } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Filter the data when search term changes
  useEffect(() => {
    if (cryptosList?.data?.coins) {
      const filteredData = cryptosList.data.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Failed to load cryptocurrencies. Please try again later.</p>;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.length > 0 ? (
          cryptos.map((currency) => (
            <Col xs={24} key={currency.uuid}>
              <Link to={`/crypto/${currency.uuid}`}>
                <Card className="crypto-card" hoverable>
                  <div className="crypto-card-title">
                    <div className="crypto-card-title">
                      <div className="crypto-info">
                        <img
                          className="crypto-image"
                          src={currency.iconUrl}
                          alt={currency.name}
                        />
                        <span>{currency.rank}. {currency.name}</span>
                      </div>
                    </div>
                  </div>
                  <div className="crypto-card-content">
                    <p>Price: ${millify(currency.price)}</p>
                    <p>Market Cap: ${millify(currency.marketCap)}</p>
                    <p>Daily Change: {currency.change}%</p>
                  </div>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p>No cryptocurrencies found. Please try a different search term.</p>
        )}
      </Row>
      {/* Hide "Show More" button if already on /crypto/cryptocurrencies route */}
      {!simplified && location.pathname !== '/crypto/cryptocurrencies' && (
        <div className="show-more-container">
          <button
            className="show-more-button"
            onClick={() => navigate('/crypto/cryptocurrencies')}
          >
            Show More
          </button>
        </div>
      )}
    </>
  );
};

export default CryptoCurrencies;
