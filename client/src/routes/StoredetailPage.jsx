import React, { useContext, useEffect } from 'react'
import { StoresContext } from '../context/StoresContext';
import StoreFinder from '../apis/StoreFinder';
import { useParams } from 'react-router-dom';

const StoreDetailPage = () => {
    const {id} = useParams();
    const {selectedStore, setSelectedStore} = useContext(StoresContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await StoreFinder.get(`/${id}`);
                console.log(response);
                setSelectedStore(response.data.data.store);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, []);

  return (
    <div>{selectedStore.name}</div>
  )
}

export default StoreDetailPage