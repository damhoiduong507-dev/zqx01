
import React, { useState, useRef, useEffect } from 'react';
import { chatWithConsultant } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ConsultantChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ConsultantChat: React.FC<ConsultantChatProps> = ({ isOpen, setIsOpen }) => {
  // Fix: Removed local isOpen state in favor of props to allow external control
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '您好！我是您的专属建站顾问。关于公司官网建设，您目前最关心哪个环节？' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const response = await chatWithConsultant(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我刚才走神了，请再说一遍。' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="fas fa-robot text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">CorpWeb 咨询助手</h4>
                <p className="text-[10px] text-blue-100">在线为您规划蓝图</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="输入您想咨询的问题..."
              className="flex-1 text-sm bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-slate-800 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-xl`}></i>
      </button>
    </div>
  );
};

export default ConsultantChat;
