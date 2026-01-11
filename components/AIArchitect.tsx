
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
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <i className="fas fa-magic text-blue-600"></i>
          AI 官网架构师
        </h2>
        <p className="text-slate-500">输入您的行业或企业简介，我们将为您生成定制化的建站规划方案。</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input 
          type="text" 
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="例如：高端智能家居品牌、环保科技初创企业..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-wand-magic-sparkles"></i>}
          开始规划
        </button>
      </div>

      {plan && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <section className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-list-ul text-blue-500"></i> 网站地图 (Sitemap)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plan.sitemap.map((item, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm border border-slate-200 shadow-sm">{item}</span>
                  ))}
                </div>
              </section>

              <section className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-layer-group text-purple-500"></i> 推荐技术栈
                </h3>
                <div className="flex flex-wrap gap-2">
                  {plan.techStack.map((item, i) => (
                    <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{item}</span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-lightbulb text-yellow-500"></i> 视觉与设计方向
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{plan.designDirection}</p>
              </section>

              <section className="bg-slate-50 p-6 rounded-2xl">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-green-500"></i> 内容与SEO策略
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{plan.contentStrategy}</p>
              </section>
            </div>
          </div>

          <section className="border-t border-slate-100 pt-8">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <i className="fas fa-image text-indigo-500"></i> AI 视觉概念预览
              </h3>
              {!visualConcept && (
                <button 
                  onClick={handleGenerateImage}
                  disabled={generatingImage}
                  className="text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-all flex items-center gap-2"
                >
                  {generatingImage ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paint-brush"></i>}
                  生成首屏预览
                </button>
              )}
            </div>
            
            {visualConcept ? (
              <div className="relative group overflow-hidden rounded-2xl shadow-lg aspect-video bg-slate-100">
                <img src={visualConcept} alt="Visual Concept" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <p className="text-white text-sm">这是为您生成的行业视觉参考。基于现代简约的设计语言。</p>
                </div>
              </div>
            ) : generatingImage ? (
               <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <i className="fas fa-wand-sparkles text-3xl mb-4 animate-pulse"></i>
                  <p>AI 正在构思视觉方案...</p>
               </div>
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
};

export default AIArchitect;
