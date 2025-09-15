import { useEffect, useState } from "react";
import Perks from "./Perks";
import PhotosUp from "../PhotosUp";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
export default function PlacesForm(){

  
  const [title,setTitle]=useState('');
  const [address,setAddress]=useState('');
  const [addedphotos,setAddedPhotos]=useState([]);
  const [description,setDescription]=useState('');
  const [perks,setPerks]=useState('');
  const [extraInfo,setextraInfo]=useState('');
  const [checkIn,setCheckIn]=useState('');
  const [checkOut,setCheckOut]=useState('');
  const [maxGuest,setMaxGuest]=useState(1);
  const [price,setPrice]=useState(100);

  const[redirect,setRedirect]=useState(false);
  const {id}=useParams();
  console.log(id);
  useEffect(()=>{
    if(!id){
      return ;
    }
    axios.get('https://hoteltravelbooking-mern.onrender.com/api/places/'+id).then(response=>{
      const {data}=response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.addedphotos);
      setDescription(data.description);
      setPerks(data.perks);
      setextraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuest);
      setPrice(data.price);
    })
  },[id])
 

  async function savePlace (ev){
    ev.preventDefault();
    const placeData={title,address,addedphotos,description,perks,extraInfo,
      checkIn,checkOut,maxGuest,price};

      if(id){
        await axios.put('/places',{
          id,...placeData
        })
        setRedirect(true);
      }
      else{
        await axios.post('/places',placeData);
         setRedirect(true)
      }
    

  }
  if(redirect){
    return <Navigate to={'/account/places'}/>
  }

    return (
        <>
        <AccountNav/>
        <div className="p-4 ">
  <form onSubmit={savePlace}>
    <h2 className="text-2xl">Title</h2>
    <p className="text-gray-400 text-sm">
      The Title of Your Home given In the advertisement{" "}
    </p>
    <input
      type="text"
      value={title}
      onChange={(ev) => setTitle(ev.target.value)}
      placeholder="Title Of Your Lovely Apartment"
      className="mt-2 border rounded-full py-1 px-3 w-5/6"
    />
    <h2 className="text-2xl mt-2">Address</h2>
    <input
      type="text"
      value={address}
      onChange={(ev) => setAddress(ev.target.value)}
      placeholder="Address"
      className="mt-2 border rounded-full py-1 px-3 w-5/6"
    />

    <PhotosUp addedphotos={addedphotos} onChange={setAddedPhotos} />

    <h2 className="text-2xl">Description</h2>
    <p>Description of your sweet home</p>
    <input
      className="border w-5/6 p-20 pt-0 pl-1"
      type="text"
      
      value={description}
      onChange={(ev) => setDescription(ev.target.value)}
    />

    <Perks selected={perks} onChange={setPerks} />

    <h2 className="text-2xl">Extra Info</h2>
    <p>Rules and Regulations</p>
    <input
      className="w-5/6 border p-4 pt-0 pl-1 content-center"
      type="text"
      value={extraInfo}
      onChange={(ev) => setextraInfo(ev.target.value)}
    />

    <h2 className="text-2xl">Check In & Check Out Timings</h2>
    <p className="mt-1">
      Check In, Check Out and Max Guest - Remember to have some time window!!
    </p>
    <div className="grid grid-cols-3 lg:grid-cols-4 mt-2">
      <div>
        <h3 className="mb-1">Check In Time</h3>
        <input
          className="border w-2/3"
          type="text"
          value={checkIn}
          onChange={(ev) => setCheckIn(ev.target.value)}
          placeholder="14:00"
        />
      </div>
      <div>
        <h3 className="mb-1">Check Out Time</h3>
        <input
          className="border p-2"
          type="text"
          value={checkOut}
          onChange={(ev) => setCheckOut(ev.target.value)}
          placeholder="12:00"
        />
      </div>
      <div>
        <h3 className="mb-1">Max Guest</h3>
        <input
          className="border p-2"
          type="text"
          value={maxGuest}
          onChange={(ev) => setMaxGuest(ev.target.value)}
          placeholder="4,5,6...12"
        />
      </div>
      <div>
        <h3 className="mb-1">Price Per Night</h3>
        <input
          className="border p-2"
          type="text"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
          placeholder="$1000"
        />
      </div>
    </div>
    <div className="mt-2">
      <button className="bg-red-500 text-center ml-20 text-white w-5/6 p-2 border rounded-2xl">
        Save
      </button>
    </div>
  </form>
</div>

        </>
    )
}