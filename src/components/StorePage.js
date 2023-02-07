import React, { useState, useEffect } from "react";
import './store.css'

const StorePage = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://172.20.10.5:4000/products");
                const data = await res.json();
                setProducts(Object.values(data.data))
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const handleAddButtonClick = () => {
        setShowDropdown(true);
    };

    const handleDropdownChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleConfirmButtonClick = () => {
        if (selectedProduct) {
            setSelectedProducts([...selectedProducts, selectedProduct]);
            setSelectedProduct(null);
            setShowDropdown(false);
        }
    };

    const handleRemoveProduct = (productToRemove) => {
        setSelectedProducts(
            selectedProducts.filter((product) => product !== productToRemove)
        );
    };

    const handleAddToCart = (product, quantity) => {
        let updatedSelectedProducts = [...selectedProducts];
        let productIndex = selectedProducts.findIndex(p => p.id === product.id);
        if (productIndex === -1) {
            updatedSelectedProducts.push({ ...product, quantity: quantity });
        } else {
            updatedSelectedProducts[productIndex].quantity += quantity;
        }
        setSelectedProducts(updatedSelectedProducts);
    };

    const handleRemoveFromCart = (productId) => {
        let updatedSelectedProducts = selectedProducts.filter(
            (product) => product.id !== productId
        );
        setSelectedProducts(updatedSelectedProducts);
    };

    const totalPrice = selectedProducts.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);

    return (
        <div className="store-container">
            <button className="add-button" onClick={handleAddButtonClick}>Add</button>
            {showDropdown && (
                <div>
                    <select onChange={handleDropdownChange} value={selectedProduct}>
                        <option className="product-select" value={null}>Select a product</option>
                        {products.map((product) => (
                            <option className="product-name" key={product.id} value={product.name}>
                                {product.name} ราคา {product.price}
                            </option>
                        ))}
                    </select>
                    <input type="number" onChange={(e) => setQuantity(e.target.value)} />
                    <button className="confirm-button" onClick={() => { handleAddToCart(selectedProduct, quantity); }}>Add to cart</button>
                </div>
            )}
            <ul className="selected-products">
                {selectedProducts.map((product, index) => (
                    <li className="selected-product" key={index}>
                        {product}
                        <button className="remove-product" onClick={() => { handleRemoveFromCart(index); }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <p>Total price : {totalPrice}</p>
        </div>
    );
};

export default StorePage;
