
export type PageType = 'home' | 'services' | 'cases' | 'news' | 'about';

export interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  icon: string;
  tasks: string[];
}

export interface WebsitePlan {
  sitemap: string[];
  techStack: string[];
  contentStrategy: string;
  designDirection: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  desc: string;
  icon: string;
  tags: string[];
}

export interface CaseItem {
  id: number;
  title: string;
  category: string;
  image: string;
  company: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  image: string;
}
