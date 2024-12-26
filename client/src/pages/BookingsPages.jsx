import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";  // For making API requests
import AddressLink from "../AddressLink";  // Assuming this is a component to show the address
import PlaceGallery from "./PlaceGallery";
import BookingDates from "./BookingDates";

export default function BookingsPages() {
  const { id } = useParams(); // Get booking ID from the URL
  const [booking, setBooking] = useState([]); // State to store the fetched booking data

  // Fetch data when component mounts or when 'id' changes
  useEffect(() => {
    if (id) {
      axios.get('/bookings')  // Send a GET request to the API to get all bookings
        .then(response => {
          // Find the booking based on the ID
          const foundBooking = response.data.find(({ _id }) => _id === id);
          if (foundBooking) {
            setBooking(foundBooking);  // Set the found booking to state
          }
        })
        .catch(error => {
          console.error("Error fetching booking data:", error);  // Log any errors
        });
    }
  }, [id]);  // Dependency array ensures this effect runs whenever 'id' changes

  // If no booking is found, show a loading message or empty
  if (!booking) {
    return <div>Loading...</div>;
  }

  return (

   <div className="p-8 m-5 bg-slate-200 rounded-2xl smdev:mt-14">

    
    {Array.isArray(booking?.place) && booking.place.map((place, placeIndex) => (
     <div key={placeIndex}>
     <h1 className="text-3xl">{place.title}</h1>
     
     
      <AddressLink ><h2 className="font-semibold smdev:mt-1">{place.address}</h2></AddressLink>
      <div className="bg-slate-300 mt-5 mb-5 rounded-2xl p-4 smdev:">
        <div className="smdev:flex smdev:text-xl smdev:mb-2 smdev:font-bold"><h2 className="mb-1">Your Booking Information:-</h2></div>
       <div className="font-semibold"><BookingDates booking={booking}/></div> 
        <h2 className="mt-1 font-semibold text-xl">Total Price:- Rs {booking.price}/-</h2>
        </div>
      <PlaceGallery place={place}/>
     </div>
     ))}

   </div> 
  ); 
}
