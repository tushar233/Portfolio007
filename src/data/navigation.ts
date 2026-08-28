import { Sparkles, User, Briefcase, Layers, History, Mail } from 'lucide-react';
import type { ElementType } from 'react';

export interface NavTab {
  id: string;
  name: string;
  icon: ElementType;
}

export const mainTabs: NavTab[] = [
  { id: 'overview', name: 'Overview', icon: Sparkles },
  { id: 'about', name: 'About Me', icon: User },
  { id: 'projects', name: 'Projects', icon: Briefcase },
  { id: 'architecture', name: 'Architecture', icon: Layers },
  { id: 'experience', name: 'Experience', icon: History },
  { id: 'contact', name: 'Contact Us', icon: Mail },
];
