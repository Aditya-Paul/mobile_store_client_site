import { Link } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { useContext } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import UseCarts from '../../Hook/UseCarts';

const Navbar = () => {
    const { user, userlogout } = useContext(AuthContext)
    const [carts] = UseCarts()
    //console.log(user)

    const links1 = <>
        <li><Link className="text-black text-xl" to='/'>Home</Link></li>
        <li><Link className="text-black text-xl" to='/collection'>Store</Link></li>
        {
            user ?
                <li onClick={userlogout}><Link className="text-black text-xl" >Logout</Link></li>

                :
                <li><Link className="text-black text-xl" to='/login'>Login</Link></li>

        }
    </>
    return (
        <div>
            <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-30  bg-white text-black " >

                <div className="navbar-start gap-4">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            <div className="flex-row text-green-400">
                                {

                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                        {links1}
                                    </ul>
                                }
                            </div>
                        </label>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <img src="https://i.ibb.co/R3PZpph/store-logo-1-Photo-Room.jpg" className="w-12 h-12" alt="" />
                        <h2 className=" normal-case text-xl font-extrabold">SparkCart</h2>
                    </div>

                </div>
                <div className="navbar-center hidden lg:flex">
                    {

                        <ul className="menu menu-horizontal px-1">
                            {links1}
                        </ul>
                    }
                </div>
                <div className="navbar-end gap-4">
                    <div>

                            <div><Link className="text-black text-xl" to='/carts'><FaCartPlus /></Link></div>
                    </div>
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border-2 border-gray-600">
                                        <img alt="" src={user.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                    <li><a className="text-black">{user.displayName}</a></li>

                                </ul>
                            </div>
                            :
                            ""
                    }
                    <div className="flex flex-col md:flex-row  items-center gap-2">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;