import { LucideIcon, FileText, Box, ClipboardList } from 'lucide-react';

export interface ModuleDetails {
  id: string;
  name: string;
  benefit: string;
  price: string;
  icon: LucideIcon;
}

export const suggestedModules: Record<string, ModuleDetails> = {
  'e-invoice': {
    id: 'e-invoice',
    name: 'Facturation',
    benefit: 'Automatisez vos factures',
    price: '15€/mois',
    icon: FileText
  },
  inventory: {
    id: 'inventory',
    name: 'Inventaire',
    benefit: 'Suivez vos stocks',
    price: '25€/mois',
    icon: Box
  },
  'project-tracking': {
    id: 'project-tracking',
    name: 'Projets',
    benefit: 'Gérez vos projets efficacement',
    price: '19€/mois',
    icon: ClipboardList
  }
};

export default suggestedModules;
