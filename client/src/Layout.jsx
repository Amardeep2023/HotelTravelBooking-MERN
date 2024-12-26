import { Outlet } from "react-router-dom";
import Head from "./Head";

export default function Layout(){

    return(
        <div className="py-3 px-1  ">
        <Head/>
        <Outlet/>
        </div>
     
    );
}

