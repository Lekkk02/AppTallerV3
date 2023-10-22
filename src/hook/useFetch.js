import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prevData, setPrevData] = useState([]);

  const options = {
    method: "GET",
    url: `https://daappserver-production.up.railway.app/api/ordenes/${endpoint}`,
  };
  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
      return Promise.resolve(response.data);
    } catch (error) {
      setError(error);
      console.log(error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => {
    try {
      const response = await axios.request(options);
      const newData = response.data;

      if (JSON.stringify(newData) !== JSON.stringify(prevData)) {
        setIsLoading(true);
        setData(newData);
        setPrevData(newData);
      } else {
        fetchData();
      }
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
