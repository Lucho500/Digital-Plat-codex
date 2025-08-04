import useSWR from '../useSWR';

export interface ExpertDetails {
  id: string;
  name: string;
  speciality: string;
  avatarUrl: string;
  online: boolean;
  npsScore: number;
}

export function useExpertDetails(accountId: string) {
  if (!accountId) {
    return { expert: undefined, isLoading: false, error: null } as const;
  }

  const fetcher = () =>
    fetch(`/api/experts/${accountId}`).then((r) => r.json() as Promise<ExpertDetails>);

  const { data, error } = useSWR(`/api/experts/${accountId}`, fetcher);

  return {
    expert: data,
    isLoading: !data && !error,
    error
  } as const;
}
