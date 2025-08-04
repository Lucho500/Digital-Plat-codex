import { LucideIcon, FileText, Box, ClipboardList } from 'lucide-react';

// Base prices in EUR for bundle calculation
const ADVISORY_PRICE = 50;
const E_INVOICE_PRICE = 15;
const E_INVOICE_BUNDLE_PRICE = Math.round((E_INVOICE_PRICE + ADVISORY_PRICE) * 0.9);

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
  'e-invoice-bundle': {
    id: 'e-invoice-bundle',
    name: 'Facturation + 30 min conseil',
    benefit: 'Automatisez vos factures avec 30 min de conseil',
    price: `${E_INVOICE_BUNDLE_PRICE}€/mois`,
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
