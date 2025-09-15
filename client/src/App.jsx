import { Routes, Route } from "react-router-dom";
import "./App.css";
import Indexbnb from "./pages/indexbnb";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./usercontext";


import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import PlacesPages from "./pages/PlacesPages";
import PlacesForm from "./pages/PlacesForm";
import PlaceDesc from "./pages/PlaceDescPage";
import BookingsPages from "./pages/BookingsPages";
import BookingMul from "./pages/BookingMulPages";

axios.defaults.baseURL = "https://hoteltravelbooking-mern.onrender.com";


axios.defaults.withCredentials = true;
function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Indexbnb />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage/>}/>
            <Route path="/account/places" element={<PlacesPages/>}/>
            <Route path="/account/places/new" element={<PlacesForm/>}/>
            <Route path="/account/places/:id" element={<PlacesForm/>}/>
            <Route path="/place/:id" element={<PlaceDesc/>}/>
            
            <Route path="/account/bookings" element={<BookingMul/>}/>
            <Route path="/account/bookings/:id" element={<BookingsPages/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
