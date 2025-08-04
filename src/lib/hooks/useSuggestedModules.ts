import useSWR from '../useSWR';

interface ApiModule {
  moduleId: string;
}

export function useSuggestedModules(accountId: string) {
  const token = btoa(JSON.stringify({ role: 'user' }));
  const fetcher = () =>
    fetch(`/api/reco/modules?accountId=${accountId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((r) => r.json() as Promise<ApiModule[]>);

  const { data, error } = useSWR(`/api/reco/modules?accountId=${accountId}`, fetcher);

  return {
    modules: data,
    isLoading: !data && !error,
    error
  } as const;
}
