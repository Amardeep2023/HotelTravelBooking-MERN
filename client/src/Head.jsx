import { useContext } from "react";
import { Link } from "react-router-dom";
import{UserContext} from './usercontext';

export default function Head() {

  const{user}=useContext(UserContext);

    return (
        <header className="flex gap-1 p-3 justify-between items-center  ">
       <Link to={'/'}> <div className="logo mr-20 flex gap-1 max-[480px]:ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="red"
            className="size-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl  text-red-500">Airbnb</span>
        </div>
        </Link>

        <div className="flex gap-3 items-center smdev:hidden  ml-44  border-gray-400 border rounded-3xl p-2 shadow shadow-slate-600 hover:shadow-slate-800">
          <span className="font-bold text-md">Anywhere |</span>
          <span className="font-bold text-md">Any Week |</span>
          <span className="text-slate-500 items-center justify-center">
            Add Guest
          </span>
          
          <button  className=" border rounded-3xl p-1 bg-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="size-5  "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-3 items-center  ml-40  border-gray-400 border rounded-3xl smdev:ml-2 ">
          
          <Link to={user? '/account':'/login'}> <span className="flex gap-2  border-gray-200 border rounded-3xl p-2 shadow shadow-slate-600 hover:shadow-slate-800 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
           
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            {!!user && (
            <div >
              {user.name}
            </div>
          )}
          </span>
        
          </Link>
          
        </div>
      </header>
    );
}