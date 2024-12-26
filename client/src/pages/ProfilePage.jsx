import { useContext, useState } from "react";
import { UserContext } from "../usercontext.jsx";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import PlacesPages from "./PlacesPages.jsx";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  async function logout() {
    await axios.post("/logout");

    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }


  return (
    <>
      <div>
        <AccountNav/>
        
        {subpage === "profile" && (
          <div className="text-center font-semibold flex flex-col mt-4">
            Logged in as {user.name} and {user.email}
            <button
              onClick={logout}
              className="border m-auto px-20 py-2 mt-4 rounded-full text-white bg-red-500"
            >
              Logout
            </button>
          </div>
        )}
        {subpage === "places" && <PlacesPages />}
      </div>
    </>
  );
}
