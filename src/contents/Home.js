import React, { useState } from "react";
import Login from "./Login";
import './home.css'

function HomePage({ email, firstName, lastName }) {

    return (
        <div className="home-page">
            <h1>Orders</h1>
            <h1>Welcome, {firstName} {lastName} Email : {email}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Product A</td>
                        <td>10</td>
                        <td>01/01/2021</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Product B</td>
                        <td>5</td>
                        <td>01/02/2021</td>
                    </tr>
                </tbody>
            </table>
            <button className="btn add-btn">Add</button>
        </div>
    );
}

export default HomePage;
