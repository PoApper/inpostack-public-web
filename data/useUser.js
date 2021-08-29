import useSWR from 'swr';
import { getUser } from '../requests/userApi';

function useUser() {
  const { data, error } = useSWR('account/me', getUser);

  const loading = !data && !error;

  return {
    loading,
    user: data,
    error,
  };
}

export default useUser;
