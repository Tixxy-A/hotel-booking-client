import {Link} from 'react-router-dom'
import { UserContext } from '../context/Ursecontext';
import { useContext } from 'react';

export default function Header(){
    const {user}=useContext(UserContext);
    const re=user?'/account':'/login';
    return (
        <header className=" flex justify-between ">
                <Link to="/" className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 -rotate-90">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg> <span className="font-bold text-xl text-primary">Airbnb</span>
                </Link>
                <div className="flex border border-grey-300 rounded-full px-4 py-2 justify-between gap-3 shadow-md shadow-gray-300">
                    <div className='font-semibold'>Anywherewhy</div>
                    <div className="border-l border-gray-300"></div>
                    <div className='font-semibold'>Any week</div>
                    <div className="border-l border-gray-300"></div>
                    <div className='font-semibold'>Any guest</div>
                    <button className="bg-primary text-white rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                    </button>
                </div>
                <Link to={re} className="flex border border-grey-300 rounded-full px-4 py-2 items-center justify-between gap-2 border-gray-300 hover:-translate-y-1 hover:scale-110 hover:bg-gray-300 duration-200 shadow-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
                        </svg>

                    </div>
                    <div>
                     {!!user && user.name}</div>
                </Link>
            </header>
    );
}