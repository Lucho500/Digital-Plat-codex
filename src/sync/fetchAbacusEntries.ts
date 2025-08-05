export interface AbacusEntry {
  glAccount: string;
  [key: string]: unknown;
}

export async function fetchAbacusEntries(
  accountId: string,
  startDate: string,
  endDate: string
): Promise<AbacusEntry[]> {
  const url = `/abacus/${accountId}/entries?start=${startDate}&end=${endDate}`;
  const res = await fetch(url);
  const json = await res.json();
  const entries = Array.isArray(json.data) ? json.data : [];

  return entries.map((entry: any) => ({
    ...entry,
    glAccount: entry.GLAccount ?? entry.glAccount
  }));
}
