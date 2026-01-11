
import React, { useState } from 'react';
import { getWebsitePlan, generateVisualConcept } from '../services/geminiService';
import { WebsitePlan } from '../types';

const AIArchitect: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [plan, setPlan] = useState<WebsitePlan | null>(null);
  const [visualConcept, setVisualConcept] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!industry.trim()) return;
    setLoading(true);
    setVisualConcept(null);
    try {
      const result = await getWebsitePlan(industry);
      setPlan(result);
    } catch (error) {
      console.error(error);
      alert('生成规划时出错，请重试。');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!industry) return;
    setGeneratingImage(true);
    try {
      const imageUrl = await generateVisualConcept(industry);
      setVisualConcept(imageUrl);
    } catch (error) {
      console.error(error);
      alert('视觉概念生成失败。');
    } finally {
      setGeneratingImage(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black mb-4 flex items-center justify-center gap-3">
          <i className="fas fa-wand-magic-sparkles text-blue-600"></i>
          AI 行业规划专家
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto">
          仅需输入您的行业或企业理念，AI 将为您深度解析并输出整套建站方略。
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text" 
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="例如：高端新能源汽车品牌、智能医疗影像系统、跨境电商女装..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-lg"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-blue-600/20"
        >
          {loading ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-rocket"></i>}
          立即生成
        </button>
      </div>

      {plan && (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-xl">
                  <i className="fas fa-sitemap text-blue-600"></i> 站点地图预览
                </h3>
                <div className="flex flex-wrap gap-3">
                  {plan.sitemap.map((item, i) => (
                    <span key={i} className="bg-white px-4 py-2 rounded-xl text-sm font-semibold border border-blue-100 shadow-sm text-blue-800">{item}</span>
                  ))}
                </div>
              </section>

              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-xl">
                  <i className="fas fa-microchip text-indigo-600"></i> 推荐技术方案
                </h3>
                <div className="flex flex-wrap gap-3">
                  {plan.techStack.map((item, i) => (
                    <span key={i} className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-600/20">{item}</span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-xl">
                  <i className="fas fa-paint-roller text-purple-600"></i> 视觉设计基调
                </h3>
                <p className="text-slate-600 leading-relaxed italic">“{plan.designDirection}”</p>
              </section>

              <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-3 text-xl">
                  <i className="fas fa-bullhorn text-emerald-600"></i> 营销与 SEO 策略
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">{plan.contentStrategy}</p>
              </section>
            </div>
          </div>

          <section className="border-t border-slate-100 pt-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div className="text-left">
                <h3 className="font-extrabold text-slate-800 text-2xl flex items-center gap-3">
                  <i className="fas fa-palette text-blue-600"></i> AI 视觉概念稿
                </h3>
                <p className="text-slate-500 text-sm mt-1">根据您的行业自动构思的高端网页首屏概念</p>
              </div>
              {!visualConcept && (
                <button 
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center gap-3"
                >
                  {generatingImage ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                  渲染首屏预览
                </button>
              )}
            </div>
            
            {visualConcept ? (
              <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl aspect-video bg-slate-100 border-4 border-white">
                <img src={visualConcept} alt="Visual Concept" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <h4 className="text-white text-2xl font-bold mb-2">行业定制化视觉概念</h4>
                   <p className="text-slate-300 text-sm max-w-xl">该设计结合了行业特点，采用了现代主义极简布局。建议作为 UI 设计的风格指南。</p>
                </div>
              </div>
            ) : generatingImage ? (
               <div className="aspect-video bg-blue-50 rounded-[2rem] border-2 border-dashed border-blue-200 flex flex-col items-center justify-center text-blue-400">
                  <div className="relative mb-6">
                    <i className="fas fa-brain text-5xl animate-pulse"></i>
                    <i className="fas fa-sparkles text-xl absolute -top-2 -right-2 text-yellow-400 animate-bounce"></i>
                  </div>
                  <p className="font-bold text-lg animate-pulse text-blue-600">AI 正在根据行业属性构建视觉空间...</p>
                  <p className="text-sm mt-2">预计耗时 10-15 秒</p>
               </div>
            ) : (
               <div className="aspect-video bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300 group hover:border-blue-200 transition-colors cursor-pointer" onClick={handleGenerateImage}>
                  <i className="fas fa-image text-5xl mb-4 group-hover:text-blue-300 transition-colors"></i>
                  <p className="font-medium">点击生成该行业的视觉设计概念参考</p>
               </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default AIArchitect;
