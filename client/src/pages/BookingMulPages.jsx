import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import {differenceInCalendarDays} from "date-fns";
import { Link } from "react-router-dom";

export default function BookingMul(){
 
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings')
            .then(response => {
                console.log(response.data);
                setBookings(response.data);
            })
            .catch(error => {
                console.error("Error fetching bookings:", error);
            });
    }, []);

    return (
        <div>
    <AccountNav />
    <h1 className="text-2xl mb-5 text-center mt-5 bg-slate-300 m-auto w-64 rounded-xl">
        My Bookings
    </h1>

    {bookings.map((booking, index) => (
        <div key={index} className="m-6">
            {booking.place.map((place, placeIndex) => (
                <Link to={`/account/bookings/${booking._id}`} key={placeIndex} className="mb-5">
                    <div className="flex gap-4 bg-slate-300 w-10/12 m-auto p-2 rounded-xl smdev:w-96 ">
                        {place.addedphotos[0]?.length > 0 && (
                            <img
                                className="w-44 rounded-md smdev:w-44 smdev:h-40"
                                src={`https://hoteltravelbooking-mern.onrender.com/api/uploads/${place.addedphotos[0]}`}
                                alt="Main Photo"
                            />
                        )}
                        <div className="flex flex-col ">
                            <h4 className="text-lg font-semibold">{place.title}</h4>
                            <p className="flex gap-2 smdev:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>

                                Check-in: {new Date(booking.checkIn).toLocaleDateString()} ---- Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>  
                            <p className="flex gap-2 mt-1 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                             </svg>

                                {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))} Nights</p>
                            <p className="font-semibold text-xl">Total Price:-Rs {booking.price}/-</p>
                           
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    ))}
</div>

    );
}