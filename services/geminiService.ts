
import { GoogleGenAI, Type } from "@google/genai";

export const getWebsitePlan = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `用户需求: ${userInput}\n\n作为一个资深企业官网架构师，请根据用户的需求，生成一份结构化的建站规划。`,
    config: {
      systemInstruction: "你是一个专业的世界级网站架构师。请以专业的中文回复。你需要分析行业特点，给出网站地图、技术选型（推荐React/Tailwind等现代栈）、内容策略和设计建议。回复应条理清晰，充满洞察力。",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sitemap: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "主要页面结构清单"
          },
          techStack: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "推荐的技术组件"
          },
          contentStrategy: {
            type: Type.STRING,
            description: "内容营销与SEO建议"
          },
          designDirection: {
            type: Type.STRING,
            description: "视觉设计风格建议"
          }
        },
        required: ["sitemap", "techStack", "contentStrategy", "designDirection"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const chatWithConsultant = async (message: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: message,
    config: {
      systemInstruction: "你是一个热情、专业且极具经验的企业官网建设顾问。你的名字叫 'CorpWeb AI'。你的任务是帮助用户从零开始规划他们的官网。请多提问以了解其业务，给出实操性强的建议。语言要精炼且具有启发性。",
    }
  });
  return response.text;
};

export const generateVisualConcept = async (industry: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `A professional, high-end website hero section layout design for a company in the ${industry} industry. Modern UI, clean aesthetic, 4k resolution, business professional style.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: prompt },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};
