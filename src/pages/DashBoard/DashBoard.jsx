import React, { useEffect, useState } from 'react';
import '../../assets/styles/inputs.scss';
import '../../assets/styles/theme-buttons.scss';
import './DashBoars.scss';

const DashBoard = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        console.log("Token", token);

        fetch('http://localhost:3000/accounts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log("data1", data);
                setUsers(Array.isArray(data) ? data : [data]);
            })
            .catch(err => console.error("Fetch error", err));
    }, []);

    console.log("users", users);

    return (
        <><span>Hii In DashBoard</span><div className="account-details">
            <div class='login-user'>
                Hello,
                {users.map(user => (
                    <span key={user.id}>{user.name}</span>
                ))}
            </div>
        </div></>
    );
}

export default DashBoard;