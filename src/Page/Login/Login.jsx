import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';
import axios from 'axios';
// import Swal from 'sweetalert2';
// import axios from 'axios';

const Login = () => {
    const { signin,googlesignIN } = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // Login 
    const onSubmit = data => {
        signin(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  navigate(location?.state?.form  ?
                    location?.state?.form :    "/")
            })
    }
    
    // Login by google
    const handlegooglesignin = ()=>{
        googlesignIN()
        .then(res=>{
            console.log(res.user)
            const userInfo ={
                email: res.user.email,
                name: res.user.displayName,
                photo: res.user.photoURL,
            }
            axios.post('https://mobile-store-server-site.vercel.app/users',userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')
            })
        })
        .catch(error => {
            console.log(error)
            Swal.fire("Oops!", "Something wrong! try again", "error");
        })
    }

    return (
        <div className="hero min-h-screen pt-14 md:pt-20">
            <div className="hero-content flex-row lg:flex-row-reverse">
                <div className="card shadow-2xl bg-base-100">

                    <section class="bg-gray-50 min-h-screen flex items-center justify-center">

                        <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                            <div class=" px-8 md:px-16">
                                <h2 class="font-bold text-2xl text-[#002D74]">Login</h2>
                                <p class="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>

                                <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>

                                        <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" required />

                                        {errors.email && <span className='text-red-500'>Email is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>

                                        <input type="password" {...register("password", {
                                            required: true,
                                        })} placeholder="password" className="input input-bordered" required />

                                        {errors.password?.type === "required" && (
                                            <p className='text-red-500'>Password is required</p>
                                        )}

                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Login</button>
                                    </div>
                                </form>

                                <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
                                    <hr class="border-gray-400" />
                                    <p class="text-center text-sm">OR</p>
                                    <hr class="border-gray-400" />
                                </div>

                                <button onClick={handlegooglesignin} class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                                    <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                    </svg>
                                    Login with Google
                                </button>

                                <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                                    <p>Don't have an account?</p>
                                    <Link to="/register"><button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button></Link>
                                </div>
                            </div>


                        </div>
                    </section>

                    
                    {/* <div className='text-center'>
                        <p className="text-base">New User? Please <span><Link className='text-pink-600' to='/register'>Register</Link></span></p>

                    </div>
                    <div>
                        <button onClick={handlegooglesignin} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-[#002D74] text-base gap-2">
                            Login with Google<FaGoogle className="text-lg"></FaGoogle>
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Login;