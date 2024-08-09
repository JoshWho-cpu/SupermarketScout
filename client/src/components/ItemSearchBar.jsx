import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStore = () => {
    const [items, setItems] = useState("");
    let navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            navigate(`/itemSearchPage?query=${encodeURIComponent(items)}`);
        } catch (err) {
            console.error(err);
        }
    };
    
  return (
    <div className="mb-4">
        <form action="">
            <div className="row">
                <div className="col">
                    <input 
                        value ={items} 
                        onChange={e => setItems(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="Search for an item here"/>
                </div>
                <div className="col-auto">
                    <button onClick={handleSearch} type="submit" className="btn btn-primary">Search</button>
                </div>
            </div>
        </form>     
    </div>
  )
}

export default AddStore