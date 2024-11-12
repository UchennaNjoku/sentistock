import React from 'react';

function StockInput({ symbol, setSymbol }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
}

export default StockInput;
