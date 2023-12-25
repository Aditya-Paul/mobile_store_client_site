import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

// image hosting
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgae_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { signup, update } = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        //console.log(data, data.image[0])
        const imageFile = { image: data.image[0] }
        const res = await axios.post(imgae_hosting_api, imageFile, {
            headers: { 'content-Type': 'multipart/form-data' }
        })
        // console.log("with image url", res.data.data.url) // check image link

        //Register
        if (res.data.success) {
            const img = res.data.data.display_url;
            signup(data.email, data.password)
                .then(res => {
                    update(data.name, data.image = img)
                        .then(() => {

                            const userinfo = {
                                name: data.name,
                                email: data.email,
                                photo: img,
                            }
                            console.log(userinfo)
                            //user post to the database
                            axios.post('https://mobile-store-server-site.vercel.app/users', userinfo)
                                .then(res => {
                                    console.log(res.data)
                                    if (res.data.insertedId) {
                                        Swal.fire("Good job!", "Registered Successfully & Posted to the database, Welcome", "success");
                                        reset()
                                        navigate('/')

                                    }
                                })


                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(error => {
                    Swal.fire(`"Oops!", "Something wrong! try again", "error"`);
                })
        }

    }


    return (
        <div className="hero min-h-screen pt-14 md:pt-20">
            <div className="hero-content flex-row lg:flex-row-reverse">
                <div className="card shadow-2xl bg-base-100">

                    <section class="bg-gray-50 min-h-screen flex items-center justify-center">

                        <div class="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                            <div class=" px-8 md:px-16">
                                <h2 class="font-bold text-2xl text-[#002D74]">Register</h2>
                                

                                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                    {/* Name */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>

                                        <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" required />

                                        {errors.name && <span className='text-red-500'>Name is required</span>}

                                    </div>
                                    {/* Image */}
                                    <div className='form-control w-full my-6'>
                                        <p>Choose your photo</p>
                                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                                    </div>

                                    {/* Email */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>

                                        <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" required />

                                        {errors.email && <span className='text-red-500'>Email is required</span>}

                                    </div>
                                    {/* Password */}
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
                                    {/* Register Button */}
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary">Register</button>
                                    </div>
                                </form>

                                <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
                                    <hr class="border-gray-400" />
                                    <p class="text-center text-sm">OR</p>
                                    <hr class="border-gray-400" />
                                </div>



                                <div class="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                                    <p>Don't have an account?</p>
                                    <Link to="/login"><button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button></Link>
                                </div>
                            </div>


                        </div>
                    </section>


                    
                </div>
            </div>
        </div>
    );
};

export default Register;
