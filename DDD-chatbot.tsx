import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen, Award, TrendingUp, MessageCircle, Lightbulb, Target, Maximize2, Minimize2, BarChart3, Clock, Flame, ListChecks } from 'lucide-react';

interface Message {
  id: number;
  type: 'bot' | 'user';
  content: string;
  timestamp: string;
}

interface UserStats {
  questionsAsked: number;
  topicsExplored: number;
  streakDays: number;
  achievementPoints: number;
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  action: string;
}

const EducationalChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your DDD Learning Assistant 🎓 I'm here to help you with your studies, track your progress, and make learning more engaging. What would you like to explore today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [userStats, setUserStats] = useState<UserStats>({
    questionsAsked: 12,
    topicsExplored: 8,
    streakDays: 7,
    achievementPoints: 240
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses: Record<string, string> = {
    'hello': "Hello! Welcome to DDD! I'm excited to help you learn today. What subject interests you most?",
    'help': "I can assist you with:\n• Explaining complex topics\n• Providing study tips\n• Tracking your learning progress\n• Suggesting resources\n• Motivating you to reach your goals\n\nWhat would you like help with?",
    'progress': `Great question! Here's your learning journey so far:\n• Questions asked: ${userStats.questionsAsked}\n• Topics explored: ${userStats.topicsExplored}\n• Current streak: ${userStats.streakDays} days\n• Achievement points: ${userStats.achievementPoints}\n\nKeep up the amazing work! 🌟`,
    'motivation': "You're doing fantastic! Remember, every question you ask and every topic you explore makes you smarter. Learning is a journey, not a destination. Keep that curiosity alive! 💪✨",
    'study tips': "Here are some proven study techniques:\n• Use the Pomodoro Technique (25 min focus + 5 min break)\n• Teach concepts to others (or explain them out loud)\n• Create visual mind maps\n• Practice active recall\n• Space out your learning sessions\n\nWhich technique would you like to try first?",
    'dashboard': "Your learning dashboard shows real-time insights about your progress! It tracks your engagement, identifies knowledge gaps, and celebrates your achievements. This gamified approach releases dopamine and makes learning addictive in the best way possible! 🎮📊"
  };

  const getResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(key)) {
        return response;
      }
    }
    
    if (lowercaseInput.includes('math') || lowercaseInput.includes('mathematics')) {
      return "Mathematics is fascinating! Whether you're working on algebra, calculus, geometry, or statistics, I can help break down complex problems into manageable steps. What specific math topic are you studying?";
    }
    
    if (lowercaseInput.includes('science') || lowercaseInput.includes('physics') || lowercaseInput.includes('chemistry') || lowercaseInput.includes('biology')) {
      return "Science opens up the mysteries of our universe! I love helping students understand scientific concepts through real-world examples and interactive explanations. Which science area interests you most?";
    }
    
    if (lowercaseInput.includes('english') || lowercaseInput.includes('literature') || lowercaseInput.includes('writing')) {
      return "Language and literature are powerful tools for expression and understanding! I can help with essay writing, literary analysis, grammar, or creative writing. What writing challenge are you facing?";
    }
    
    const defaultResponses = [
      "That's an interesting question! While I'd love to dive deeper into that specific topic, I can help you find the right resources and study strategies. What aspect would you like to explore first?",
      "Great curiosity! Learning happens best when we ask questions. Let me help you break this down into manageable pieces. Can you tell me more about what you're trying to understand?",
      "I appreciate you bringing this to me! Every question is a step forward in your learning journey. How can I best support your understanding of this topic?",
      "Excellent question! This shows you're thinking critically. While I may not have all the specific details, I can guide you toward the right learning approach. What's your current understanding of this topic?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setUserStats(prev => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1,
      topicsExplored: prev.topicsExplored + (Math.random() > 0.7 ? 1 : 0),
      achievementPoints: prev.achievementPoints + 10
    }));

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: getResponse(inputValue),
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions: QuickAction[] = [
    { icon: BookOpen, text: "Study Tips", action: "study tips" },
    { icon: TrendingUp, text: "My Progress", action: "progress" },
    { icon: Lightbulb, text: "Get Motivated", action: "motivation" },
    { icon: Target, text: "Set Goals", action: "I want to set learning goals" }
  ];

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  const dashboardMetrics = [
    {
      icon: <Clock size={16} />,
      title: "Watch Time",
      value: "12h 30m",
      change: "+5.4%",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ListChecks size={16} />,
      title: "Videos Completed",
      value: "36",
      change: "+8.2%",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <BarChart3 size={16} />,
      title: "Evaluation Completed",
      value: "59%",
      change: "+1.5%",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Flame size={16} />,
      title: "Current Streak",
      value: "7 Days",
      change: "🔥",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className={`bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-300 ${
      isMaximized ? 'fixed inset-0 z-50' : 'h-full'
    }`}>
      <div className={`flex h-full ${isMaximized ? 'max-w-none' : 'max-w-6xl mx-auto'}`}>
        {/* Sidebar with Stats */}
        <div className={`bg-white shadow-xl border-r border-slate-200 transition-all duration-300 ${
          isMaximized ? 'w-80' : 'w-72 md:w-80'
        } ${!isMaximized && 'hidden md:block'}`}>
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">DDD Assistant</h2>
                  <p className="text-sm text-slate-600">Learning Companion</p>
                </div>
              </div>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
          
          {/* Dashboard Metrics */}
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Dashboard Overview</h3>
            <div className="grid grid-cols-2 gap-2">
              {dashboardMetrics.map((metric, index) => (
                <div key={index} className={`bg-gradient-to-r ${metric.color} rounded-lg p-3 text-white`}>
                  <div className="flex items-center justify-between mb-1">
                    {metric.icon}
                    <span className="text-xs font-medium">{metric.change}</span>
                  </div>
                  <div className="text-lg font-bold">{metric.value}</div>
                  <div className="text-xs opacity-90">{metric.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* User Stats */}
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Learning Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Questions Asked</span>
                </div>
                <span className="text-lg font-bold text-slate-800">{userStats.questionsAsked}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-slate-700">Topics Explored</span>
                </div>
                <span className="text-lg font-bold text-slate-800">{userStats.topicsExplored}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">Achievement Points</span>
                </div>
                <span className="text-lg font-bold text-slate-800">{userStats.achievementPoints}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-slate-700">Learning Streak</span>
                </div>
                <span className="text-lg font-bold text-orange-600">{userStats.streakDays} days 🔥</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wide">Quick Actions</h3>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 group"
                >
                  <action.icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
                  <span className="text-slate-700 group-hover:text-indigo-700 font-medium">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800">DDD Learning Assistant</h1>
                  <p className="text-sm text-slate-600">Making learning engaging and dopamine-driven</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Online</span>
                </div>
                {!isMaximized && (
                  <button
                    onClick={() => setIsMaximized(true)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Maximize2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                  }`}>
                    {message.type === 'user' ? 
                      <User className="w-4 h-4 text-white" /> : 
                      <Bot className="w-4 h-4 text-white" />
                    }
                  </div>
                  <div className={`rounded-2xl p-4 max-w-md shadow-lg ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                      : 'bg-white border border-slate-200'
                  }`}>
                    <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-slate-200 p-4">
            <div className="flex space-x-3 max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your studies..."
                  className="w-full border border-slate-300 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none shadow-sm"
                  rows={1}
                  style={{ minHeight: '52px', maxHeight: '120px' }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-2xl px-6 py-3 transition-all duration-200 flex items-center justify-center shadow-lg disabled:shadow-none transform hover:scale-105 disabled:hover:scale-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-slate-500">Press Enter to send, Shift+Enter for new line</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationalChatbot;
