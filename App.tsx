
import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { SERVICES_DATA, CASES_DATA, NEWS_DATA, ROADMAP_DATA } from './constants';
import AIArchitect from './components/AIArchitect';
import ConsultantChat from './components/ConsultantChat';
import StepCard from './components/StepCard';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRoadmap, setActiveRoadmap] = useState(1);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 导航渲染辅助
  const NavLink = ({ type, label }: { type: PageType; label: string }) => (
    <button
      onClick={() => { setCurrentPage(type); window.scrollTo(0, 0); }}
      className={`relative py-2 text-sm font-bold transition-all hover:text-blue-600 ${
        currentPage === type ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600' : 'text-slate-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-cubes text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-800 tracking-tight leading-none">中企销数字化</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ZHONGQIXIAO DIGITAL</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <NavLink type="home" label="首页" />
            <NavLink type="services" label="产品服务" />
            <NavLink type="cases" label="成功案例" />
            <NavLink type="news" label="新闻动态" />
            <NavLink type="about" label="关于我们" />
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col text-right mr-4 border-r pr-4 border-slate-200">
              <span className="text-xs text-slate-400 font-bold">咨询热线</span>
              <span className="text-lg font-black text-blue-700">400-888-9999</span>
            </div>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
            >
              立刻免费建站咨询
            </button>
          </div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="flex-grow pt-20">
        
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-700">
            {/* Home Hero */}
            <section className="relative h-[650px] flex items-center overflow-hidden bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
                className="absolute inset-0 w-full h-full object-cover opacity-40" 
                alt="Banner"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
              <div className="relative max-w-7xl mx-auto px-4 z-10 text-white">
                <div className="max-w-2xl space-y-8">
                  <span className="inline-block px-4 py-1 rounded bg-blue-600 text-xs font-black tracking-widest uppercase">2024 AI 数字化赋能</span>
                  <h1 className="text-5xl md:text-7xl font-black leading-tight">
                    懂营销，更懂转化<br />
                    <span className="text-blue-400">中企级</span>建站标准
                  </h1>
                  <p className="text-xl text-slate-300 leading-relaxed font-light">
                    超过 10,000+ 企业信赖的选择，从品牌网站到营销矩阵，AI 驱动全链路增长。
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setCurrentPage('services')} className="bg-white text-blue-900 px-10 py-4 rounded font-bold hover:bg-blue-50 transition-colors">业务体系</button>
                    <button onClick={() => setIsChatOpen(true)} className="border-2 border-white/30 text-white px-10 py-4 rounded font-bold hover:bg-white/10 transition-colors">咨询顾问</button>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Architect Integration */}
            <section className="py-24 bg-slate-50">
              <div className="max-w-6xl mx-auto px-4">
                <AIArchitect />
              </div>
            </section>

            {/* Home Services Preview */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 text-center mb-16">
                <h2 className="text-3xl font-black text-slate-900 mb-2">我们的核心业务</h2>
                <div className="w-12 h-1 bg-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-500">提供一站式全网数字化解决方案</p>
              </div>
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
                {SERVICES_DATA.map(s => (
                  <div key={s.id} className="group p-8 border border-slate-100 rounded-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-slate-50 text-blue-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <i className={`fas ${s.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded uppercase font-bold">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'services' && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <section className="bg-slate-100 py-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-black text-slate-900 mb-4">产品服务</h1>
                <p className="text-slate-500">深度挖掘行业痛点，定制化打造数字化武器</p>
              </div>
            </section>
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">
                {SERVICES_DATA.map(s => (
                  <div key={s.id} className="flex gap-8 p-10 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                    <div className="flex-shrink-0 w-20 h-20 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center text-4xl">
                      <i className={`fas ${s.icon}`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                      <p className="text-slate-500 mb-6 leading-relaxed">{s.desc} 结合最新的 AI 技术与搜索引擎优化策略，确保您的线上业务从起步就具备竞争优势。</p>
                      <ul className="space-y-2">
                        {s.tags.map(t => (
                          <li key={t} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <i className="fas fa-check-double text-blue-500"></i> {t}
                          </li>
                        ))}
                      </ul>
                      <button className="mt-8 text-blue-600 font-bold hover:underline flex items-center gap-2">
                        了解详情 <i className="fas fa-arrow-right text-xs"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'cases' && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <section className="bg-blue-900 py-20 text-white">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-black mb-4">成功案例</h1>
                <p className="text-blue-200">见证每一次数字化转型的成功蜕变</p>
              </div>
            </section>
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center gap-6 mb-16">
                  {['全部', '工业制造', '生物医疗', '电子商务', '智慧建筑'].map(cat => (
                    <button key={cat} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${cat === '全部' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {CASES_DATA.map(c => (
                    <div key={c.id} className="group relative overflow-hidden rounded-2xl bg-slate-900 aspect-[4/3]">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-60 transition-all duration-700" />
                      <div className="absolute inset-0 flex flex-col justify-end p-8 text-white translate-y-4 group-hover:translate-y-0 transition-all">
                        <span className="text-xs font-bold text-blue-400 mb-2">{c.category}</span>
                        <h3 className="text-xl font-bold mb-1">{c.title}</h3>
                        <p className="text-sm text-slate-300 mb-4">{c.company}</p>
                        <button className="w-fit text-xs font-bold bg-white text-slate-900 px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-all">查看详情</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPage === 'news' && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <section className="bg-slate-100 py-20">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-black text-slate-900 mb-4">新闻动态</h1>
                <p className="text-slate-500">关注行业趋势，掌握数字化前沿资讯</p>
              </div>
            </section>
            <section className="py-24">
              <div className="max-w-4xl mx-auto px-4 space-y-12">
                {NEWS_DATA.map(n => (
                  <div key={n.id} className="flex flex-col md:flex-row gap-8 items-center group cursor-pointer">
                    <div className="w-full md:w-64 h-44 overflow-hidden rounded-xl shadow-lg">
                      <img src={n.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={n.title} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 text-xs font-bold text-blue-600 mb-3">
                        <span>{n.date}</span>
                        <span className="w-1 h-1 bg-blue-300 rounded-full"></span>
                        <span className="text-slate-400">行业资讯</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{n.title}</h3>
                      <p className="text-slate-500 leading-relaxed line-clamp-2 mb-4">{n.summary}</p>
                      <button className="text-sm font-black flex items-center gap-2 text-slate-900 group-hover:gap-4 transition-all uppercase tracking-widest">
                        Read More <i className="fas fa-arrow-right-long"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'about' && (
          <div className="animate-in slide-in-from-bottom-10 duration-500">
            <section className="relative h-[400px] flex items-center justify-center bg-slate-900 text-white">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30" alt="About" />
              <div className="relative z-10 text-center">
                <h1 className="text-5xl font-black mb-4">关于中企销</h1>
                <p className="text-blue-300 tracking-[0.2em] uppercase font-bold">About Zhongqixiao Digital</p>
              </div>
            </section>

            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                  <div className="inline-block h-1 w-20 bg-blue-600"></div>
                  <h2 className="text-4xl font-black text-slate-900 leading-tight">致敬每一个在数字化浪潮中<br /><span className="text-blue-600">勇往直前</span>的企业</h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    中企销数字化（Zhongqixiao Digital）成立于 2010 年，是国内领先的企业级数字化解决方案供应商。我们深耕建站、营销、系统集成领域十余年，累计服务超过万家知名品牌。
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    在 AI 时代，我们率先引入 Gemini 顶级智能模型，重构建站工作流，不仅提升了交付速度，更通过 AI 数据分析大幅增强了网站的商业转化能力。
                  </p>
                  <div className="grid grid-cols-3 gap-8 pt-8">
                    <div>
                      <div className="text-4xl font-black text-blue-700 mb-2">14+</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">年行业深耕</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-blue-700 mb-2">10k+</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">合作客户</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-blue-700 mb-2">150+</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">核心技术专家</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Office" />
                  </div>
                  <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs border border-slate-100">
                    <p className="text-slate-800 font-bold italic">“我们的目标不是做一个美观的网站，而是做一个能为客户赚钱的数字化引擎。”</p>
                    <p className="text-blue-600 font-black mt-4">— 李明, CEO</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 text-white mb-8">
                <i className="fas fa-cubes text-3xl text-blue-500"></i>
                <span className="text-2xl font-black">中企销数字化</span>
              </div>
              <p className="text-sm leading-relaxed mb-8">专业企业建站、全网营销、数字化转型专家。以 AI 技术赋能企业未来。</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><i className="fab fa-weixin"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><i className="fab fa-weibo"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">产品服务</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition-colors">高端定制建站</a></li>
                <li><a href="#" onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition-colors">营销型网站设计</a></li>
                <li><a href="#" onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition-colors">外贸推广服务</a></li>
                <li><a href="#" onClick={() => setCurrentPage('services')} className="hover:text-blue-400 transition-colors">小程序/App开发</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">帮助与支持</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" onClick={() => setCurrentPage('news')} className="hover:text-blue-400 transition-colors">行业资讯</a></li>
                <li><a href="#" onClick={() => setCurrentPage('cases')} className="hover:text-blue-400 transition-colors">客户见证</a></li>
                <li><a href="#" onClick={() => setCurrentPage('about')} className="hover:text-blue-400 transition-colors">关于我们</a></li>
                <li><a href="#" onClick={() => setIsChatOpen(true)} className="hover:text-blue-400 transition-colors">在线咨询</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">联系我们</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-4"><i className="fas fa-map-marker-alt text-blue-500"></i> 上海市浦东新区张江高科技园区 888 号 AI 智谷 B 座</li>
                <li className="flex gap-4"><i className="fas fa-phone-alt text-blue-500"></i> 400-888-9999</li>
                <li className="flex gap-4"><i className="fas fa-envelope text-blue-500"></i> info@zhongqixiao.cn</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold tracking-widest uppercase">
            <p>&copy; 2024 ZHONGQIXIAO DIGITAL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">沪ICP备XXXXXXXX号</a>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Consultant Chat */}
      <ConsultantChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;
