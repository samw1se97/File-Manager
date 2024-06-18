// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      //   setError(null);
      console.log(url, options);
      try {
        await axios(url, options).then((res) => {
          setData(res.data);
          console.log(res.data);
        });
        // setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading };
};

export default useFetch;
