import React, { useState, useEffect } from 'react';
import { db, storage } from '../Firebaseconfig/firebase'; // Make sure firebase is properly configured
import { collection, query, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import Spinner from '../SpecialSetups/Spinner'; // Import Spinner component for loading state

export default function AlterProducts() {
    const [products, setProducts] = useState([]); // Store products
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [productsPerPage] = useState(5); // Products per page
    const [selectedProduct, setSelectedProduct] = useState(null); // Selected product for update
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog state for updates
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch products from the "cart" collection in Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const q = query(collection(db, 'cart'));
                const querySnapshot = await getDocs(q);
                const productsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productsData);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    // Handle click to update a product
    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    // Handle deleting a product
    const handleDeleteClick = async (product) => {
        try {
            if (product.productImage && product.productImage.startsWith('https://firebasestorage.googleapis.com/')) {
                const imgRef = ref(storage, product.productImage);
                await deleteObject(imgRef).catch((error) => {
                    if (error.code === 'storage/object-not-found') {
                        console.warn('Image not found in Firebase Storage, skipping deletion.');
                    } else {
                        throw error;
                    }
                });
            }

            // Delete the Firestore document
            await deleteDoc(doc(db, 'cart', product.id));
            setProducts(products.filter(p => p.id !== product.id));

        } catch (err) {
            console.error('Error deleting product:', err);
        }
    };

    // Handle updating a product in Firestore
    const handleUpdate = async (event) => {
        event.preventDefault();
        const { id, price, productImage, productName } = selectedProduct;
        try {
            const productRef = doc(db, 'cart', id);
            await updateDoc(productRef, {
                price: Number(price),
                productImage,
                productName
            });
            setIsDialogOpen(false);
            window.location.reload(); // Reload the page after update
        } catch (err) {
            console.error('Error updating product:', err);
        }
    };

    // Handle input changes in the update form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelectedProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(products.length / productsPerPage)));
    const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-black to-white p-4">
            <h1 className="text-4xl font-bold text-white my-8 mt-16">Alter Products</h1>
            <div className="products-list w-full max-w-2xl mt-1">
                {loading ? (
                    <Spinner />
                ) : (
                    currentProducts.length > 0 ? (
                        currentProducts.map((product, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 text-white rounded-lg shadow-lg p-6 mb-4"
                            >
                                <h2 className="text-2xl font-bold mb-4">{product.productName}</h2>
                                <p className="mb-4"><strong>Price:</strong> ${product.price}</p>
                                {product.productImage && (
                                    <div className="mb-4 flex justify-center">
                                        <img src={product.productImage} alt={product.productName} className="w-full h-auto rounded-lg" />
                                    </div>
                                )}

                                <button
                                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded mr-2"
                                    onClick={() => handleUpdateClick(product)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={() => handleDeleteClick(product)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products available.</p>
                    )
                )}
            </div>

            {isDialogOpen && selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Update Product</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">Product Name:</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    value={selectedProduct.productName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={selectedProduct.price}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productImage" className="block text-gray-700 font-bold mb-2">Product Image URL:</label>
                                <input
                                    type="text"
                                    id="productImage"
                                    name="productImage"
                                    value={selectedProduct.productImage}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                                {selectedProduct.productImage && (
                                    <div className="mt-4 flex justify-center">
                                        <img src={selectedProduct.productImage} alt="Product" className="w-32 h-auto rounded-lg" />
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded mr-2"
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-4">
                <button
                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded mr-2"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 px-4 rounded"
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
