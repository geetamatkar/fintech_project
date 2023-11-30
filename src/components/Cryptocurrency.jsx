import React from 'react';
import { binancec, bitcoin, etherium } from '../assets';
import { Link } from 'react-router-dom';

const Cryptocurrency = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {/* Bitcoin */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Bitcoin (BTC)</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={bitcoin}
          alt="Bitcoin"
        />
          <p className="text-gray-700 text-base">
            Bitcoin is the first and most well-known cryptocurrency, often considered a digital gold.
          </p>
          <ul className="list-disc list-inside">
            <li>Current Value: $60,000 per BTC</li>
            <li>Historical High: $64,000</li>
            <li>Potential for high returns on investment</li>
          </ul>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
        <Link to="/cryptoform">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Invest Now
          </button>
        </Link>
        </div>
      </div>

      {/* Ethereum */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Ethereum (ETH)</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={etherium}
          alt="Etherium"
        />
          <p className="text-gray-700 text-base">
            Ethereum is a decentralized platform for building smart contracts and decentralized applications.
          </p>
          <ul className="list-disc list-inside">
            <li>Current Value: $2,500 per ETH</li>
            <li>Historical High: $4,000</li>
            <li>Participation in decentralized finance (DeFi) ecosystem</li>
          </ul>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
        <Link to="/cryptoform">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Invest Now
          </button>
        </Link>
        </div>
      </div>

      {/* Binance Coin */}
      <div className="max-w-sm m-4 bg-white rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Binance Coin (BNB)</div>
          <img
          className="w-full h-30 object-cover"
          style={{ padding: '10px' }} 
          src={binancec}
          alt="Binance"
        />
          <p className="text-gray-700 text-base">
            Binance Coin is the native cryptocurrency of the Binance exchange, used for trading fee discounts.
          </p>
          <ul className="list-disc list-inside">
            <li>Current Value: $350 per BNB</li>
            <li>Historical High: $400</li>
            <li>Utility for transaction fee discounts on Binance</li>
          </ul>
        </div>
        <div className="px-6 py-4 flex justify-center items-center">
        <Link to="/cryptoform">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Invest Now
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Cryptocurrency;
