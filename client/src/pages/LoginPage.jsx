
import { Link, Navigate } from "react-router-dom";

import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../usercontext";

export default function LoginPage(){

  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [redirect,setredirect]=useState(false);

  const {setUser}= useContext(UserContext)

    async function handleLogin(e) {
    e.preventDefault();
    try {
     const {data}= await axios.post('https://hoteltravelbooking-mern.onrender.com/api/login',{email,password});
     setUser(data);
      alert('Login Successful!')
      setredirect(true);

    } catch (e) {
      alert('Login Unsuccessful,Please check your Email or Password')
    }
    
  }
  if (redirect){
    return <Navigate to={'/'}/>
  }
 

    return (
      <>
      
      <div>
        
        <form className="flex flex-col gap-3 justify-center max-w-md m-auto mt-20 max-[480px]:w-auto" onSubmit={handleLogin} >
        <span className="text-center text-2xl font-semibold">Login</span>
            <input className="rounded-3xl border-2 justify-center p-2" type="email" placeholder="abc@gmail.com" value={email}
            onChange={e=>setemail(e.target.value)} />
            <input className="rounded-3xl border-2 justify-center p-2" type="password" placeholder="Password" value={password}
            onChange={e=>setpassword(e.target.value)}/>
            <input className="rounded-3xl border-2 justify-center p-2 bg-red-500 text-white" type="submit" value="Login" />
            <div className="text-center">
          Don't have an Account 
          <Link className="font-bold ml-1 underline decoration-2" to ={'/register'}>Register</Link>
        </div>
        </form>
       
      </div>
      </>
    );

}