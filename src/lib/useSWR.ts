import { useEffect, useState, useCallback, useRef } from 'react';

interface Options {
  refreshInterval?: number;
}

export default function useSWR<T>(key: string, fetcher: () => Promise<T>, options?: Options) {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const active = useRef(true);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      if (active.current) setData(result);
    } catch (err) {
      if (active.current) setError(err);
    } finally {
      if (active.current) setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    active.current = true;
    load();
    const interval = options?.refreshInterval
      ? setInterval(load, options.refreshInterval)
      : null;
    return () => {
      active.current = false;
      if (interval) clearInterval(interval);
    };
  }, [key, load, options?.refreshInterval]);

  return { data, error, isLoading, mutate: load } as const;
}
