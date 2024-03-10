import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from 'react-router-dom';


function Products({ selectedCategory }) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState({
    low_to_high: false,
    high_to_low: false,
    Electronics: selectedCategory === "Electronics",
    Shoes: selectedCategory === "Shoes",
    Clothes: selectedCategory === "Clothes"
  });
  const location = useLocation();

  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const result = await fetch("https://api.escuelajs.co/api/v1/products");
      const productsData = await result.json();
      setProducts(productsData);
      console.log(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  const filteredProducts = products.filter(item => {
    // Filter based on search
    const searchMatch = item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.price.toString().includes(search);

    // Filter based on categories
    const categoryMatch =
      (!categories.Clothes || item.category.name === "Clothes") &&
      (!categories.Electronics || item.category.name === "Electronics") &&
      (!categories.Shoes || item.category.name === "Shoes");

    return searchMatch && categoryMatch;
  });
  console.log("Filtered Products:", filteredProducts);


  if (categories.low_to_high) {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (categories.high_to_low) {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const handleCategoryChange = (category) => {
    setCategories({ ...categories, [category]: !categories[category] });
  };

  const openProduct = (product) => {
    setSelectedProduct(product)
  }

  const handleSubmit = async () => {
    if (!selectedProduct) {
      console.error("No product selected");
      return;
    }

    console.log(selectedProduct);
    const userId = JSON.parse(localStorage.getItem('users'))._id;
    console.log(userId);
    const imageUrl = selectedProduct.category && selectedProduct.category.image ? selectedProduct.category.image : selectedProduct.image;

    try {
      navigate("/cart");
      const response = await fetch("http://127.0.0.1:5000/cart", {
        method: 'post',
        body: JSON.stringify({
          name: selectedProduct.title,
          price: selectedProduct.price,
          image: imageUrl,
          userId: userId
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const results = await response.json();
      console.log(results);
      localStorage.setItem("cart", JSON.stringify(results));
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert('Failed to add product to cart. Please try again later.');
    }
  }


  return (
    <div className="m-2 text-black">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mt-2 p-2.5 border rounded-md max-w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row mt-2">
        <div className="sm:w-3/12 md:w-3/12 mt-4">
          <div className="max-w-md rounded overflow-hidden shadow-lg border border-gray-400 m-2 h-full">
            <h1 className="font-semibold text-[20px] ml-5 mt-1">Filters</h1>
            <div className="ml-6 mt-4">
              <h1 className="font-bold text-[18px]">Category</h1>
              <div>
                <label className="flex items-center mt-2 ml-2">
                  <input
                    type="checkbox"
                    checked={categories.Electronics}
                    onChange={() => handleCategoryChange('Electronics')}
                  />
                  <span className="ml-2">Electronics</span>
                </label>
              </div>
              <div>
                <label className="flex items-center ml-2">
                  <input
                    type="checkbox"
                    checked={categories.Shoes}
                    onChange={() => handleCategoryChange('Shoes')}
                  />
                  <span className="ml-2">Shoes</span>
                </label>
              </div>
              <div>
                <label className="flex items-center ml-2">
                  <input
                    type="checkbox"
                    checked={categories.Clothes}
                    onChange={() => handleCategoryChange('Clothes')}
                  />
                  <span className="ml-2">Clothes</span>
                </label>
              </div>
            </div>
            <div className="ml-6 mt-4">
              <h1 className="font-bold text-[18px]">Sort By Price</h1>
              <div>
                <label className="flex items-center ml-2 mt-2">
                  <input
                    type="checkbox"
                    checked={categories.low_to_high}
                    onChange={() => handleCategoryChange('low_to_high')}
                  />
                  <span className="ml-2">low to high</span>
                </label>
              </div>
              <div>
                <label className="flex items-center ml-2">
                  <input
                    type="checkbox"
                    checked={categories.high_to_low}
                    onChange={() => handleCategoryChange('high_to_low')}
                  />
                  <span className="ml-2">high to low</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-9/12 md:w-9/12 mt-4">
          <div className={`grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}>
            {filteredProducts.map(item => (
              <div key={item.id} className="flex flex-col">
                <div
                  className="max-w-md rounded overflow-hidden shadow-lg border border-gray-300 m-2"
                  style={{ width: '230px', height: '290px' }}
                  onClick={() => openProduct(item)}
                >
                  <img
                    src={item.category.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-4 py-1">
                    <div className="font-bold text-sm mb-1">{item.title}</div>
                    <p className="text-gray-900 font-bold text-sm mb-1">${item.price}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="max-w-md bg-white rounded-lg p-8 relative" key={selectedProduct.id}>
            <RxCross2 className="absolute top-2 right-2 text-[25px]" onClick={() => setSelectedProduct(null)} />
            <img src={selectedProduct.category.image} alt={selectedProduct.title} className="w-full h-80 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{selectedProduct.title}</h2>
            <p className="text-md">{selectedProduct.description}</p>
            <p className="text-gray-700">${selectedProduct.price}</p>
            <button className="bg-rose-500 text-white font-semibold py-1 px-4 rounded mt-2" onClick={handleSubmit}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
