// useDataDeletion.js or useDataDeletion.ts
import { useState } from 'react';
import axios from 'axios';

const useDataDeletion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = async (url, onSuccess) => {
    try {
      setLoading(true);
      const response = await axios.delete(url);
      if (response.status === 200) {
        onSuccess();
      } else {
        setError(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      setError(`Error deleting data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, loading, error };
};

export default useDataDeletion;
