import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/Ursecontext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacePage from "../pagecomp/PlacesPage";
import Booking from "../pagecomp/Bookings";

export default function Account() {
    const { user, ready, setUser, setPlaces } = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    let { subpage } = useParams();
    useEffect(() => {
        try {
            if (user) {
                axios.get('http://localhost:3001/user-places').then(res2 => {
                    setPlaces(res2.data);
                    //console.log(res2.data);
                });
            }
        } catch (e) {
            console.log(e);
        }

    }, [user,subpage,setPlaces])
    if (subpage === undefined) {
        subpage = 'profile';
    }
    async function logout() {
         await axios.post('http://localhost:3001/logout');
        setRedirect('/')
        setUser(null);
    }
    //console.log(user);
    
    if (!user) {
        //console.log('hii there')
        return <Navigate to={'/login'} />
    }
    if (!ready) {
        return <div>Loading...</div>
    }
    if (redirect) {
        return <Navigate to={redirect} />
    }
    function linkclass(llink = undefined) {
        if (llink === subpage) {
            return clhighlight + " " + cl;
        }
        return cl + 'bg-gray-100 hover:bg-red-100';
    }
    //console.log(subpage);
    let cl = 'px-6 py-2 flex gap-1 rounded-full  text-lg hover:-translate-y-1 hover:scale-110 duration-300 ';
    let clhighlight = 'bg-primary rounded-full text-white'
    return (
        <div>
            <div className="w-full flex gap-5 justify-center mt-7  mb-5">
                <Link to={'/account/profile'} className={linkclass('profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-7">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>

                    Profile</Link>
                <Link to={'/account/bookings'} className={linkclass('bookings')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-7">
                        <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                    </svg>

                    My Bookings</Link>
                <Link to={'/account/places'} className={linkclass('places')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-7">
                        <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
                        <path fill-rule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.202 7.616.592a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clip-rule="evenodd" />
                        <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
                    </svg>

                    My Accomodation</Link>

            </div>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    loggen In as {user.name} using email {user.email}
                    <button onClick={logout} className="primary max-w-sm text-white font-semibold">LogOut</button>
                </div>
            )}
            {subpage === 'places' && <PlacePage />}
            {subpage === 'bookings' && <Booking/> }
        </div>
    );
}