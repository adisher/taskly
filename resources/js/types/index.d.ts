import { LucideIcon } from 'lucide-react';
import * as LucidIcons from 'lucide-react';

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  permission?: string;
}

export interface TableColumn {
  label: string;
  key: string;
  isImage?: boolean;
  isAction?: boolean;
  className?: string;
  type?: string;
  sortable?: boolean;
  sortKey?: string;
}

export interface ActionConfig {
  label: string;
  icon: keyof typeof LucidIcons;
  action: string;
  className: string;
  permission?: string;
}

export interface TableConfig {
  columns: TableColumn[];
  actions: ActionConfig[];
  statusColors?: Record<string, string>;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  validation?: string;
  options?: { value: string; label: string }[];
}

export interface FormConfig {
  fields: FormField[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface TaskChecklistTemplate {
  id?: number;
  task_template_id?: number;
  title: string;
  order: number;
  estimated_days?: number;
  created_by?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TaskTemplate {
  id?: number;
  project_template_id?: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  task_type: 'member' | 'client';
  estimated_days?: number;
  order: number;
  created_by?: number;
  checklists?: TaskChecklistTemplate[];
  checklistTemplates?: TaskChecklistTemplate[];
  created_at?: string;
  updated_at?: string;
}

export interface ProjectTemplate {
  id: number;
  workspace_id: number;
  name: string;
  description?: string;
  default_status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  default_priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_hours?: number;
  budget?: number;
  is_public: boolean;
  category?: string;
  created_by: number;
  updated_by?: number;
  creator?: User;
  updater?: User;
  tasks?: TaskTemplate[];
  taskTemplates?: TaskTemplate[];
  created_at: string;
  updated_at: string;
}