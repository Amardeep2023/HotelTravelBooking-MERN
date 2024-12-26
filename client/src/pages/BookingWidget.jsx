import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../usercontext";


export default function BookingWidget({place}){

    const[checkIn,setCheckIn]=useState('');
    const[checkOut,setCheckOut]=useState('');
    
    const[maxGuest,setmaxGuest]=useState(1);
    const[name,setName]=useState('');
    const[phone,setPhone]=useState('');
    const[redirect,setRedirect]=useState('')
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])
    
    let NoOfNights=0;
    if(checkIn && checkOut){
        NoOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))

    }


   async function BookMyPlace(){
        const response=await axios.post('/bookings',{name,
            checkIn,checkOut,maxGuest,phone,
            place:place._id,
            price:NoOfNights*place.price,
        });
        const BookingId=response.data._id;
        setRedirect(`/account/bookings/${BookingId}`);

    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    



    return(
        <div className="bg-white rounded-2xl mt-2 text-center">
        <h2 className="text-2xl ">Price Per Night:-{place.price}/-</h2>
        <div className="grid grid-cols-2 mt-2">
            <div className="text-start ml-3 m-5 shadow rounded-xl px-2 py-1 bg-slate-100">
            <span className="font-semibold">Check In:-</span>
                <input type="date" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)} />
            </div>
            <div className="text-start ml-3 m-5 shadow rounded-xl px-2 p-1 bg-slate-100">
                <span className="font-semibold">Check Out:-</span>
                <input type="date" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)} />
            </div>
            
        </div>
        <div className="bg-slate-100 rounded-xl shadow p-5 m-4 mt-1">
            <span>Max Guest</span>
            <input className="ml-5 border-t" type="number" value={maxGuest} onChange={ev=>setmaxGuest(ev.target.value)} />
        </div>

        {NoOfNights >0&&(
           <>
           <div className="bg-slate-100 rounded-xl shadow p-5 m-4 mt-1 flex">
           <span> Full Name:-</span>
           <input className="ml-5 border-t bg-slate-20 rounded-xl text-yellow-800" type="text" value={name} onChange={ev=>setName(ev.target.value)} />
           </div>

           <div className="bg-slate-100 rounded-xl shadow p-5 m-4 mt-1">
            <span>Mobile No.-</span>
            <input className="ml-5 border-t" type="tel" value={phone} onChange={ev=>setPhone(ev.target.value)} />
           </div> 
           </> 
        )}

        <button onClick={BookMyPlace} className="bg-red-500 items-center gap-5 rounded-2xl w-11/12 text-white p-1 mb-3 mt-3 ">
        <span>Book Now</span>
        {NoOfNights>0 &&(
            <span className="ml-5 font-semibold ">Rs {NoOfNights*place.price}/-</span>
        )}
        
        </button>
    </div>

    )
}