import useSWR from '../useSWR';

interface ClosingTask {
  id: string;
  title: string;
  description: string;
  status: string;
  documents?: { name: string; date: string }[];
}

export function useClosingTasks(accountId: string, period: string) {
  const { data, error, isLoading, mutate } = useSWR<ClosingTask[]>(
    `/api/closing/tasks?accountId=${accountId}&period=${period}`,
    () =>
      fetch(`/api/closing/tasks?accountId=${accountId}&period=${period}`)
        .then((r) => r.json()),
  );

  return { data, error, isLoading, mutate } as const;
}

