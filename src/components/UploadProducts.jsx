import React, { useState } from 'react';
import { db } from '../Firebaseconfig/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!productImage) {
                setMessage('Please select a product image to upload.');
                return;
            }

            // Upload product image to Firebase Storage
            const storage = getStorage();
            const storageRef = ref(storage, `product-images/${productImage.name}`);
            const uploadTask = uploadBytesResumable(storageRef, productImage);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error('Upload failed', error);
                    setMessage('Failed to upload product image.');
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                    // Add product details to Firestore
                    await addDoc(collection(db, 'cart'), {
                        productName,
                        price: Number(price), // Ensure price is stored as a number
                        productImage: downloadURL,
                    });

                    setMessage('Product added successfully!');
                    setProductName('');
                    setPrice('');
                    setProductImage(null);
                    setUploadProgress(0);
                    navigate('/shop'); // Redirect to the products page after successful upload
                }
            );
        } catch (error) {
            console.error('Error adding product: ', error);
            setMessage('Failed to add product.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto gradient-background m-4">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            {message && <p className={`mb-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

            {/* Product Name Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Product Name:</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Price Input */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter product price"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Product Image Upload */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Product Image:</label>
                <input
                    type="file"
                    onChange={(e) => setProductImage(e.target.files[0])}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {uploadProgress > 0 && <progress value={uploadProgress} max="100" className="w-full mt-2" />}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
                Add Product
            </button>
        </form>
    );
}
