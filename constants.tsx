
import { RoadmapStep, ServiceItem, CaseItem, NewsItem } from './types';

export const SERVICES_DATA: ServiceItem[] = [
  { id: 1, title: "高端定制建站", desc: "1对1定制设计，打造具有品牌灵魂的数字化门户。", icon: "fa-desktop", tags: ["品牌官网", "集团门户", "外贸展示"] },
  { id: 2, title: "全网营销系统", desc: "SEO/SEM深度整合，让您的网站不仅美观更有源源不断的询盘。", icon: "fa-chart-line", tags: ["关键词排名", "百度收录", "社交营销"] },
  { id: 3, title: "移动应用开发", desc: "微信小程序、APP、H5多端同步，抢占移动流量红利。", icon: "fa-mobile-screen-button", tags: ["小程序", "原生App", "响应式H5"] },
  { id: 4, title: "企业数字化转型", desc: "ERP/CRM/OA集成，打破信息孤岛，提升经营管理效率。", icon: "fa-layer-group", tags: ["流程自动化", "数据分析", "云端集成"] }
];

export const CASES_DATA: CaseItem[] = [
  { id: 1, title: "新能源汽车品牌站", category: "工业制造", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80", company: "极氪动力科技" },
  { id: 2, title: "全球医疗器械门户", category: "生物医疗", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500&q=80", company: "迈瑞恒生" },
  { id: 3, title: "跨境电商时尚平台", category: "电子商务", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80", company: "Shein Plus" },
  { id: 4, title: "数字化建筑管理系统", category: "智慧建筑", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80", company: "中铁建设集团" }
];

export const NEWS_DATA: NewsItem[] = [
  { id: 1, title: "Gemini 3 驱动的智能建站时代正式开启", date: "2024-03-20", summary: "如何利用AI重构企业数字化门户？中企销带您深入解析。", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80" },
  { id: 2, title: "热烈祝贺我司荣获“年度最佳数字化服务商”", date: "2024-03-15", summary: "在刚刚结束的数字化峰会上，中企销凭借卓越的技术实力脱颖而出。", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80" },
  { id: 3, title: "移动端流量占比突破80%，您的网站适配了吗？", date: "2024-03-01", summary: "响应式设计不再是可选项，而是企业生存的必备条件。", image: "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?w=500&q=80" }
];

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    id: 1,
    title: "需求分析",
    description: "明确目标、受众与品牌调性。",
    icon: "fa-magnifying-glass-chart",
    tasks: ["KPI设定", "用户画像", "竞品调研"]
  },
  {
    id: 2,
    title: "架构规划",
    description: "梳理Sitemap与SEO逻辑。",
    icon: "fa-diagram-project",
    tasks: ["信息架构", "SEO方案", "内容大纲"]
  },
  {
    id: 3,
    title: "视觉设计",
    description: "VI规范导入与交互原型。",
    icon: "fa-pen-nib",
    tasks: ["UI设计", "交互Demo", "用户反馈"]
  },
  {
    id: 4,
    title: "技术开发",
    description: "全端还原与系统部署。",
    icon: "fa-terminal",
    tasks: ["前端开发", "CMS集成", "压测调优"]
  },
  {
    id: 5,
    title: "上线维保",
    description: "安全巡检与数据运营。",
    icon: "fa-shield-halved",
    tasks: ["备案SSL", "数据监控", "迭代更新"]
  }
];
