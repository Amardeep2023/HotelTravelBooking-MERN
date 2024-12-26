import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";

export default function PlacesPages() {
  const { action } = useParams(); 
  const[places,setPlaces]=useState([]);
  useEffect(()=>{
    axios.get('/user-places').then(({data})=>{
      setPlaces(data)
    })

  },[])

 return (
  <div>
    <AccountNav/>
    {action === "new" ? (
      <div className="p-4">
        
      </div>
    ) : (
      <div className="flex flex-col">
        <Link
          className="m-auto py-1 px-6 mt-5 border border rounded-full bg-red-500 text-white inline-flex gap-2"
          to="/account/places/new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new Place
        </Link>
       <div>
          {places.length > 0 && places.map(place=>(
            
          <Link to={'/account/places/'+place._id} className="bg-slate-200 border rounded-2xl m-7 p-2 flex gap-2 smdev:flex-col">
            <div className=" bg-slate-300   mt-1 ">
             <PlaceImg className="w-40 " place={place}/>
             
            </div>
         
            <div>
            <h2 className="font-bold ">{place.title}</h2>
            <p className="text-sm smdev:hidden">{place.description}</p>
            </div>
          </Link>
        ))}
       </div>
      </div>
    )}
  </div>
);

}
