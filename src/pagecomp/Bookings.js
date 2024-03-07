import axios from "axios";
import { format } from "date-fns";
import { differenceInCalendarDays } from "date-fns/esm";
import { useEffect, useState } from "react";
import {  Link } from "react-router-dom"

export default function Booking() {
    //const { action } = useParams();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/booking').then(res => {
            setBookings(res.data);
            //console.log(res.data);
        })
    }, [])
    // console.log(action);
    if(bookings.length===0){
        return(
            <div className="flex justify-center">
                <h1 className="text-2xl font-semibold text-gray-800">No Bookings</h1>
            </div>
        )
    }
    return (
        <div>
            {bookings.map(booking => {
                return (
                    <div className="flex justify-center">
                        <Link to={'/account/bookings/' + booking._id} className="flex w-3/5 gap-5 bg-gray-200 p-4 mt-5 rounded-3xl shadow-inner hover:bg-gray-200 cursor-pointer" key={booking._id}>
                            <div className=" shrink-0  transitin w-1/6 ease-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
                                <img className="object-cover  rounded-xl aspect-square" src={'http://localhost:3001/uploads/' + booking.place.photos[0]} alt="fuck" />
                            </div>
                            <div className="grow shrink">
                                <h2 className="font-semibold text-lg ">{booking.place.title}</h2>
                                <div className="flex gap-1 border-t border-gray-400 my-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>

                                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                    </svg>
                                    {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                                </div>
                                <div className="flex gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clip-rule="evenodd" />
                                    </svg>

                                    Nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} <br></br>
                                    </div>
                                    Price: ${booking.price}

                            </div>

                        </Link>
                    </div>
                )
            })
            }
        </div>
    )
}