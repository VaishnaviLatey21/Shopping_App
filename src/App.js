import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products';
import Navbar from './Components/Navbar';
import Men from './Components/Electronics';
import Women from './Components/Clothes';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComp from './Components/PrivateComp';
import Login from './Components/Login';
import Cart from './Components/Cart';
import { useState } from 'react';


function App() {

  const [selectedCategory, setSelectedCategory] = useState('');
  console.log("Selected Category in App:", selectedCategory);

  return (
    <Router>
      <Navbar setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory}/>

      <Routes >
        <Route path='/' element={<Home />} />
        <Route element={<PrivateComp />}>
          <Route path='/products' element={<Products selectedCategory={selectedCategory} />} />
          <Route path='/electronics' element={<Men />} />
          <Route path='/clothes' element={<Women />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />

      </Routes>
      {/* <Footer /> */}
    </Router>

  );
}

export default App;
