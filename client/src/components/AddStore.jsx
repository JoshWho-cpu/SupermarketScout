import React, { useContext, useState } from 'react'; // Import useState from React
import StoreFinder from "../apis/StoreFinder";
import { StoresContext } from '../context/StoresContext';

const AddStore = () => {
    const {addStores} = useContext(StoresContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await StoreFinder.post("/", {
                name,
                location
            });
            addStores(response.data.data.store);
            console.log (response);
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <div className="mb-4">
        <form action="">
            <div className="row">
                <div className="col">
                    <input 
                        value ={name} 
                        onChange={e => setName(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="name"/>
                </div>
                <div className="col">
                <input 
                        value ={location} 
                        onChange={e => setLocation(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="name"/>
                </div>
                <div className="col-auto">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>     
    </div>
  )
}

export default AddStore