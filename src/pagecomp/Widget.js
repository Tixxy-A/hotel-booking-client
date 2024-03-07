import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/Ursecontext";
export default function Widget({ place }) {
    const { user } = useContext(UserContext);
    const [checkIn, setCheckIn] = useState(new Date());
    const [checkOut, setCheckOut] = useState(new Date());
    const [dis, setDis] = useState(true);
    const [numberOfGuest, setNumberOfGuest] = useState(0);
    const [numberofnights, setNumberOfNights] = useState(0);
    const [name, setName] = useState(user.name);
    const [mobile, setMobile] = useState();
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState([{
        name: 'checkin',
        status: false,
        msg: "Enter a valid Check-In date"
    },
    {
        name: 'checkout',
        status: false,
        msg: "Enter a valid Check-Out date"
    },
    {
        name: 'numberofguests',
        status: false,
        msg: "Enter a valid number of guest"
    }]);



    useEffect(() => {
        //console.log('Entering')
        if (checkIn && new Date(checkIn) > new Date()) {
            setError(prev => {
                return prev.map(item => {
                    if (item.name === 'checkin') {
                        item.status = true;

                    }
                    return item;
                })
            })
        } else {
            setError(prev => {
                return prev.map(item => {
                    if (item.name === 'checkin') {
                        item.status = false;
                    }
                    return item;
                })
            })
        }
        if (checkOut && checkOut > checkIn) {
            setError(prev => {
                return prev.map(item => {
                    if (item.name === 'checkout') {
                        item.status = true;
                    }
                    return item;
                })
            })
        }
        else {
            setError(prev => {
                return prev.map(item => {
                    if (item.name === 'checkout') {
                        item.status = false;
                    }
                    return item;
                })
            })
        }
        if (numberOfGuest > 0) {
            setError(prev => {
                return prev.map(item => {
                    if (item.name === 'numberofguests') {
                        item.status = true;

                    }
                    return item;
                })
            })
        }
        else {
            setError(prev => {
                return prev.map(item => {
                    if (item.name === 'numberofguests') {
                        item.status = false;

                    }
                    return item;
                })
            })
        }
        if (checkIn && checkOut) {
            setNumberOfNights(differenceInCalendarDays(new Date(checkOut), new Date(checkIn)));
            // console.log(numberofnights)
        }
        //console.log(error)
        //console.log(new Date(checkIn), new Date());
        if (new Date(checkIn) >= new Date() && checkOut > checkIn && numberOfGuest > 0) {
            setDis(false)
        }
        else {
            setDis(true);
        }

    }, [checkIn, checkOut, numberOfGuest])

    async function showhandler() {

        await axios.post('/booking', {
            checkIn,
            checkOut,
            numberOfGuest,
            name,
            mobile,
            price: numberofnights * place.price,
            place: place._id,
        })
        setRedirect(`/account/bookings`);

    }
    if (redirect) {
        return <Navigate to={redirect} />
    }






    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in:</label>

                        <input type="date" value={checkIn}
                            onChange={(ev) => setCheckIn(ev.target.value)}
                        />
                    </div>

                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <input type="date" value={checkOut}
                            onChange={(ev) => setCheckOut(ev.target.value)}
                        />
                    </div>
                </div>

                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input type="number" value={numberOfGuest}
                        onChange={(ev) => setNumberOfGuest(ev.target.value)}
                    />
                </div>
                {numberofnights > 0 &&
                    <div>
                        <div className="py-3 px-4">
                            <label>Full Name</label>

                            <input type="text" value={name}
                                onChange={(ev) => setName(ev.target.value)}
                            />
                        </div>
                        <div className="py-3 px-4">
                            <label>Mobile Number</label>

                            <input type="tel" value={mobile}
                                onChange={(ev) => setMobile(ev.target.value)}
                            />
                        </div>
                    </div>
                }

            </div>
            {error.map(item => {
                if (item.status === false) {
                return (

                    <div key={item.name} className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3" role="alert">
                        <p className="text-sm font-semibold">{item.msg}</p>
                    </div>

                    );
                }
                return null;
            })}
            <button className="primary text-white mt-4 disabled:opacity-50" onClick={showhandler}
                disabled={dis}>
                Book this place .{numberofnights > 0 && <span> ${numberofnights * place.price}</span>}

            </button>
        </div>
    );
}