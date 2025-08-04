import { useEffect, useState } from 'react';

interface Options {
  refreshInterval?: number;
}

export default function useSWR<T>(key: string, fetcher: () => Promise<T>, options?: Options) {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await fetcher();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err);
      }
    };
    load();
    const interval = options?.refreshInterval
      ? setInterval(load, options.refreshInterval)
      : null;
    return () => {
      active = false;
      if (interval) clearInterval(interval);
    };
  }, [key]);

  return { data, error } as const;
}
