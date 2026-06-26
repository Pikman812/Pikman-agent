import React, { useState, useRef, useEffect } from 'react';

function ChatPanel({ messages, onSendMessage, loading }) {
  const [inputText, setInputText] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'ru-RU';
      
      recognition.onstart = () => {
        setIsVoiceActive(true);
      };
      
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
      };
      
      recognition.onend = () => {
        setIsVoiceActive(false);
      };
      
      recognition.start();
    } else {
      alert('🎤 Голосовой ввод не поддерживается вашим браузером');
    }
  };

  return (
    <div className="chat-panel">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h2>👋 Добро пожаловать в Pikman AI</h2>
            <p>Введи сообщение или нажми на микрофон для голосового ввода</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message message-${msg.role}`}>
              <div className="message-content">
                <p>{msg.text}</p>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="message message-assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <button 
          className="btn-icon"
          onClick={() => fileInputRef.current?.click()}
          title="Прикрепить файл"
        >
          📎
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <button 
          className={`btn-icon ${isVoiceActive ? 'active' : ''}`}
          onClick={handleVoiceInput}
          title="Голосовой ввод"
        >
          🎤
        </button>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Напиши сообщение или скажи что-то..."
          className="message-input"
        />
        <button 
          className="btn-send"
          onClick={handleSend}
          disabled={!inputText.trim() || loading}
        >
          ➤
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;
