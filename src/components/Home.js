import React, { useState, useEffect } from "react";
import Modal from "./Modal";
// import LoginPage from "./Login";
import './home.css'

const HomePage = () => {

    const userEmail = useState(localStorage.getItem("email"));
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [adressUser, setAdressUser] = useState("");
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        fetch(`http://172.20.10.5:4000/getuser/${userEmail[0]}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("dataError");
                    setError(data.error);
                } else {
                    // Redirect to the Login page
                    // console.log(`YUP ${data.data}`)
                    setFirstname(data.user.firstname);
                    setLastname(data.user.lastname);
                    setAdressUser(data.user.adressUser);
                }
            })
            .catch((error) => {
                console.log("error");
                setError(error.message);
            });
    })

    return (
        <div className="home-container">
            {error && <div className="error">{error}</div>}
            <h1>Orders</h1>
            <h2>Welcome,  {firstname} {lastname}</h2>
            <h2>My address : {adressUser}  <button className="btn" onClick={handleModal}>Change</button></h2>
            <table>
                <thead>
                    <tr className="home-orders-container">
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="home-order-item">
                        <td>1</td>
                        <td>Product A</td>
                        <td>10</td>
                        <td>01/01/2021</td>
                    </tr>
                    <tr className="home-order-item">
                        <td>2</td>
                        <td>Product B</td>
                        <td>5</td>
                        <td>01/02/2021</td>
                    </tr>
                </tbody>
            </table>
            <button className="btn">Add</button>
            {showModal && (
                <Modal
                    closeModal={handleModal}
                    showModal={showModal}
                >
                    <input type="text" placeholder="Enter address"/>
                    <button onClick={handleModal}>Close</button>
                </Modal>
            )}

        </div>
    );
}

export default HomePage;
