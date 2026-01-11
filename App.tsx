
import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import { SERVICES_DATA, CASES_DATA, NEWS_DATA } from './constants';
import AIArchitect from './components/AIArchitect';
import ConsultantChat from './components/ConsultantChat';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- 顶部导航栏 (Header) --- */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-xl py-2' : 'bg-white/95 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
            <div className="w-12 h-12 bg-[#0056b3] rounded flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <i className="fas fa-chart-pie text-2xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-800 tracking-tighter">中企销数字化</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">Smart Marketing Engine</span>
            </div>
          </div>

          {/* 桌面菜单 */}
          <nav className="hidden lg:flex items-center gap-10">
            {[
              { id: 'home', label: '首页' },
              { id: 'services', label: '产品服务' },
              { id: 'cases', label: '成功案例' },
              { id: 'news', label: '新闻动态' },
              { id: 'about', label: '关于我们' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id as PageType)}
                className={`relative py-1 text-sm font-bold tracking-wide transition-colors hover:text-[#0056b3] ${
                  currentPage === item.id ? 'text-[#0056b3] nav-link-active' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 右侧操作 */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:flex flex-col items-end border-r border-slate-200 pr-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase">咨询专线</span>
              <span className="text-lg font-black text-[#0056b3]">400-000-8888</span>
            </div>
            <button className="bg-[#0056b3] text-white px-7 py-2.5 rounded shadow-lg shadow-blue-200 hover:bg-[#004494] transition-all font-bold text-sm">
              免费方案定制
            </button>
            <button className="lg:hidden text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-white p-8 lg:hidden animate-in fade-in slide-in-from-right">
          <div className="flex justify-between items-center mb-12">
             <span className="font-black text-xl">MENU</span>
             <button onClick={() => setMobileMenuOpen(false)}><i className="fas fa-times text-2xl"></i></button>
          </div>
          <div className="flex flex-col gap-8 text-2xl font-bold">
            {['home', 'services', 'cases', 'news', 'about'].map(p => (
              <button key={p} onClick={() => navigate(p as PageType)} className="text-left border-b pb-4 border-slate-100 capitalize">{p}</button>
            ))}
          </div>
        </div>
      )}

      {/* --- 主体内容 (Main Content) --- */}
      <main className="flex-grow pt-[88px]">
        
        {/* 1. 首页 (Home) */}
        {currentPage === 'home' && (
          <div className="page-enter">
            <section className="relative h-[700px] flex items-center bg-[#001a33] overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80" 
                 className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105 animate-[pulse_10s_infinite]" 
                 alt="Main Banner"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-[#001a33] via-transparent to-transparent"></div>
               <div className="relative max-w-7xl mx-auto px-4 w-full text-white">
                  <div className="max-w-3xl space-y-8">
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                       <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></span>
                       <span className="text-xs font-bold tracking-[0.2em]">中企销数字化 · AI 驱动增长</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                      懂营销，<br />
                      <span className="text-[#0056b3]">更懂转化。</span>
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                      从品牌官网到全网营销矩阵，我们利用 AI 深度学习与大数据分析，为企业提供具备极高商业转化能力的数字化门户。
                    </p>
                    <div className="flex gap-4 pt-4">
                       <button onClick={() => navigate('services')} className="bg-white text-slate-900 px-10 py-4 font-black rounded hover:bg-slate-100 transition-all flex items-center gap-3">
                         了解业务体系 <i className="fas fa-chevron-right text-xs"></i>
                       </button>
                    </div>
                  </div>
               </div>
            </section>

            {/* 首页 AI 入口 */}
            <section className="py-24 bg-slate-50">
               <div className="max-w-6xl mx-auto px-4">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">AI 智慧建站规划</h2>
                    <p className="text-slate-500">输入行业，立即获取由 Gemini 3 驱动的专业建站蓝图</p>
                  </div>
                  <AIArchitect />
               </div>
            </section>

            {/* 精选服务 */}
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-1">
                {SERVICES_DATA.map(s => (
                  <div key={s.id} className="p-10 border border-slate-100 hover:bg-[#0056b3] hover:text-white transition-all duration-500 group">
                    <div className="text-4xl mb-8 text-[#0056b3] group-hover:text-white transition-colors">
                      <i className={`fas ${s.icon}`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                    <p className="text-sm opacity-70 leading-relaxed mb-6">{s.desc}</p>
                    <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-current pb-1">Read More</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 2. 产品服务 (Services) */}
        {currentPage === 'services' && (
          <div className="page-enter">
            <section className="bg-slate-100 py-32">
               <div className="max-w-7xl mx-auto px-4 text-center">
                  <h1 className="text-5xl font-black mb-6">全链路数字化产品</h1>
                  <p className="text-xl text-slate-500 max-w-2xl mx-auto">中企销致力于通过技术创新，为不同发展阶段的企业提供最具竞争力的互联网产品方案。</p>
               </div>
            </section>
            <section className="py-24 max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16">
                {SERVICES_DATA.map(s => (
                  <div key={s.id} className="flex gap-10 group">
                    <div className="flex-shrink-0 w-24 h-24 bg-[#0056b3] text-white flex items-center justify-center text-4xl rounded-3xl shadow-xl">
                      <i className={`fas ${s.icon}`}></i>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black mb-4">{s.title}</h3>
                      <p className="text-slate-500 leading-relaxed mb-8">{s.desc} 该产品体系集成了 AI 内容生成、SEO 关键词矩阵、以及高并发云端架构，确保企业在线上竞争中立于不败之地。</p>
                      <div className="flex flex-wrap gap-3">
                        {s.tags.map(t => <span key={t} className="px-4 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold"># {t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 3. 成功案例 (Cases) */}
        {currentPage === 'cases' && (
          <div className="page-enter">
            <section className="bg-[#003366] text-white py-32">
               <div className="max-w-7xl mx-auto px-4">
                  <h1 className="text-5xl font-black mb-4">案例展示</h1>
                  <p className="text-blue-200">见证 10,000+ 企业客户的信任与成长</p>
               </div>
            </section>
            <section className="py-24 max-w-7xl mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {CASES_DATA.map(c => (
                  <div key={c.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-slate-200 mb-6">
                       <img src={c.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={c.title} />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-slate-900 px-6 py-2 rounded font-bold">查看详情</span>
                       </div>
                    </div>
                    <span className="text-xs font-bold text-[#0056b3] mb-2 block uppercase tracking-widest">{c.category}</span>
                    <h3 className="text-xl font-black group-hover:text-[#0056b3] transition-colors">{c.title}</h3>
                    <p className="text-slate-400 text-sm mt-2">{c.company}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* 4. 新闻动态 (News) */}
        {currentPage === 'news' && (
          <div className="page-enter">
            <section className="bg-slate-50 border-b border-slate-100 py-24">
               <div className="max-w-7xl mx-auto px-4 text-center">
                  <h1 className="text-4xl font-black">企业资讯</h1>
               </div>
            </section>
            <section className="py-24 max-w-4xl mx-auto px-4 space-y-20">
               {NEWS_DATA.map(n => (
                 <div key={n.id} className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-full md:w-80 h-48 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                       <img src={n.image} className="w-full h-full object-cover" alt={n.title} />
                    </div>
                    <div className="space-y-4">
                       <span className="text-sm font-bold text-slate-400">{n.date}</span>
                       <h3 className="text-2xl font-black hover:text-[#0056b3] cursor-pointer transition-colors">{n.title}</h3>
                       <p className="text-slate-500 leading-relaxed line-clamp-2">{n.summary}</p>
                       <button className="text-[#0056b3] font-bold text-sm">阅读全文 →</button>
                    </div>
                 </div>
               ))}
            </section>
          </div>
        )}

        {/* 5. 关于我们 (About) */}
        {currentPage === 'about' && (
          <div className="page-enter">
            <section className="h-[400px] bg-[#001a33] flex items-center justify-center text-white">
               <h1 className="text-6xl font-black italic tracking-widest">ABOUT US</h1>
            </section>
            <section className="py-32 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-24">
               <div className="space-y-10">
                  <h2 className="text-4xl font-black">坚持以技术驱动<br />提升企业数字化效率</h2>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    中企销数字化（Zhongqixiao Digital）成立于 2010 年，总部位于上海。我们拥有一支超过 150 人的核心技术团队，始终走在数字化建站的前沿。
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    我们不只是在做一个美观的网页。我们通过独创的“营销云”架构，将 AI 生成内容、精准流量转化、CRM 数据管理深度整合，真正让官网成为企业的盈利引擎。
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="border-l-4 border-[#0056b3] pl-6">
                        <div className="text-3xl font-black">14年+</div>
                        <div className="text-xs font-bold text-slate-400">行业经验</div>
                     </div>
                     <div className="border-l-4 border-[#0056b3] pl-6">
                        <div className="text-3xl font-black">1万+</div>
                        <div className="text-xs font-bold text-slate-400">服务客户</div>
                     </div>
                  </div>
               </div>
               <div className="bg-slate-100 rounded-3xl aspect-square overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Team" />
               </div>
            </section>
          </div>
        )}
      </main>

      {/* --- 页脚 (Footer) --- */}
      <footer className="bg-[#001a33] text-slate-400 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-20 border-b border-white/5 pb-20">
            <div className="col-span-1 md:col-span-1 space-y-6">
              <div className="flex items-center gap-2 text-white">
                <i className="fas fa-chart-pie text-3xl text-[#0056b3]"></i>
                <span className="text-2xl font-black">中企销数字化</span>
              </div>
              <p className="text-sm leading-relaxed">提供一站式全网数字化营销解决方案，以 AI 与大数据助力企业全球增长。</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">栏目中心</h4>
              <ul className="space-y-4 text-sm">
                <li><button onClick={() => navigate('services')} className="hover:text-white transition-colors">产品服务</button></li>
                <li><button onClick={() => navigate('cases')} className="hover:text-white transition-colors">成功案例</button></li>
                <li><button onClick={() => navigate('news')} className="hover:text-white transition-colors">新闻动态</button></li>
                <li><button onClick={() => navigate('about')} className="hover:text-white transition-colors">关于我们</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">服务热线</h4>
              <p className="text-2xl font-black text-white mb-2">400-000-8888</p>
              <p className="text-xs font-bold text-slate-500 uppercase">工作日 9:00 - 18:00</p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8 text-sm uppercase tracking-widest">联系地址</h4>
              <p className="text-sm leading-relaxed">上海市浦东新区张江高科技园区 888 号数字化智谷 B 座</p>
              <div className="flex gap-4 mt-8">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0056b3] hover:text-white transition-all"><i className="fab fa-weixin"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0056b3] hover:text-white transition-all"><i className="fab fa-weibo"></i></a>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4">
             <p>&copy; 2024 ZHONGQIXIAO DIGITAL. ALL RIGHTS RESERVED.</p>
             <div className="flex gap-8">
                <span>沪ICP备XXXXXXXX号-1</span>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Legal Terms</a>
             </div>
          </div>
        </div>
      </footer>

      <ConsultantChat isOpen={false} setIsOpen={() => {}} />
    </div>
  );
};

export default App;
