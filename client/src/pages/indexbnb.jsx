import axios from "axios";

import Head from "../Head";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Indexbnb(){
    const[places,setPLaces]=useState([]);

    useEffect(()=>{
        axios.get('https://hoteltravelbooking-mern.onrender.com/api/places').then(response=>{
            setPLaces(response.data);
        })
    },[])
    return(

        <div  className="  grid grid-cols-2 w-max mt-6 pt-2 md:grid-cols-3 lg:grid-cols-6 smdev:flex smdev:flex-col smdev:m-auto  ">
            {places.length>0 && places.map(place=>(
                <Link to={'/place/'+place._id} className="bg-slate-200 rounded-xl p-2 m-4 w-max ">

                    {place.addedphotos?. [0] && (
                        <img className="w-64 h-64 border rounded-2xl smdev:w-80 smdev:h-80 " src={'http://localhost:4000/uploads/'+place.addedphotos?.[0]} alt="" />
                    )}
                    <h2 className="text-sm truncate font-bold">{place.address}</h2>
                    <h2 className="text-sm text-slate-500 font-semibold">{place.title}</h2>
                    <h2 className="text-sm truncate font-bold">Rs.{place.price}/- per night</h2>
                </Link>
            ))}
        </div>
    );
}