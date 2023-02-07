import React, { useState, useEffect } from "react";
import Modal from "./Modal";
// import LoginPage from "./Login";
import './home.css'
import { Link } from "react-router-dom";

const HomePage = () => {

    const userEmail = useState(localStorage.getItem("email"));
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [addressUser, setAddressUser] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(!showModal);
        setInputAddress(addressUser);
    };

    const handleConfirm = () => {
        let email = userEmail[0];
        let adressUser = inputAddress;
        fetch("http://172.20.10.5:4000/setaddress", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, adressUser }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                }
                else{
                    setError("");
                    window.location.reload(false);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    }

    useEffect(() => {
        fetch(`http://172.20.10.5:4000/getuser/${userEmail[0]}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("dataError");
                    setError(data.error);
                } else {
                    // Redirect to the Login page
                    setFirstname(data.user.firstname);
                    setLastname(data.user.lastname);
                    setAddressUser(data.user.adressUser);
                    setInputAddress(data.user.addressUser);
                }
            })
            .catch((error) => {
                console.log("error");
                setError(error.message);
            });
    }, []);

    return (
        <div className="home-container">
            {error && <div className="error">{error}</div>}
            <h1>Orders</h1>
            <h2>Welcome,  {firstname} {lastname}</h2>
            <h2>My address : {addressUser}  <button className="btn" onClick={handleModal}>Change</button></h2>
            <table>
                <thead>
                    <tr className="home-orders-container">
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="home-order-item">
                        <td>1</td>
                        <td>Product A</td>
                        <td>10</td>
                    </tr>
                    <tr className="home-order-item">
                        <td>2</td>
                        <td>Product B</td>
                        <td>5</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/store"><button className="btn">Shopping</button></Link>
            {showModal && (
                <Modal
                    isOpen={handleModal}
                    showModal={showModal}
                >
                    <input className="input-modal" type="text" placeholder="Enter address" value={inputAddress} onChange={((e) => setInputAddress(e.target.value))} />
                    <Link to="/home"><button onClick={handleConfirm}>Change</button></Link>
                    <button onClick={handleModal}>Close</button>
                </Modal>
            )}

        </div>
    );
}

export default HomePage;
