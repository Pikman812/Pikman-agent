import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './styles/App.css';
import ChatPanel from './components/ChatPanel';
import ControlPanel from './components/ControlPanel';
import PinScreen from './components/PinScreen';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePanel, setActivePanel] = useState('chat');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      connectWebSocket();
    }
  }, [isAuthenticated]);

  const connectWebSocket = () => {
    const newSocket = io('http://localhost:8000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('✅ WebSocket подключен');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ WebSocket отключен');
    });

    newSocket.on('message', (data) => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.message,
        timestamp: new Date().toLocaleTimeString()
      }]);
    });

    setSocket(newSocket);
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Добавить сообщение пользователя
    setMessages(prev => [...prev, {
      role: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setLoading(true);

    // Отправить на сервер
    fetch('http://localhost:8000/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, {
          role: 'assistant',
          text: data.agent_response,
          timestamp: new Date().toLocaleTimeString()
        }]);
      })
      .catch(err => console.error('Ошибка:', err))
      .finally(() => setLoading(false));
  };

  if (!isAuthenticated) {
    return <PinScreen onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🧠 Pikman AI</h1>
        <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '🟢 Подключено' : '🔴 Отключено'}
        </span>
        <nav className="nav">
          <button 
            className={`nav-btn ${activePanel === 'chat' ? 'active' : ''}`}
            onClick={() => setActivePanel('chat')}
          >
            💬 Чат
          </button>
          <button 
            className={`nav-btn ${activePanel === 'control' ? 'active' : ''}`}
            onClick={() => setActivePanel('control')}
          >
            ⚙️ Управление
          </button>
        </nav>
      </header>

      <main className="main">
        {activePanel === 'chat' && (
          <ChatPanel 
            messages={messages} 
            onSendMessage={handleSendMessage}
            loading={loading}
          />
        )}
        {activePanel === 'control' && (
          <ControlPanel />
        )}
      </main>
    </div>
  );
}

export default App;
