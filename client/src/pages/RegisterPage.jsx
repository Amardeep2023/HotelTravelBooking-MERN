import axios from 'axios';
import { Link } from "react-router-dom";

import { useState } from "react";
export default function LoginPage(){


  const [name, setname] = useState('');
  const [email,setemail] =useState('');
  const [password,setpassword] =useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    
    await axios.post("/register",{
      name,
      email,
      password,

    })
     alert('Registration Successfull ')
  };
  

    return (
      <div>
        
        <form className="flex flex-col gap-3 justify-center max-w-md m-auto mt-20" onSubmit={handleSubmit}>
        <span className="text-center text-2xl font-semibold">Register</span>
        <input className="rounded-3xl border-2 justify-center p-2" type="text" placeholder="John" 
             value={name}
             onChange={e=>setname(e.target.value)}/>
             
            <input className="rounded-3xl border-2 justify-center p-2" type="email" placeholder="abc@gmail.com"
             value={email}
             onChange={e=>setemail(e.target.value)}/>
            <input className="rounded-3xl border-2 justify-center p-2" type="password" placeholder="Password" 
            value={password}
            onChange={e=>setpassword(e.target.value)}/>
            <input className="rounded-3xl border-2 justify-center p-2 bg-red-500 text-white" type="submit" value="Register" />
            <div className="text-center">
          Already have an Account 
          <Link className="font-bold ml-1 underline decoration-2" to ={'/login'}>Login</Link>
        </div>
        </form>
       
      </div>
    );

}