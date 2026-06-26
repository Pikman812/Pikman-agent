import React, { useState } from 'react';

function PinScreen({ onAuthenticate }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const DEFAULT_PIN = '1234';

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(value);
    setError('');
  };

  const handleSubmit = () => {
    if (pin === DEFAULT_PIN) {
      onAuthenticate();
    } else {
      setError('❌ Неверный ПИН-код');
      setPin('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="pin-screen">
      <div className="pin-container">
        <h1>🧠 Pikman AI</h1>
        <p>Введи ПИН-код для входа</p>
        
        <div className="pin-input-group">
          <input
            type="password"
            value={pin}
            onChange={handlePinChange}
            onKeyPress={handleKeyPress}
            placeholder="••••"
            maxLength="4"
            className="pin-input"
            autoFocus
          />
          <div className="pin-dots">
            {[...Array(4)].map((_, i) => (
              <span key={i} className={`dot ${i < pin.length ? 'filled' : ''}`}></span>
            ))}
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button 
          onClick={handleSubmit}
          className="btn-primary"
          disabled={pin.length < 4}
        >
          Войти
        </button>

        <div className="pin-info">
          <p>📝 ПИН по умолчанию: <strong>1234</strong></p>
          <p>Измени в Настройках → Безопасность</p>
        </div>
      </div>
    </div>
  );
}

export default PinScreen;
