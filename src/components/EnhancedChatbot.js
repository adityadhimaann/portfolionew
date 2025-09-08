import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import axios from 'axios';

// Global styles for the chatbot
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0, -8px, 0); }
  70% { transform: translate3d(0, -4px, 0); }
  90% { transform: translate3d(0, -2px, 0); }
`;

const typing = keyframes`
  0% { transform: translateX(0px); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0px); }
`;

// Main container - can be positioned anywhere on a website
const ChatWidget = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})`
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  width: ${props => props.isOpen ? '400px' : '60px'};
  height: ${props => props.isOpen ? '600px' : '60px'};
  background: #ffffff;
  border-radius: ${props => props.isOpen ? '20px' : '50%'};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 999999 !important;
  top: auto !important;
  left: auto !important;
  transform: none !important;
  margin: 0 !important;
  padding: 0 !important;
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  transform: translateZ(0) !important;
  will-change: transform;
  isolation: isolate;
  clip: unset !important;
  clip-path: none !important;
  contain: none !important;
  max-width: 100vw !important;
  max-height: 100vh !important;
  pointer-events: auto !important;

  ${props => props.isOpen && css`
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(99, 102, 241, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  `}

  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '350px' : '60px'};
    height: ${props => props.isOpen ? '500px' : '60px'};
    bottom: 15px;
    right: 15px;
  }
`;

// Chat toggle button
const ChatToggle = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})`
  position: absolute;
  top: ${props => props.isOpen ? '15px' : '10px'};
  right: ${props => props.isOpen ? '15px' : '10px'};
  width: ${props => props.isOpen ? '30px' : '40px'};
  height: ${props => props.isOpen ? '30px' : '40px'};
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.isOpen ? '18px' : '24px'};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 10000;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);

  &:hover {
    background: linear-gradient(135deg, #5855f7, #7c3aed);
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
  }

  &:active {
    transform: scale(0.95);
  }

  ${props => !props.isOpen && css`
    animation: ${bounce} 2s infinite;
    &:hover {
      animation-play-state: paused;
    }
  `}
`;

// Chat header
const ChatHeader = styled.div`
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  padding: 20px 20px 20px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 45px;
  position: relative;
  flex-shrink: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    pointer-events: none;
  }
`;

const AvatarContainer = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  z-index: 1;
`;

const HeaderInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
`;

const BotName = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 2px;
`;

const BotStatus = styled.div`
  font-size: 12px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
  }
`;

// Messages container
const MessagesContainer = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(99, 102, 241, 0.5);
    }
  }
`;

const MessageGroup = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isUser',
})`
  display: flex;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 12px;
  animation: ${fadeIn} 0.3s ease;
`;

const MessageBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isUser',
})`
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  word-wrap: break-word;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.2s ease;

  ${props => props.isUser
    ? css`
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      `
    : css`
        background: #ffffff;
        color: #374151;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      `
  }

  /* Chat bubble tail */
  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    
    ${props => props.isUser
      ? css`
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-left-color: #6366f1;
      `
      : css`
        left: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-right-color: #ffffff;
      `
    }
  }

  /* Hover effect for interactive feel */
  &:hover {
    transform: translateY(-1px);
    box-shadow: ${props => props.isUser 
      ? '0 6px 16px rgba(99, 102, 241, 0.3)' 
      : '0 4px 12px rgba(0, 0, 0, 0.12)'};
  }
`;

const MessageTime = styled.span`
  font-size: 11px;
  opacity: 0.6;
  margin-top: 4px;
  display: block;
`;

// Typing indicator
const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 18px;
  max-width: 80px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  animation: ${fadeIn} 0.3s ease;
`;

const TypingDot = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'delay',
})`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6b7280;
  animation: ${typing} 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}ms;
`;

// Input area
const InputContainer = styled.div`
  padding: 15px 20px 20px;
  background: white;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const MessageInput = styled.textarea`
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.4;
  resize: none;
  max-height: 80px;
  min-height: 44px;
  background: #f9fafb;
  transition: all 0.2s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5855f7, #7c3aed);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.2);
  }
`;

// Welcome message
const WelcomeMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #6b7280;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
  border-radius: 15px;
  margin: 10px;
  border: 1px solid rgba(99, 102, 241, 0.1);
`;

const WelcomeTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #374151;
  font-size: 16px;
`;

const WelcomeText = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
`;

const QuickActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const QuickActionButton = styled.button`
  background: linear-gradient(135deg, #f8fafc, #e2e8f0);
  border: 1px solid #d1d5db;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: 12px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-color: #6366f1;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
`;

// Portal container for the chat widget
const ChatbotPortal = ({ children }) => {
  const [portalNode, setPortalNode] = useState(null);

  useEffect(() => {
    // Create a new div element for the portal
    let node = document.getElementById('chatbot-root');
    
    if (!node) {
      node = document.createElement('div');
      node.id = 'chatbot-root';
      node.style.position = 'fixed';
      node.style.zIndex = '999999';
      node.style.pointerEvents = 'none';
      node.style.top = '0';
      node.style.left = '0';
      node.style.width = '100%';
      node.style.height = '100%';
      node.style.overflow = 'visible';
      document.body.appendChild(node);
    }
    
    setPortalNode(node);
    
    // Clean up function
    return () => {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    };
  }, []);

  // Only render when we have a valid portal node
  return portalNode ? createPortal(children, portalNode) : null;
};

const EnhancedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Get backend URL from environment variable or use default
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'\;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (messageText) => {
    const textToSend = messageText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const newMessage = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: textToSend,
        session_id: 'chat_session_' + Date.now(),
      });

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickAction = (action) => {
    sendMessage(action);
  };

  const quickActions = [
    "Who is Aditya?",
    "Technical skills",
    "Projects",
    "Contact info"
  ];

  return (
    <ChatbotPortal>
      <GlobalStyle />
      <ChatWidget isOpen={isOpen}>
        <ChatToggle 
          isOpen={isOpen} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? '×' : '💬'}
        </ChatToggle>

        {isOpen && (
          <>
            <ChatHeader>
              <AvatarContainer>
                🤖
              </AvatarContainer>
              <HeaderInfo>
                <BotName>AdiDev Assistant</BotName>
                <BotStatus>
                  <StatusDot />
                  Online
                </BotStatus>
              </HeaderInfo>
            </ChatHeader>

            <MessagesContainer>
              {messages.length === 0 && (
                <WelcomeMessage>
                  <WelcomeTitle>👋 Hello! I'm AdiDev</WelcomeTitle>
                  <WelcomeText>
                    I'm here to help you learn about Aditya Kumar's background, skills, and projects. 
                    Ask me anything or try one of these:
                  </WelcomeText>
                  <QuickActions>
                    {quickActions.map((action, index) => (
                      <QuickActionButton
                        key={index}
                        onClick={() => handleQuickAction(action)}
                      >
                        {action}
                      </QuickActionButton>
                    ))}
                  </QuickActions>
                </WelcomeMessage>
              )}

              {messages.map((message) => (
                <MessageGroup key={message.id} isUser={message.isUser}>
                  <MessageBubble isUser={message.isUser}>
                    {message.text}
                    <MessageTime>
                      {formatTime(message.timestamp)}
                    </MessageTime>
                  </MessageBubble>
                </MessageGroup>
              ))}

              {isLoading && (
                <MessageGroup isUser={false}>
                  <TypingIndicator>
                    <TypingDot delay={0} />
                    <TypingDot delay={200} />
                    <TypingDot delay={400} />
                  </TypingIndicator>
                </MessageGroup>
              )}

              <div ref={messagesEndRef} />
            </MessagesContainer>

            <InputContainer>
              <InputWrapper>
                <MessageInput
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything about Aditya..."
                  rows={1}
                  disabled={isLoading}
                />
                <SendButton 
                  onClick={() => sendMessage()}
                  disabled={!inputMessage.trim() || isLoading}
                  aria-label="Send message"
                >
                  ➤
                </SendButton>
              </InputWrapper>
            </InputContainer>
          </>
        )}
      </ChatWidget>
    </ChatbotPortal>
  );
};

export default EnhancedChatbot;
