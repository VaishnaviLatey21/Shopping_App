import React, { useEffect, useState } from 'react'

function Clothes() {
  const [clothes, setClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    const fetchClothes = async () => {
      try {
        const result = await fetch("https://api.escuelajs.co/api/v1/products");
        const productsData = await result.json();
        const clothesData = productsData.filter(item => item.category.name === "Clothes");
        setClothes(clothesData);
        setFilteredClothes(clothesData);
      } catch (error) {
        console.error("Error fetching clothes:", error);
      }
    };

    fetchClothes();
  }, []);

  useEffect(() => {
    const filtered = clothes.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.price.toString().includes(search)
    );
    setFilteredClothes(filtered);
  }, [search, clothes]);

  return (
    <div className='mt-5'>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mt-2 p-2.5 border rounded-md max-w-full"
        />
      </div>
      <div className="flex justify-center mt-8 ml-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredClothes.map(item => (
            <div key={item.id} className="flex flex-col">
              <div className="max-w-md rounded overflow-hidden shadow-lg border border-gray-300 m-2" style={{ width: '230px', height: '290px' }}>
                <img src={item.category.image} alt={item.title} className="w-full h-48 object-cover" />
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
  );
}

export default Clothes;