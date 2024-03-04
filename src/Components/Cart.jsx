import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

function Cart() {
    const [cartProducts, setCartProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('users'));
    const [totalPrice, setTotalPrice] = useState(0);
    const userId = user ? user._id : null;
    const navigate = useNavigate();

    const getCartProducts = async (userId) => {
        try {
          const result = await fetch(`http://127.0.0.1:5000/cartProducts/${userId}`);
          if (!result.ok) {
            throw new Error('Failed to fetch cart products');
          }
          const cartProductsData = await result.json();
          setCartProducts(cartProductsData);
          console.log(cartProductsData);
        } catch (error) {
          console.error("Error fetching cart products:", error);
        }
      };

    useEffect(() => {
        if (userId) {
            getCartProducts(userId);
        }
    }, [userId]);

    useEffect(() => {
        const totalPrice = cartProducts.reduce((total, product) => total + product.price, 0);
        setTotalPrice(totalPrice);
    }, [cartProducts]);

    const deleteCartProduct = async (id) => {
        try {
            const result = await fetch(`http://127.0.0.1:5000/product/${id}`, {
                method: "delete"
            });
            const results = await result.json();
            console.log(results);
            if (results) {
                console.log("product deleted from cart with id:", id);
                getCartProducts(userId);
            }
        } catch (e) {
            console.error("Error deleting product from cart:", e);
        }
    };

    return (
        <div>
            {userId ? (
                <div className="max-w-screen-md mx-auto mt-5">
                    <h1 className='ml-2 text-[20px] font-semibold'>My Bag  <span className='font-normal'>({cartProducts.length} items)</span></h1>
                    <div className="mt-4">
                        {cartProducts.length > 0 ? ( 
                            cartProducts.map((item) => (
                            <div key={item._id} className="flex items-center py-4">
                                <div className="max-w-lg rounded overflow-hidden shadow-lg flex w-full relative">
                                    <RxCross2 className="absolute text-[25px] top-2 right-2 cursor-pointer" onClick={() => deleteCartProduct(item._id)} />
                                    <img src={item.image} alt={item.name} className="w-1/2 h-48 object-cover" />
                                    <div className="w-1/2 px-4 py-1">
                                        <div className="font-bold text-sm mb-1">{item.name}</div>
                                        <p className="text-gray-900 font-bold text-sm mb-1">${item.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                        ) : (
                            <h1>Ypur shopping cart is empty.</h1>
                        )}
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Total Price: ${totalPrice}</h2>
                    </div>
                </div>
            ) : (
                <div className='text-center mt-10'>
                    <h1 className='font-semibold text-[25px]'>Your shopping bag is empty!!</h1>
                    <h2 className='mt-3 text-rose-600 font-bold text-[20px]'>Please <span className='cursor-pointer hover:text-blue-500 hover:underline' onClick={() => navigate("/login")}>log in</span> </h2>
                </div>
            )}
        </div>
    );
}

export default Cart;
