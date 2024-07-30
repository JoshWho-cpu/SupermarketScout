import React, { useContext, useState } from 'react'; // Import useState from React
import StoreFinder from "../apis/StoreFinder";
import { StoresContext } from '../context/StoresContext';

const AddStore = () => {
    const {addStores} = useContext(StoresContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    // const [zipCode, setZipCode] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");

    const handleSubmit = async (e, latitude, longitude) => {
        e.preventDefault();
        try {
            const response = await StoreFinder.get(`/findstore/${latitude}/${longitude}`);
            console.log(response.data.data.stores);
        } catch (err) {
            console.error(err);
        }
    }
  return (
    <div className="mb-4">
        <form action="">
            {/* <div className="row">
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
            </div> */}
            <div className="row">
                <div className="col">
                    <input 
                        value ={lat} 
                        onChange={e => setLat(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="latitude"/>
                </div>
                <div className="col">
                    <input 
                        value ={lon} 
                        onChange={e => setLon(e.target.value)} 
                        type="text" 
                        className="form-control" 
                        placeholder="longitude"/>
                </div>
                <div className="col-auto">
                    <button onClick={(e) => handleSubmit(e, lat, lon)} type="submit" className="btn btn-primary">Search</button>
                </div>
            </div>
        </form>     
    </div>
  )
}

export default AddStore