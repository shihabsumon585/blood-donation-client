import axios from 'axios';
import React from 'react';

const AddProduct = () => {

    const handleSubmit = async e => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const minOrderQty = form.minOrderQty.value;
        const paymentOption = form.paymentOption.value;
        const showOnHome = form.showOnHome.value;
        const photo = form.photo;
        const file = photo.files[0];

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=483144411544367618f3fe1757ac61d3`, { image: file },
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        
        console.log(res.data.data.display_url);

        const mainPhotoUrl = res.data.data.display_url;

        const productData = {
            title,
            description,
            category,
            price: parseInt(price),
            quantity: parseInt(quantity),
            minOrderQty: parseInt(minOrderQty),
            paymentOption,
            showOnHome,
            photo: mainPhotoUrl
        };

        axios.post("http://localhost:5000/products", productData)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div className='mt-2 mx-auto flex justify-center'>
            <div>
                <h1 className='text-3xl text-center font-bold mb-4'>Add Product</h1>

                <form onSubmit={handleSubmit} className="space-y-4 gap-5 w-xl">

                    {/* Product Name */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700">
                            Product Name / Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter product title"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700">
                            Product Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Detailed product description"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Category</label>
                        <select
                            name="category"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="shirt">Shirt</option>
                            <option value="pant">Pant</option>
                            <option value="jacket">Jacket</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="৳ Price"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Available Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Minimum Order */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Minimum Order Quantity
                        </label>
                        <input
                            type="number"
                            name="minOrderQty"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>

                    {/* Images */}
                    <div className="md:col-span-2">
                        <label className="block mb-1 font-medium text-gray-700">
                            Product Images
                        </label>
                        <input
                            type="file"
                            name='photo'
                            multiple
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    {/* Payment */}
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Payment Option
                        </label>
                        <select
                            name="paymentOption"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        >
                            <option value="">Select Payment</option>
                            <option value="cod">Cash on Delivery</option>
                            <option value="payfirst">Pay First</option>
                        </select>
                    </div>

                    {/* Show on Home */}
                    <div className="flex items-center gap-2 mt-6">
                        <input
                            type="checkbox"
                            name="showOnHome"
                            className="w-4 h-4 text-indigo-600"
                        />
                        <label className="text-gray-700 font-medium">
                            Show on Home Page
                        </label>
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Add Product
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;