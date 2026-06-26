import React, { useState } from 'react';

function ControlPanel() {
  const [hostings, setHostings] = useState([]);
  const [registering, setRegistering] = useState(false);
  const [improvementLog, setImprovementLog] = useState([]);

  const handleFetchHostings = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/hostings');
      const data = await res.json();
      setHostings(data.hostings);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const handleRegisterHostings = async () => {
    setRegistering(true);
    try {
      const res = await fetch('http://localhost:8000/api/register-hostings', {
        method: 'POST'
      });
      const data = await res.json();
      setImprovementLog(prev => [...prev, `📝 ${data.message}`]);
      setTimeout(handleFetchHostings, 5000);
    } catch (err) {
      console.error('Ошибка:', err);
      setImprovementLog(prev => [...prev, `❌ Ошибка при регистрации`]);
    } finally {
      setRegistering(false);
    }
  };

  const handleSelfImprove = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/self-improve', {
        method: 'POST'
      });
      const data = await res.json();
      setImprovementLog(prev => [
        ...prev,
        `🧬 Самоулучшение: ${data.message}`,
        ...data.improvements
      ]);
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>⚙️ Управление</h3>
        <div className="button-group">
          <button className="btn-control" onClick={handleFetchHostings}>
            ☁️ Показать хостинги
          </button>
          <button 
            className="btn-control" 
            onClick={handleRegisterHostings}
            disabled={registering}
          >
            {registering ? '⏳ Регистрация...' : '🔐 Зарегистрироваться'}
          </button>
          <button className="btn-control" onClick={handleSelfImprove}>
            🧬 Самоулучшение
          </button>
          <button className="btn-control">
            🌐 Открыть браузер
          </button>
          <button className="btn-control">
            🖥️ Консоль
          </button>
        </div>
      </div>

      <div className="control-section">
        <h3>☁️ Облачные хостинги</h3>
        {hostings.length === 0 ? (
          <p>Нажми кнопку выше, чтобы загрузить список</p>
        ) : (
          <div className="hostings-list">
            {hostings.map((hosting, idx) => (
              <div key={idx} className="hosting-item">
                <span className="hosting-name">{hosting.name}</span>
                <span className={`hosting-status ${hosting.status}`}>
                  {hosting.status === 'connected' ? '🟢' : '🟡'} {hosting.status}
                </span>
                <span className="hosting-resources">{hosting.resources}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="control-section">
        <h3>🧬 Логи самоулучшения</h3>
        <div className="improvement-log">
          {improvementLog.length === 0 ? (
            <p>Логи будут отображены здесь</p>
          ) : (
            improvementLog.map((log, idx) => (
              <p key={idx} className="log-entry">{log}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
