import React, { useContext, useEffect, useState } from "react";

import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form'
import axios from "axios";
import { UserContext } from "../context/Ursecontext";
import Perks from "./Perks";


export default function PlacePage() {
    const { action } = useParams();
    //const [places, setPlaces] = useState([]);
    const { places } = useContext(UserContext);

    const { watch, register, handleSubmit, setValue } = useForm({ mode: "all" });
    const [addedphotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [redirects, setRedirects] = useState(false);

    useEffect(() => {
        if (action && action !== 'new') {
            axios.get(`http://localhost:3001/places/${action}`).then(res => {
                //console.log(watch(['title']));
                setValue('title', res.data.title);
                setValue('address', res.data.address);
                setValue('description', res.data.description);
                setValue('extrainfo', res.data.extrainfo);
                setValue('checkin', res.data.checkIn);
                setValue('checkout', res.data.checkOut);
                setValue('maxguest', res.data.maxguest);
                setValue('price', res.data.price);
                setAddedPhotos(res.data.photos);
                //console.log(watch());
            })
        }
    }, [action,setValue])

    async function formsubmit(val) {
        val.addedphotos = addedphotos;
        val.perks = perks;
        //console.log(action);
        console.log(val)
        if (action === 'new') {
            await axios.post('http://localhost:3001/places', val);
            setRedirects(true);
            //console.log(reply);
        }
        else {
           // console.log("hii")
         await axios.put('http://localhost:3001/places/' + action, val);
            setRedirects(true);

        }

    }
    //console.log(redirects);
    if (redirects) {
        return <Navigate to={'/account/'} />
    }

    async function addphotobylink() {
        await axios.post('http://localhost:3001/add-by-link', { link: watch(['photolink'])[0] });
        //console.log(reply);v
    }

    async function uploadphoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
           // console.log(files[i]);
        }
        const r = await axios.post('http://localhost:3001/upload', data, {
            headers: { 'Content-Type': 'multipart/form-data' }

        });
        const arr = r.data;
        setAddedPhotos(prev => {
            return [...prev, ...arr];
        })


    }

    function perksHandler(ev) {
        const { checked, name } = ev.target;
        if (checked) {
            setPerks(prev => {
                return [...prev, name]
            })
        } else {
            setPerks(prev => {
                return prev.filter(item => item !== name)
            })
        }

    }

    function removePhoto(e,link) {
        e.preventDefault();
        
        //console.log(addedphotos ,'remove')
        setAddedPhotos(prev => {
            return prev.filter(item => item !== link)
        })
    }
    //console.log(addedphotos,'remove')
    
    function marqeePhoto(e,link) {
        e.preventDefault();
        //console.log(addedphotos,'mar')
        let i = addedphotos.indexOf(link);
        console.log(i);
        setAddedPhotos(prev => {
            let temp = prev[0];
            prev[0] = prev[i];
            prev[i] = temp;
            return prev;
        })
    }
   // console.log(addedphotos,'mar')
    //console.log(action);
    //console.log(addedphotos);
    //console.log(places);
    return (
        <div>

            {!action &&
                <div>
                    <div className="text-center mt-12">

                        <Link className="inline-flex gap-1 bg-primary text-white px-8 py-2 rounded-full hover:-translate-y-1 hover:scale-110 hover:bg-red-700 duration-100" to={'/account/places/new'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>

                            Add new Place</Link>


                    </div>
                    {places.length > 0 && places.map(place => (
                        <div className="flex justify-center">
                        <Link to={'/account/places/' + place._id} className="flex gap-5 w-3/4 bg-gray-100 p-4 mt-5 rounded-3xl shadow-inner hover:bg-gray-200 cursor-pointer" key={place._id}>
                        <div className=" shrink-0 transitin w-1/6 h-30 eas-in-out delay-10 hover:-translate-y-1 hover:scale-110 duration-300">
                            <img className="w-full object-cover rounded-xl aspect-square" src={'http://localhost:3001/uploads/' + place.photos[0]} alt="fuck" />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-lg font-bold">{place.title}</h2>
                            <p className="text-md mt-2 leading-7">{place.description}</p>
                        </div>

                    </Link>
                        </div>
                    ))}

                </div>
            }
            {action && (
                <div>
                    <form onSubmit={handleSubmit(formsubmit)}>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <input type="text" placeholder="Title" name="title"  {...register("title", {
                            required: {
                                value: true,
                                message: "Please enter name",
                            },
                        })} />
                        
                        <h2 className="text-2xl mt-4" >Address</h2>
                        <input type="text" placeholder="Address"  {...register("address", {
                            required: {
                                value: true,
                                message: "Please enter name",
                            },
                        })} />
                        <h2 className="text-2xl mt-4" >Photos</h2>
                        <div className="flex gap-4">
                            <input type="text" placeholder="Add photo using Link ...."  {...register("photolink", {

                            })} />
                            <button onClick={addphotobylink} className="bg-gray-200 px-6 rounded-2xl">Add&nbsp;Photo</button>
                        </div>
                        <div className="mt-4 grid gap-2 grid-cols-3  md:grid-cols-6 lg:grid-cols-8 ">
                            {addedphotos.length > 0 && addedphotos.map(link => {
                                return (
                                    <div className="h-32 flex relative item-center" key={link}>
                                        <img src={'http://localhost:3001/uploads/' + link} className="rounded-2xl w-full object-cover" alt="fuck" />
                                        <button className="absolute bottom-1 right-1 bg-black text-white p-1 rounded-xl bg-opacity-50 hover:-translate hover:scale-110" onClick={(e) => removePhoto(e,link)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>

                                        </button>
                                        <button className="absolute bottom-1 left-1 bg-black text-white p-1 rounded-xl bg-opacity-50 hover:-translate hover:scale-110" onClick={(e) => marqeePhoto(e,link)}>
                                            {link === addedphotos[0] && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={'yellow'} class="w-6 h-6">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                                            </svg>
                                            }
                                            {link !== addedphotos[0] && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>}



                                        </button>
                                    </div>
                                )

                            })}
                            <label className="cursor-pointer flex gap-2 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                <input type="file" className="hidden" multiple onChange={uploadphoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>


                                Upload</label>
                        </div>
                        <h2 className="text-2xl mt-4">Description</h2>
                        <textarea placeholder="add description"  {...register("description", {
                            required: {
                                value: true,
                                message: "Please enter name",
                            },
                        })} />

                        <h2 className="text-2xl mt-4">Perks</h2>
                        <div className="grid mt-4 gap-2 grid-cols-3" >
                            <Perks onChange={perksHandler} />
                        </div>

                        <h2 className="text-2xl mt-4">Extra Information</h2>
                        <p className="text-gray-500 text-sm mt-1 mb-2">House rules and regulations ETC</p>
                        <textarea placeholder="add informations"  {...register("extrainfo", {
                            required: {
                                value: true,
                                message: "Please enter name",
                            },
                        })} />

                        <h2 className="text-2xl mt-4">Check In&Out time</h2>
                        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 ">
                            <div className="">
                                <h3 className="mt-2 mb-1 text-xl">check-In time</h3>
                                <input className="cursor-pointer" type="time"   {...register("checkin", {
                                    required: {
                                        value: true,
                                        message: "Please enter name",
                                    },
                                })} />
                            </div>
                            <div className="">
                                <h3 className="mt-2 mb-1 text-xl">check-Out time</h3>
                                <input className="cursor-pointer" type="time"  {...register("checkout", {
                                    required: {
                                        value: true,
                                        message: "Please enter name",
                                    },
                                })} />
                            </div>
                            <div className="">
                                <h3 className="mt-2 mb-1 text-xl">maximum guest</h3>
                                <input type="number" placeholder="Max guests" {...register("maxguest", {
                                    required: {
                                        value: true,
                                        message: "Please enter name",
                                    },
                                })} />
                            </div>
                            <div className="">
                            <h3 className="mt-2 mb-1 text-xl">Price per night</h3>
                            <input type="number" placeholder="cost per night...." {...register("price", {
                                required: {
                                    value: true,
                                    message: "Please enter name",
                                },
                            })} />
                        </div>

                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="items-center my-6 bg-primary text-white w-1/2 py-2 rounded-full text-xl">
                            {action==='new' && 'Add this place'}
                            {action!=='new' && 'Update this place'}
                            </button>

                        </div>





                    </form>
                </div>
            )}

        </div>


    )
}