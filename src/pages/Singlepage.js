import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from '../pagecomp/Widget'

export default function Singlepage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [allphoto, setAllPhoto] = useState(false);
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/places/${id}`).then(resp => {
                setPlace(resp.data);
            })
        }
    }, [id]);
    if (!place) {
        return (
            <div role="status" className='h-max my-auto mx-auto '>
                <svg aria-hidden="true" class="inline w-20 h-20text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        );
    }
    if (allphoto) {
        return (
            <div className=" absolute bg-black inset-0 min-h-screen w-full ">
                <div className="grid bg-black px-8 py-4 gap-4">
                    <div className="fixed right-16 top-13 flex">
                        <button onClick={() => setAllPhoto(false)} className="rounded-full opacity-70 overflow-hidden hover:-translate-y-2 hover:bg-red-700 hover:scale-110 duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12  ">
                                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                            </svg>



                        </button>
                    </div>
                    {place.photos.length > 0 && place.photos.map(photo => {
                        return (
                            <div className="" key={photo}>
                                <img className="object-cover w-full aspect-video" src={"http://localhost:3001/uploads/" + photo} alt="fuck" />
                            </div>
                        );


                    })}
                </div>
            </div>
        );
    }
    return (
        <div className="flex justify-center">
            <div className="mt-8 w-3/4 bg-gray-100  rounded-2xl shadow-2xl px-8 py-6  ">
                <h1 className="text-3xl">{place.title}</h1>
                <a className=" flex gap-1 font-semibold my-2 text-gray-600 underline hover:text-black" href={"https://maps.google.com/?q=" + place.address} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    {place.address}</a>
                <div className="relative">
                    <div className=" grid gap-2 grid-cols-[2fr_1fr] overflow-hidden rounded-2xl">
                        <div  >
                            {place.photos[0] &&
                                <img className=" w-full  aspect-square object-cover" src={"http://localhost:3001/uploads/" + place.photos[0]} alt="fuck" />
                            }
                        </div>
                        <div className="">
                            {place.photos[1] &&
                                <img className="w-full round aspect-square" src={"http://localhost:3001/uploads/" + place.photos[1]} alt="fuck" />
                            }
                            <div className=" overflow-hidden">
                                {place.photos[2] &&
                                    <img className="w-full rounde aspect-square relative top-2" src={"http://localhost:3001/uploads/" + place.photos[2]} alt="fuck" />
                                }
                            </div>
                        </div>
                    </div>
                    <button className="absolute bottom-0 right-0 flex gap-1 bg-black text-white px-3 py-1 opacity-70 hover:-translate-x-1 hover:scale-105 duration-100 rounded-2xl" onClick={() => setAllPhoto(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                        Show more photo</button>
                </div>
                <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4">
                            <h2 className="font-semibold text-2xl">Description</h2>
                            {place.description}
                        </div>
                        Check-in: {place.checkIn}<br />
                        Check-out: {place.checkOut}<br />
                        Max number of guests: {place.maxguest}
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <div>
                        <h2 className="font-semibold text-2xl">Extra info</h2>
                    </div>
                    <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extrainfo}</div>
                </div>
            </div>
        </div>
    );
}