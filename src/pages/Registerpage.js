import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios';
export default function Loginpage() {
    const { register, handleSubmit } = useForm();
    async function registerHandler(val){
       // e.preventDefault();
        //console.log(val)
        try{
          await axios.post('/register',val).then(res=>{
          console.log(res.data);
          alert('Registered successfully');
        })
        }catch(e){
          alert(e.message);
        }
    }
    return (
        <div className="mt-5 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-3xl text-center mb-4 font-semibold">SignUp</h1>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit(registerHandler)}>
                    <input type="text" name='name' placeholder="name"  
                    {...register("name", {
                        required: {
                          value: true,
                          message: "Please enter name",
                        },
                      })} />
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
                      })}/>
                    <button type='submit' className="primary text-white">Register</button>
                    <div className='text-center mt-2'>
                    Already have an account?
                    <Link className='underline text-blue-700' to={'/login'}> Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}