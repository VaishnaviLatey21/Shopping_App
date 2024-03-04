import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../Images/logo.png";
import { HiOutlineShoppingBag } from "react-icons/hi";


function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const auth = localStorage.getItem('users');

    const navigate = useNavigate()

    const logOut = () => {
        console.log("logout");
        localStorage.clear();
        navigate("/signup");

    }

    return (
        <div className='wrapper'>
            <div className='border-b-2 border-gray-200 pb-3'>
                <div className='flex justify-between items-center text-lg font-bold mt-4 '>
                    <div className='flex items-center'>
                        <Link to='/'>
                            <img src={logo} className='w-20 h-12 ml-3' alt='Logo' />
                        </Link>
                        <div className="hidden md:flex ml-8 gap-6">
                            <NavLink to='/' className={({ isActive }) =>
                                `${isActive ? "text-rose-500 border-b border-rose-500" : "text-gray-700"}  hover:text-rose-500 mr-4`
                            }>Home</NavLink>
                            <NavLink to='/products' className={({ isActive }) =>
                                `${isActive ? "text-rose-500 border-b border-rose-500" : "text-gray-700"}  hover:text-rose-500 mr-4`
                            }>Products</NavLink>
                            <NavLink to='/clothes' className={({ isActive }) =>
                                `${isActive ? "text-rose-500 border-b border-rose-500" : "text-gray-700"}  hover:text-rose-500 mr-4`
                            }>Clothes</NavLink>
                            <NavLink to='/electronics' className={({ isActive }) =>
                                `${isActive ? "text-rose-500 border-b border-rose-500" : "text-gray-700"}  hover:text-rose-500 mr-4`
                            }>Electronics</NavLink>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {
                            auth ? <NavLink to='/signup' className="mr-8" onClick={logOut}>Logout</NavLink> :
                                <NavLink to='/signup' className={({ isActive }) =>
                                    `${isActive ? "text-rose-500 border-b border-rose-500" : "text-gray-700"} mr-8 hover:text-rose-500 `
                                }>SignUp</NavLink>
                        }
                        <NavLink to='/cart' className={({ isActive }) =>
                            `${isActive ? "text-rose-500 border-b" : "text-gray-700"} mr-8 text-[25px] hover:text-rose-500 `
                        }><HiOutlineShoppingBag /></NavLink>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
