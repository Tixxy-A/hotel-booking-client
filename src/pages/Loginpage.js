import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../context/Ursecontext';

export default function Loginpage() {
    const { register, handleSubmit } = useForm();
    const [redirect, setRedirect] = useState(false);
    const {setUser}=useContext(UserContext)
    async function loginhandler(val) {
        try {
            //console.log(val);
            const m = await axios.post('http://localhost:3001/login', val);
            //console.log(m.data);
            setUser(m.data);
            alert(m.data);
            setRedirect(true);

        } catch (e) {
            console.log(e)
            alert(e);

        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }
    return (
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4 font-semibold">LogIn</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit(loginhandler)}>
                    <input type="email" name='email' placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Please enter name",
                            },
                        })} />
                    <input type="password" name='password' placeholder="password"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Please enter name",
                            },
                        })} />
                    <button className="primary text-white">Login</button>
                    <div className='text-center mt-2'>
                        Don't have an account yet?
                        <Link className='underline text-blue-700' to={'/register'}> Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}