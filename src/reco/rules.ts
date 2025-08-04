export interface RuleMap {
  [sector: string]: {
    [size: string]: string[];
  };
}

export const rules: RuleMap = {
  commerce: {
    small: ['e-invoice', 'inventory', 'project-tracking'],
    medium: ['e-invoice', 'inventory', 'project-tracking'],
    large: ['e-invoice', 'inventory', 'project-tracking']
  },
  services: {
    small: ['project-tracking', 'time-billing', 'e-invoice'],
    medium: ['project-tracking', 'time-billing', 'e-invoice'],
    large: ['project-tracking', 'time-billing', 'e-invoice']
  },
  industrie: {
    small: ['asset-management', 'production', 'project-tracking'],
    medium: ['asset-management', 'production', 'project-tracking'],
    large: ['asset-management', 'production', 'project-tracking']
  }
};

export const RULE_WEIGHT = 0.4;

export function getRuleScores(sector: string, size: string) {
  const modules = rules[sector]?.[size] || [];
  const scores: Record<string, number> = {};
  modules.forEach((m) => {
    scores[m] = 1;
  });
  return scores;
}
