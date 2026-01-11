
import React, { useState } from 'react';
import { ROADMAP_DATA } from './constants';
import StepCard from './components/StepCard';
import AIArchitect from './components/AIArchitect';
import ConsultantChat from './components/ConsultantChat';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  // Fix: Added state to control the visibility of the global chat assistant
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTool = () => {
    document.getElementById('ai-tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 relative">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-morphism border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
              <i className="fas fa-cube"></i>
            </div>
            <span className="text-xl font-bold tracking-tight">CorpWeb <span className="text-blue-600">Architect</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#roadmap" className="hover:text-blue-600 transition-colors">五步法流程</a>
            <a href="#ai-tool" className="hover:text-blue-600 transition-colors">AI 规划工具</a>
            <a href="#best-practices" className="hover:text-blue-600 transition-colors">最佳实践</a>
          </nav>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            开始咨询
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Hero Section */}
        <section className="text-center mb-20 animate-in fade-in duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            打造卓越的<span className="gradient-text">企业官网</span><br />
            从未如此简单
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            从战略分析到技术落地，我们为您提供全方位的建站导航。
            利用 AI 技术，在几分钟内生成属于您的网站蓝图与视觉参考。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <button 
               onClick={scrollToTool}
               className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-200 active:scale-95 flex items-center gap-2"
             >
               <i className="fas fa-bolt"></i> 立即开始规划
             </button>
             <a 
               href="#roadmap"
               className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
             >
               了解建站流程
             </a>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="mb-24 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">建站五步法</h2>
              <p className="text-slate-500">点击下方步骤查看详细任务清单，步步为营</p>
            </div>
            <div className="flex items-center gap-4">
               <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">标准化流程</span>
               <span className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">高成功率</span>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {ROADMAP_DATA.map((step) => (
              <StepCard 
                key={step.id} 
                step={step} 
                isActive={activeStep === step.id}
                onClick={() => setActiveStep(step.id)}
              />
            ))}
          </div>
        </section>

        {/* AI Tool Section */}
        <section id="ai-tool" className="mb-24 scroll-mt-24">
           <AIArchitect />
        </section>

        {/* FAQ/Resources Grid */}
        <section id="best-practices" className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-blue-900 text-white rounded-3xl relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-3">为什么需要官网？</h3>
              <p className="text-blue-100/80 text-sm leading-relaxed mb-6">官网不仅是门面，更是信任的基石。在数字化时代，一个专业的响应式网站是 B2B 获客与品牌出海的终极武器。</p>
              <button className="text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                了解更多 <i className="fas fa-arrow-right"></i>
              </button>
            </div>
            <i className="fas fa-rocket text-9xl absolute -bottom-4 -right-4 text-white/10 rotate-12 group-hover:scale-125 transition-transform duration-1000"></i>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl group hover:shadow-xl transition-all duration-300">
             <h3 className="text-xl font-bold mb-3">建站需要多少钱？</h3>
             <p className="text-slate-500 text-sm leading-relaxed mb-6">价格取决于功能与交互。从几千元的模版站到十几万甚至百万级的定制站，合理规划需求是节省预算的关键路径。</p>
             <button className="text-blue-600 text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                获取预算指南 <i className="fas fa-arrow-right"></i>
             </button>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl group hover:shadow-xl transition-all duration-300">
             <h3 className="text-xl font-bold mb-3">如何提升转化率？</h3>
             <p className="text-slate-500 text-sm leading-relaxed mb-6">首屏加载速度、极简的导航结构、真实的客户案例是提升转化的三大黄金法则。AI 可以助您快速优化内容。</p>
             <button className="text-blue-600 text-sm font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                查看优化技巧 <i className="fas fa-arrow-right"></i>
             </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="flex justify-center gap-6 mb-8 text-slate-400">
             <a href="#" className="hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-weixin"></i></a>
             <a href="#" className="hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-linkedin"></i></a>
             <a href="#" className="hover:text-blue-600 transition-colors text-2xl"><i className="fab fa-github"></i></a>
           </div>
           <p className="text-slate-500 text-sm">&copy; 2024 CorpWeb Architect. 专业企业建站导航工具.</p>
           <p className="text-slate-400 text-[10px] mt-2 italic">Powered by Gemini 3 Flash & 2.5 Flash Image</p>
        </div>
      </footer>

      {/* Global AI Chat */}
      <ConsultantChat isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default App;
