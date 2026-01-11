
import { RoadmapStep } from './types';

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    id: 1,
    title: "需求分析与定位",
    description: "明确网站的核心目标、受众群体以及品牌调性。",
    icon: "fa-bullseye",
    tasks: ["确定核心KPI", "用户画像绘制", "竞争对手分析", "功能模块清单"]
  },
  {
    id: 2,
    title: "内容规划与架构",
    description: "梳理网站信息架构，设计Sitemap及内容采集清单。",
    icon: "fa-sitemap",
    tasks: ["Sitemap设计", "栏目内容策划", "多语言需求确认", "SEO关键词规划"]
  },
  {
    id: 3,
    title: "原型与UI设计",
    description: "将想法视觉化，从低保真原型到高保真设计稿。",
    icon: "fa-palette",
    tasks: ["Wireframe绘制", "VI规范导入", "响应式交互设计", "视觉稿确认"]
  },
  {
    id: 4,
    title: "技术开发",
    description: "选择合适的开发栈，进行前端开发与后台对接。",
    icon: "fa-code",
    tasks: ["前端切图与还原", "CMS系统选型/开发", "API接口联调", "性能优化"]
  },
  {
    id: 5,
    title: "上线与运维",
    description: "域名备案、服务器配置及持续的数据监控。",
    icon: "fa-rocket",
    tasks: ["域名备案/SSL", "压力测试", "数据统计部署", "内容持续更新"]
  }
];
