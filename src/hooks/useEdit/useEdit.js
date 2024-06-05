import { useState } from 'react';
import axios from 'axios';

export const useEditData = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const editData = async (formData, endpoint, id) => {
    console.log(formData, 'this is ');

    try {
      setIsLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/${endpoint}/${id}`,
        formData
      );

      setIsLoading(false);

      return response.data;
    } catch (error) {
      setIsLoading(false);
      setError(`Error: ${error.message}`);
      throw error;
    }
  };

  return { editData, isLoading, error };
};
