import { useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * Custom React hook to fetch data from the API
 * @function
 * @param {Object} props - Object with endpoint property
 * @param {string} props.endpoint - API endpoint to fetch data from
 * @returns {Object} fetchedData - Object with data, loading, error, and refetchData functions
 * @returns {Object} fetchedData.data - Data fetched from the API
 * @returns {boolean} fetchedData.loading - Boolean representing whether data is being fetched from the API
 * @returns {string|null} fetchedData.error - String with error message or null if there is no error
 * @returns {function} fetchedData.refetchData - Function to refetch data from the API
 */

export const useFetchData = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wrap fetchData in useCallback to memoize the function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/${endpoint}`
      );

      if (response.status === 200) {
        setData(response.data.data);
      } else {
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, [endpoint]); // Only include endpoint as a dependency

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Watch for changes in fetchData function only

  // Return the fetched data, loading state, error, and refetch function
  return { data, loading, error, refetchData: fetchData };
};
