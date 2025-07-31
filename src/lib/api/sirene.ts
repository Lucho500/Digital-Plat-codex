export interface SireneData {
  legalName: string;
  address: string;
  postalCode: string;
  city: string;
}

export async function fetchSirene(siren: string): Promise<SireneData> {
  const token = import.meta.env.VITE_SIRENE_API_TOKEN;
  const url = `https://entreprise.api.gouv.fr/v3/insee/sirene/etablissements/${siren}?token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('SIRENE request failed');
  }
  const json = await res.json();
  const etab = json.etablissement;
  return {
    legalName: etab?.unite_legale?.denomination || '',
    address: etab?.geo_adresse || '',
    postalCode: etab?.code_postal || '',
    city: etab?.libelle_commune || ''
  };
}
