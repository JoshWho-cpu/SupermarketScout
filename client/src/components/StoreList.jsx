import React, { useContext, useEffect } from 'react';
import StoreFinder from '../apis/StoreFinder';
import { StoresContext } from '../context/StoresContext';
import { useNavigate } from 'react-router-dom';

const StoreList = (props) => {
    const { stores, setStores } = useContext(StoresContext);
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await StoreFinder.get("/");
                setStores(response.data.data.stores); // Update context with fetched data
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    },[]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
           const response = await StoreFinder.delete(`/${id}`);
           setStores(stores.filter(store => {
                return store.id !== id
           }))
        } catch (err) {

        }
    };

    const handleUpdate = async (e, id) => {
        e.stopPropagation();
        navigate(`/stores/${id}/update`);
    };

    const handleStoreSelect = async (id) => {
        navigate(`/stores/${id}`);
    };

  return (
    <div className="list-group">
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                <th scope ="col">Store</th>
                <th scope ="col">Location</th>
                <th scope ="col">Products</th>
                <th scope ="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {stores && stores.map(store => {
                    return (
                        <tr onClick={() => handleStoreSelect(store.id)} key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.location}</td>
                            <td><button onClick={(e) => handleUpdate(e, store.id)} className="btn btn-warning">Products</button></td>
                            <td><button onClick={(e) => handleDelete(e, store.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default StoreList