import { useEffect, useState } from "react";
import axios from "axios";

const useFetchDataDetails = (endpoint, id) => {
  const [dataDetails, setDataDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDataDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/${endpoint}/${id}`
      );
      if (response.status === 200) {
        setDataDetails(response.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/${endpoint}/${id}`
      );
      if (response.status === 200) {
        setDataDetails(response.data.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDetails();
  }, [id]);

  return { dataDetails, loading, error, refetchData };
};

export default useFetchDataDetails;
