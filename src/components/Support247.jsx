import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCapsules, FaSearchPlus, FaShoppingCart } from 'react-icons/fa';

const categories = [
  "Pain Relief",
  "Vitamins and Supplements",
  "Nutritional Drinks",
  "Haircare Products",
  "Skincare Products"
];

const painReliefItems = [
  {
    name: 'Ibuprofen',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/7/325863554/WI/JM/SY/135658020/ibuprofen-tablets-ip-200-mg-.jpg',
    usage: 'Used for pain, inflammation, and fever.',
    dosage: '200mg',
    price: 35,
  },
  {
    name: 'Paracetamol',
    image: 'https://www.stelonbiotech.com/wp-content/uploads/2022/04/PYREMUST-650-TAB.jpg',
    usage: 'Commonly used to treat fever and mild to moderate pain.',
    dosage: '650mg',
    price: 20,
  },
  {
    name: 'Aspirin',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJavHyhN1n1b-cMc5ixziBiHJlArnahVjgw&s',
    usage: 'Used for pain, fever, and inflammation; also a blood thinner.',
    dosage: '300mg',
    price: 30,
  },
  {
    name: 'Diclofenac',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5hnXrBNuJdqR9HvXWBUN7q6-Q0dGvQ5KPEQ&s',
    usage: 'Relieves pain and swelling from arthritis.',
    dosage: '50mg',
    price: 28,
  },
  {
    name: 'Naproxen',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv6BWpHcIofRWQd4QWSOOs80x-DUzD__KNWg&s',
    usage: 'Used for muscle pain, menstrual cramps, and arthritis.',
    dosage: '250mg',
    price: 48,
  },
  {
    name: 'Aceclofenac',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRp0i4G9fZxRcsZ3NBYMtmDD2ZGKpdOvEpw&s',
    usage: 'Effective for joint pain and back pain.',
    dosage: '100mg',
    price: 30,
  },
  {
    name: 'Tramadol',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-7IO1snUzulBez_P6SxK-l2XKbICO8nIlyg&s',
    usage: 'Prescribed for moderate to severe pain.',
    dosage: '100mg',
    price: 70,
  },
  {
    name: 'Celecoxib',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Dr5rcal0Vy0C8WgTPF_lrgPlqc08I2L6Uw&s',
    usage: 'Used for arthritis, back pain, and acute pain.',
    dosage: '200mg',
    price: 55,
  },
];

const vitaminItems = [
  {
    name: 'Vitamin C Tablets',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZJZ3Wx8Gj_wMLcyeUtPw-Ed4dX_OPZ9p2nw&s',
    usage: 'Boosts immunity and promotes healthy skin.',
    dosage: '500mg',
    price: 120,
  },
  {
    name: 'Multivitamin Capsules',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkAVP7yJvhmP2Q7v5p5wxIREu0wBkUcC01Q&s',
    usage: 'Supports overall wellness and energy levels.',
    dosage: '1 capsule daily',
    price: 150,
  },
  {
    name: 'Zinc + Vitamin C',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK54O5EANta2-BBKroVYx5bHKeY2vtZ06RTw&s',
    usage: 'Enhances immune function and antioxidant protection.',
    dosage: '1 tablet daily',
    price: 100,
  },
];

const nutritionalDrinksItems = [
  {
    name: 'Protein Shake',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbqzNfK6Dl9rUUBq4AziAPsWDATQ4L-Micyg&s',
    usage: 'Boosts muscle recovery and supports weight management.',
    dosage: '1 scoop per serving',
    price: 350,
  },
  {
    name: 'Meal Replacement Drink',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpr4C9YB5oNyslL2IPmh0TBzU2ysH6FQ4_A&s',
    usage: 'Complete meal replacement with essential vitamins.',
    dosage: '1 bottle per meal',
    price: 200,
  },
  {
    name: 'Energy Drink',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTczlI0CuoNn-6zGShTA7HpkP0ohak67FuzQ&s',
    usage: 'Provides instant energy and increases stamina.',
    dosage: '1 can per serving',
    price: 150,
  },
];

const haircareItems = [
  {
    name: 'Hair Growth Shampoo',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj3k6ZAgKXqy3xw6hhLWACcEKVoMVeDEX13Q&s',
    usage: 'Promotes hair growth and strengthens roots.',
    dosage: 'Apply to wet hair, lather, and rinse',
    price: 300,
  },
  {
    name: 'Hair Oil',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP1J6jrWOZlukaXoJf4JWPcXtgNqoYnVpeXg&s',
    usage: 'Nourishes hair and promotes overall scalp health.',
    dosage: 'Massage into the scalp 2-3 times per week',
    price: 350,
  },
];

const skincareItems = [
  {
    name: 'Moisturizing Face Cream',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8t-D7fq9eQkWDlYCTieNq3MOSG7b5s4iaHA&s',
    usage: 'Hydrates and softens the skin.',
    dosage: 'Apply a generous layer to clean face twice a day',
    price: 400,
  },
  {
    name: 'Sunscreen SPF 50',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yaHitlAxBU897rRQH_1K9JSq4GVUTMiJGQ&s',
    usage: 'Protects skin from harmful UV rays.',
    dosage: 'Apply liberally before sun exposure',
    price: 300,
  }
];


const Support247 = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [modalItem, setModalItem] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setModalItem(null);
  };

  const handleRemoveFromCart = (item) => {
    setCart(cart.filter(cartItem => cartItem.name !== item.name));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getItemsByCategory = () => {
    if (selectedCategory === 'Pain Relief') return painReliefItems;
    if (selectedCategory === 'Vitamins and Supplements') return vitaminItems;
    if (selectedCategory === 'Nutritional Drinks') return nutritionalDrinksItems;
    if (selectedCategory === 'Haircare Products') return haircareItems;
    if (selectedCategory === 'Skincare Products') return skincareItems;
    return [];
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-[20vw] bg-gray-200 p-6">
          <h3 className="text-4xl font-semibold text-center mb-10">Categories</h3>
          <div className="flex flex-col space-y-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => setSelectedCategory(cat)}
                className={`text-center px-6 py-4 rounded-3xl cursor-pointer transition-all duration-300 font-medium
                  ${selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-600'
                  }`}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-10 overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-6">{selectedCategory}</h2>

          {getItemsByCategory().length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {getItemsByCategory().map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden relative group transition-transform hover:scale-[1.02] hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <FaCapsules className="text-blue-500" />
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm">{item.usage}</p>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-gray-600">Dosage: <strong>{item.dosage}</strong></span>
                      <span className="text-green-600 font-medium">₹{item.price}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setModalItem(item)}
                    className="absolute bottom-4 right-4 bg-blue-600 text-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    title="More Info"
                  >
                    <FaSearchPlus />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Display items or info related to "{selectedCategory}" here.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalItem(null)}
              className="absolute top-3 right-4 text-gray-600 text-xl font-bold"
            >
              &times;
            </button>
            <img src={modalItem.image} alt={modalItem.name} className="w-full h-56 object-cover rounded-lg mb-4" />
            <h3 className="text-2xl font-bold mb-2">{modalItem.name}</h3>
            <p className="text-gray-600 mb-3">{modalItem.usage}</p>
            <p className="text-sm text-gray-500">💊 <strong>Dosage:</strong> {modalItem.dosage}</p>
            <p className="text-sm text-gray-500 mt-1">💲 <strong>Price:</strong> ₹{modalItem.price}</p>

            <div className="mt-4 text-right">
              <button
                onClick={() => handleAddToCart(modalItem)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setModalItem(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      <div
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
      >
        <FaShoppingCart className="text-2xl" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
            {cart.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full">
            <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
            <ul>
              {cart.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center mb-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-4">
              <span className="font-semibold">Total: ₹{totalPrice}</span>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/payment', { state: { cart, total: totalPrice } });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support247;