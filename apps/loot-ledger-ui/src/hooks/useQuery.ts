import { useState, useEffect, useCallback, useRef } from 'react';

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useQuery<T>(queryFn: () => Promise<T>): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const execute = useCallback(async () => {
    setLoading(true);
    try {
      const result = await queryFnRef.current();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}
