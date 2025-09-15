import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "./BookingWidget";
import PlaceGallery from "./PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlaceDesc (){
    const {id}=useParams();
    
    const[place,setPlace]=useState(null);
    useEffect(()=>{
      if(!id){
        return;

      }
      axios.get(`https://hoteltravelbooking-mern.onrender.com/api/places/${id}`).then(response=>{
        setPlace(response.data);
      })
    },[id])
 
   
    

    if (!place) {
        return <div>Loading...</div>; // Display loading message while data is fetched
    }

    return (
        <>
        <div className="p-8  bg-gray-100 m-5 rounded-xl">
            <h2 className="text-3xl text-gray-700">{place.title}</h2>
            <AddressLink>{place.address}</AddressLink>
       

            <PlaceGallery place={place}/>
         
           <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] mt-5">
             <div className="font-semibold">
             <h2 className="text-2xl mb-1 font-bold  ">Description</h2>
               <div className="smdev:h-36 smdev:overflow-y-scroll smdev:mt-4 smdev:mb-4"> 
                 {place.description}
                 </div>
                 <h2 className="bg-slate-200 w-36 rounded-xl mt-2">Check In:-{place.checkIn}</h2>
                 <h2 className="bg-slate-200 w-36 rounded-xl mt-1">Check Out:-{place.checkOut}</h2>
                 <h2 className="bg-slate-200 w-36 rounded-xl mt-1">Maximum Guest:-{place.maxGuest}</h2>
             </div>
             <div>
               <BookingWidget place={place}/>
             </div>

           </div>
            
        </div>

        <div className="p-8 m-5 text-start rounded-xl bg-slate-50 shadow-sm">
        <h2 className="text-2xl mb-1 font-bold">Extra Info</h2>
        <p className="text-slate-700 ">{place.extraInfo}</p>
        </div>
        </>
    )
}