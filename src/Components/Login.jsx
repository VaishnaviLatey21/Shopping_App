import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        console.log( email, password);
        const result = await fetch("http://127.0.0.1:5000/login", {
            method: 'post',
            body: JSON.stringify({email,password}),
            headers: {
                'content-type': 'application/json',
            }
        });
        const results = await result.json();
        console.log(results);
        // navigate("/");
        if  (results.name) {
            localStorage.setItem("users", JSON.stringify(results));
            navigate("/");
        } else {
            alert("Please enter correct username or password");
        }
    }

    return (
        <div className='flex justify-center items-center bg-rose-50 h-screen'>
            <div className='h-72 w-96 bg-white flex flex-col items-center pt-3'>
                <h1 className='font-bold text-lg '>Login or Signup</h1>
                <div className='flex flex-col space-y-4 mt-5 mb-5'>
                    <input className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-rose-500"
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email..'
                    />
                    <input className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-rose-500"
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Enter Password..'
                    />
                    <button onClick={handleSubmit}
                        className="bg-rose-500 text-white px-4 py-2 rounded-md mt-4 focus:outline-none hover:bg-rose-600"
                        type='button'>
                        Login
                    </button>
                    <p className="mt-4">
                        Already have an account?{' '}
                        <button
                            className="text-rose-500 underline"
                            onClick={() => navigate("/signup")}
                        >
                            SignUp
                        </button>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login