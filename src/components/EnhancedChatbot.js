import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';

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

// Backdrop overlay for mobile
const MobileBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999998;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  backdrop-filter: blur(2px);
  
  @media (min-width: 769px) {
    display: none;
  }
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
  max-width: calc(100vw - 40px) !important;
  max-height: calc(100vh - 40px) !important;
  pointer-events: auto !important;

  ${props => props.isOpen && css`
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(99, 102, 241, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  `}

    @media (max-width: 768px) {
    width: ${props => props.isOpen ? '85vw' : '50px'};
    height: ${props => props.isOpen ? '70vh' : '50px'};
    bottom: 15px;
    right: 15px;
    left: auto;
    max-width: 350px;
  }

  @media (max-width: 480px) {
    width: ${props => props.isOpen ? '90vw' : '50px'};
    height: ${props => props.isOpen ? '75vh' : '50px'};
    bottom: 10px;
    right: 10px;
    left: auto;
    max-width: 320px;
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

  // Add welcome message when chatbot first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        text: `🤖 **Hello! I'm Aditya's AI Assistant**

Welcome to Aditya Kumar's portfolio! I'm here to help you learn about his professional background, technical expertise, and career achievements.

**💡 Popular questions:**
• Who is Aditya and what does he do?
• What are his technical skills and expertise?
• What projects and experience does he have?
• How can I contact or hire Aditya?

**🎯 Quick tip:** Try the buttons below or ask me anything in natural language!

What would you like to know about Aditya? 😊`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Simple pattern-matching responses for the chatbot
  const getResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Personal information
    if (lowerMessage.includes('who is aditya') || lowerMessage.includes('about aditya') || lowerMessage.includes('who are you')) {
      return `👋 **About Aditya Kumar**

🚀 **Current Role:** Chief Technology Officer at Gromo (AWS Finarva AI 2025)

💡 **Professional Identity:**
• Passionate Software Developer & Tech Enthusiast
• Full-Stack Development Expert
• AI/ML Innovation Specialist
• Technical Leadership & Strategy

🌟 **Core Strengths:**
• Building scalable, innovative solutions
• Leading high-performance development teams
• Implementing cutting-edge technologies
• Contributing to open-source communities

🎯 **Mission:** Leveraging technology to solve complex real-world problems and drive digital transformation across industries.`;
    }
    
    // Technical skills
    if (lowerMessage.includes('technical skills') || lowerMessage.includes('skills') || lowerMessage.includes('technologies') || lowerMessage.includes('tech stack')) {
      return `🛠️ **Technical Expertise & Skills**

**Frontend Development:**
🔧 React.js, Next.js, Vue.js
🎨 TypeScript, JavaScript (ES6+)
💅 Tailwind CSS, Styled Components, SASS
� Responsive Design, PWAs

**Backend Development:**
⚡ Node.js, Express.js, Fastify
🐍 Python, Django, Flask
🔗 RESTful APIs, GraphQL
� Microservices Architecture

**Database Technologies:**
🍃 MongoDB, Mongoose
🐘 PostgreSQL, MySQL
📊 Redis, Firebase
🔍 Database Design & Optimization

**Cloud & DevOps:**
☁️ AWS (EC2, S3, Lambda, RDS)
🐳 Docker, Kubernetes
🔄 CI/CD Pipelines, GitHub Actions
📈 Infrastructure as Code

**AI/ML & Data Science:**
🤖 Machine Learning, Deep Learning
🧠 TensorFlow, PyTorch
📊 Data Analysis, NumPy, Pandas
🔮 Natural Language Processing

**Development Tools:**
📝 Git, GitHub, GitLab
🔧 VS Code, WebStorm
🧪 Jest, Cypress, Testing Libraries
📦 npm, yarn, Webpack, Vite

**Emerging Technologies:**
🌐 Web3, Blockchain basics
📱 React Native, Mobile Development
🎮 Three.js, WebGL`;
    }
    
    // Projects and Experience
    if (lowerMessage.includes('projects') || lowerMessage.includes('work') || lowerMessage.includes('portfolio') || lowerMessage.includes('experience')) {
      return `💼 **Professional Experience & Key Projects**

**🚀 Current: CTO at Gromo (AWS Finarva AI 2025)**
• Leading technical strategy and innovation
• Managing development teams and architecture decisions
• Implementing AI-driven solutions for fintech
• Scaling systems for high-performance applications

**🏢 Previous: SDE Intern at Larsen & Toubro**
• Gained valuable industry experience in enterprise software
• Worked on large-scale engineering projects
• Collaborated with cross-functional teams
• Implemented best practices in software development

**🤖 AI Innovation at SarvamAI**
• Building cutting-edge AI solutions
• Working on machine learning models
• Natural language processing projects
• Contributing to AI research and development

**🌐 Full-Stack Web Applications**
• E-commerce platforms with payment integration
• Real-time chat applications
• Portfolio websites and business solutions
• Dashboard and analytics tools

**📱 Mobile & Cross-Platform Projects**
• React Native mobile applications
• Progressive Web Apps (PWAs)
• Cross-platform solutions

**🔧 Key Technologies Used:**
React, Node.js, Python, AWS, MongoDB, PostgreSQL, Docker, AI/ML frameworks

**🎯 Impact:**
• Improved system performance by 40%+
• Led teams of 5+ developers
• Delivered 20+ successful projects
• Mentored junior developers`;
    }
    
    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('linkedin') || lowerMessage.includes('social')) {
      return `📞 **Contact Information & Social Links**

**📧 Professional Email:**
Use the contact form on this website for direct communication

**🔗 Professional Networks:**
• **LinkedIn:** Connect for professional opportunities
• **GitHub:** github.com/adityadhimaann - Check out my code repositories
• **Portfolio:** This website showcases my latest work

**🌐 Social Media:**
• **Instagram:** @adityadhimaann - Tech insights and updates
• **Twitter:** Follow for tech discussions and industry news

**💼 Freelance & Consulting:**
• **Fiverr:** Available for freelance projects
• **Upwork:** Custom software solutions
• **Direct Consulting:** Enterprise solutions and technical consulting

**⚡ Response Time:**
• Professional inquiries: Within 24 hours
• Collaboration opportunities: Same day response
• Technical consultations: Available for immediate discussion

**🤝 Open To:**
• Full-time opportunities
• Freelance projects
• Technical partnerships
• Speaking engagements
• Open source collaborations`;
    }
    
    // Career and Journey
    if (lowerMessage.includes('career') || lowerMessage.includes('journey') || lowerMessage.includes('background') || lowerMessage.includes('story')) {
      return `🚀 **Career Journey & Professional Growth**

**🎯 Current Chapter (2025)**
**Chief Technology Officer - Gromo (AWS Finarva AI)**
• Leading technical vision and strategy
• Driving AI innovation in fintech sector
• Managing scalable cloud infrastructure
• Building high-performance development teams

**📈 Professional Milestones:**

**🏗️ Enterprise Experience**
**SDE Intern - Larsen & Toubro**
• Gained exposure to large-scale engineering projects
• Worked with enterprise-grade software solutions
• Learned industry best practices and standards
• Collaborated with senior engineering teams

**🤖 AI & Innovation**
**Technical Contributor - SarvamAI**
• Contributing to cutting-edge AI research
• Developing machine learning solutions
• Working on NLP and deep learning projects
• Pushing boundaries of AI applications

**� Community Leadership**
**Google Cloud Developers Community (GDG Noida)**
• Active community member and contributor
• Organizing tech events and workshops
• Mentoring aspiring developers
• Promoting cloud technology adoption

**💡 Key Learning Philosophy:**
• Continuous learning and adaptation
• Staying updated with emerging technologies
• Contributing to open-source community
• Sharing knowledge through mentoring

**🎯 Future Vision:**
• Leading innovative AI solutions
• Building products that impact millions
• Fostering next-generation developers
• Creating sustainable technology solutions`;
    }
    
    // Education and Learning
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('university') || lowerMessage.includes('college') || lowerMessage.includes('learning')) {
      return `🎓 **Education & Continuous Learning**

**📚 Academic Foundation:**
• Strong background in Computer Science and Software Engineering
• Focus on algorithms, data structures, and system design
• Mathematics and statistics for AI/ML applications

**🏆 Professional Certifications:**
• AWS Cloud Practitioner & Solutions Architect
• Google Cloud Platform certifications
• MongoDB Developer certification
• Various technology-specific credentials

**📖 Continuous Learning Approach:**
• **Online Platforms:** Coursera, Udemy, Pluralsight
• **Technical Books:** Stay updated with latest programming paradigms
• **Tech Conferences:** Regular attendee of developer conferences
• **Workshops:** Hands-on learning sessions

**🔬 Self-Directed Learning:**
• Building personal projects to explore new technologies
• Contributing to open-source projects
• Experimenting with emerging frameworks
• Research in AI/ML and cutting-edge technologies

**🎯 Learning Philosophy:**
• Theory + Practical Application = Mastery
• Learning by teaching and mentoring others
• Staying curious and asking the right questions
• Adapting to rapidly evolving technology landscape

**📈 Current Focus Areas:**
• Advanced AI/ML techniques
• Cloud architecture and scalability
• Leadership and team management
• Product strategy and technical vision`;
    }
    
    // Location and Availability
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based') || lowerMessage.includes('timezone')) {
      return `📍 **Location & Availability**

**🏠 Primary Location:**
Lucknow, Uttar Pradesh, India
🕐 Timezone: IST (UTC +5:30)

**🌍 Work Style:**
• **Remote-First:** Experienced in distributed team collaboration
• **Hybrid-Friendly:** Comfortable with office and remote work
• **Global Collaboration:** Work across multiple timezones
• **Travel-Ready:** Available for client meetings and conferences

**⏰ Working Hours:**
• **Primary:** 9:00 AM - 6:00 PM IST
• **Flexible:** Available for global team coordination
• **Emergency Support:** 24/7 for critical projects
• **Weekend Projects:** Available for urgent deliverables

**🌐 Remote Collaboration Tools:**
• Video Conferencing: Zoom, Google Meet, Teams
• Project Management: Jira, Trello, Asana
• Communication: Slack, Discord, WhatsApp
• Code Collaboration: GitHub, GitLab, VS Code Live Share

**✈️ Travel Availability:**
• Domestic travel: Readily available
• International projects: Open to discussion
• Conference speaking: Enthusiastic participant
• Client meetings: Flexible scheduling`;
    }
    
    // Hiring and Opportunities
    if (lowerMessage.includes('hire') || lowerMessage.includes('opportunity') || lowerMessage.includes('job') || lowerMessage.includes('available') || lowerMessage.includes('freelance')) {
      return `💼 **Career Opportunities & Collaboration**

**🚀 Currently Open To:**

**Full-Time Positions:**
• CTO/VP Engineering roles
• Senior/Lead Developer positions
• Technical Architect roles
• AI/ML Engineering positions

**💡 Consulting & Freelance:**
• Technical consulting and architecture design
• Full-stack web application development
• AI/ML solution implementation
• Code review and technical auditing
• Team mentoring and training

**🤝 Collaboration Types:**
• **Short-term Projects:** 2-12 weeks
• **Long-term Partnerships:** 6+ months
• **Technical Advisory:** Ongoing consultation
• **Equity-based Startups:** Selective opportunities

**💰 Engagement Models:**
• Fixed-price projects
• Hourly consulting rates
• Retainer-based partnerships
• Equity + cash combinations

**🎯 Ideal Opportunities:**
• Innovative technology companies
• AI/ML-focused startups
• Fintech and enterprise solutions
• High-growth SaaS platforms
• Open-source contributions

**📋 What I Bring:**
• 5+ years of development experience
• Leadership and team management skills
• Full-stack technical expertise
• AI/ML implementation experience
• Scalable architecture design

**📞 Next Steps:**
Use the contact form on this website to discuss:
• Project requirements and scope
• Timeline and deliverables
• Budget and engagement terms
• Technical specifications`;
    }
    
    // Achievements and Recognition
    if (lowerMessage.includes('achievements') || lowerMessage.includes('awards') || lowerMessage.includes('recognition') || lowerMessage.includes('accomplishments')) {
      return `🏆 **Achievements & Professional Recognition**

**🎖️ Leadership Achievements:**
• **CTO Role at Young Age:** Leading technical strategy at Gromo
• **Team Building:** Successfully built and managed development teams
• **Technical Mentorship:** Guided 20+ junior developers
• **Community Leadership:** Active in GDG Noida community

**📈 Technical Accomplishments:**
• **System Performance:** Improved application performance by 40%+
• **Scalability:** Designed systems handling 100K+ concurrent users
• **Code Quality:** Maintained 95%+ test coverage across projects
• **Innovation:** Implemented AI solutions with measurable business impact

**🌟 Project Success Stories:**
• **Fintech Platform:** Led development of AWS-based financial application
• **E-commerce Solution:** Built scalable platform with payment integration
• **AI Implementation:** Deployed ML models improving user engagement by 30%
• **Open Source:** Contributed to popular GitHub repositories

**🎓 Certifications & Learning:**
• AWS Solutions Architect certification
• Google Cloud Platform credentials
• MongoDB Developer certification
• Continuous learning in emerging technologies

**🗣️ Speaking & Knowledge Sharing:**
• Technical workshops and seminars
• Code reviews and architecture discussions
• Mentoring sessions for aspiring developers
• Community tech talks and presentations

**📊 Measurable Impact:**
• Reduced deployment time by 60% through CI/CD implementation
• Decreased bug reports by 45% through comprehensive testing
• Improved team productivity by 35% through process optimization
• Achieved 99.9% uptime for production applications`;
    }
    
    // Technologies and Expertise Deep Dive
    if (lowerMessage.includes('expertise') || lowerMessage.includes('specialization') || lowerMessage.includes('advanced') || lowerMessage.includes('deep dive')) {
      return `🔬 **Deep Technical Expertise & Specializations**

**🎯 Core Specializations:**

**1. Full-Stack Architecture**
• **Frontend:** React ecosystem, state management, performance optimization
• **Backend:** Node.js, microservices, API design, security implementation
• **Database:** Schema design, query optimization, data modeling
• **Integration:** Third-party APIs, payment gateways, real-time systems

**2. AI/ML Implementation**
• **Machine Learning:** Supervised/unsupervised learning, model training
• **Deep Learning:** Neural networks, TensorFlow, PyTorch
• **NLP:** Text processing, sentiment analysis, chatbots
• **Computer Vision:** Image processing, object detection

**3. Cloud Architecture & DevOps**
• **AWS Services:** EC2, S3, Lambda, RDS, CloudFormation
• **Containerization:** Docker, Kubernetes, container orchestration
• **CI/CD:** Automated testing, deployment pipelines, monitoring
• **Infrastructure:** Scalable architecture, load balancing, security

**4. Performance Optimization**
• **Frontend:** Code splitting, lazy loading, caching strategies
• **Backend:** Database optimization, API performance, server tuning
• **System Design:** Scalability patterns, microservices, event-driven architecture
• **Monitoring:** Application metrics, error tracking, performance monitoring

**🛠️ Advanced Technical Skills:**
• **Security:** Authentication, authorization, encryption, security auditing
• **Testing:** Unit, integration, e2e testing, test automation
• **Documentation:** Technical writing, API documentation, code comments
• **Code Review:** Best practices, performance analysis, security assessment

**📚 Research & Innovation:**
• Staying current with emerging technologies
• Experimenting with new frameworks and tools
• Contributing to open-source projects
• Publishing technical articles and insights`;
    }
    
    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
      return `👋 **Hello there! Welcome to Aditya's Portfolio!**

I'm thrilled you're here! I'm Aditya's AI assistant, designed to help you learn more about his professional journey, technical expertise, and accomplishments.

**🤖 What I can help you with:**

**📋 Quick Topics:**
• **"Who is Aditya?"** - Personal and professional background
• **"Technical skills"** - Complete technology stack and expertise
• **"Projects"** - Professional experience and key projects
• **"Contact info"** - How to reach out and connect

**� Detailed Information:**
• **Career journey** - Professional growth and milestones
• **Education** - Learning background and certifications
• **Achievements** - Recognition and accomplishments
• **Opportunities** - Hiring and collaboration possibilities

**💡 Try asking me:**
• "What are Aditya's technical skills?"
• "Tell me about his career journey"
• "How can I contact Aditya?"
• "What projects has he worked on?"

Feel free to ask anything about Aditya's background, skills, or experience. I'm here to provide comprehensive and helpful information! 

What would you like to know first? 😊`;
    }
    
    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks') || lowerMessage.includes('appreciate')) {
      return `🙏 **You're absolutely welcome!**

I'm delighted I could help you learn more about Aditya Kumar! 

**📞 Ready to connect?**
If you found the information helpful and want to:
• **Discuss a project or opportunity**
• **Schedule a technical consultation** 
• **Explore collaboration possibilities**
• **Ask more detailed questions**

Please use the **contact form** on this website to reach out directly to Aditya.

**🤝 What happens next?**
• Professional inquiries get responses within 24 hours
• Technical discussions can be scheduled same-day
• Project consultations include detailed proposals
• Collaboration opportunities receive priority attention

**💡 More questions?**
Feel free to ask me anything else about:
• Technical expertise and specializations
• Career background and achievements  
• Project experience and case studies
• Availability and engagement options

I'm here to help! What else would you like to know? 😊`;
    }
    
    // Help and Commands
    if (lowerMessage.includes('help') || lowerMessage.includes('commands') || lowerMessage.includes('what can you do')) {
      return `🤖 **AI Assistant Help & Available Commands**

**📋 Main Information Categories:**

**🧑‍💼 Personal & Professional:**
• "Who is Aditya?" - Complete professional profile
• "About Aditya" - Background and current role
• "Career journey" - Professional growth timeline

**💻 Technical Information:**
• "Technical skills" - Complete technology stack
• "Expertise" - Deep dive into specializations
• "Technologies" - Frameworks, tools, and platforms

**💼 Work & Projects:**
• "Projects" - Professional experience and key work
• "Experience" - Career milestones and achievements
• "Accomplishments" - Recognition and success stories

**📞 Contact & Opportunities:**
• "Contact info" - How to reach out and connect
• "Hire" - Opportunities for collaboration
• "Available" - Current availability and engagement

**🎓 Education & Growth:**
• "Education" - Learning background and certifications
• "Learning" - Continuous education approach

**📍 Location & Logistics:**
• "Location" - Where Aditya is based
• "Timezone" - Availability and working hours

**💡 Pro Tips:**
• Ask specific questions for detailed answers
• Combine topics: "Aditya's AI projects and experience"
• Request examples: "Show me Aditya's technical achievements"
• Be conversational - I understand natural language!

**🔄 Quick Actions:**
• Type "hello" for a warm welcome
• Say "thanks" for closing remarks
• Ask "help" anytime for this guide

What would you like to explore first? 🚀`;
    }
    
    // Default response with helpful suggestions
    return `🤔 **Interesting question! Let me help you find what you're looking for.**

I'm designed to share comprehensive information about **Aditya Kumar** and his professional expertise. Here are some popular topics I can help with:

**🎯 Most Requested Information:**
• **"Who is Aditya?"** - Complete professional overview
• **"Technical skills"** - Full technology stack and expertise  
• **"Projects and experience"** - Career highlights and key work
• **"Contact information"** - How to reach out and connect

**💡 Try asking about:**
• Professional background and current role
• Programming languages and frameworks
• Career journey and achievements
• Education and certifications
• Availability for opportunities
• Location and working arrangements

**🔍 Specific Topics:**
• AI/ML expertise and projects
• Full-stack development experience
• Cloud architecture and DevOps
• Leadership and team management
• Freelance and consulting services

**📝 Example Questions:**
• "What technologies does Aditya work with?"
• "Tell me about his role at Gromo"
• "How can I hire Aditya for a project?"
• "What's his experience with AI and machine learning?"

Feel free to ask anything about Aditya's professional background, technical skills, or career opportunities! I'm here to provide detailed, helpful information. 😊

What specific aspect would you like to know more about?`;
  };

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
      // Simulate a natural delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      const response = getResponse(textToSend);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try asking about my skills, experience, or projects!",
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
    "Projects and experience",
    "Contact info",
    "Career journey",
    "Hire Aditya"
  ];

  return (
    <ChatbotPortal>
      <GlobalStyle />
      <MobileBackdrop 
        isOpen={isOpen} 
        onClick={() => setIsOpen(false)}
      />
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
