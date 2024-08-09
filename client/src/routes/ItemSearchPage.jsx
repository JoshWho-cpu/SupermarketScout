import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ItemFinder from '../apis/ItemFinder';
import ItemSearch from '../components/ItemSearch';

const ItemSearchPage = () => {
    const location = useLocation();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const query = searchParams.get('query');

                if (query) {
                    const response = await ItemFinder.get(`/search`, {
                        params: { query: query }
                    });

                    console.log(response.data.data.stores.items);
                    setItems(response.data.data.stores.items);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [location.search]);

    return (
        <ItemSearch items={items}/>
    );
};

export default ItemSearchPage;
