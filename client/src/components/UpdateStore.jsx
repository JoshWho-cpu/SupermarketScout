import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import StoreFinder from '../apis/StoreFinder';

const UpdateStore = (props) => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    console.log(id);

    useEffect(() => {
      const fetchData = async() => {
        const response = await StoreFinder.get(`/${id}`);
        console.log(response.data.data.store);
        setName(response.data.data.store.name);
        setLocation(response.data.data.store.location);
      };

      fetchData();
    }, []);
  return (
    <div>Updatestore</div>
  );
};

export default UpdateStore