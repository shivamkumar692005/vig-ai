import { useState } from "react";
import { toast } from "sonner";

// Generic useFetch hook with typed callback
const useFetch = <T = unknown, A extends unknown[] = []>(
  cb: (...args: A) => Promise<T>
) => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fn = async (...args: A): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        toast.error(error.message);
      } else {
        toast.error(String(error));
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
