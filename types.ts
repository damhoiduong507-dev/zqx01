
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
