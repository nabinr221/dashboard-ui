import { useState } from "react";
import axios from "axios";

export const useAddData = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const addData = async (formData, endpoint) => {
    console.log(formData, endpoint, "formData, endpoint");
    try {
      setIsLoading(true);

      const dataItem = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/${endpoint}`,
        formData
      );

      setIsLoading(false);
      return dataItem;
    } catch (error) {
      setIsLoading(false);
      setError("Error:", error.message);
      throw error;
    }
  };

  return { addData, isLoading, error };
};

// export default useAddAboutMe;
