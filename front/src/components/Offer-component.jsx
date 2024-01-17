
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from "./card-component";
export default function Offer(){
    const [state, setstate] = useState([]);

    let token = localStorage.getItem('token');
    console.log(token);

    useEffect(() => {
        axios.get(
            "http://localhost:3001/api/user/offer"
            , {
                headers: {
                    'Authorization': "bearer " + token
                }
            })
            .then((res) => setstate(res.data.announces));
    },[token]);

    return (
        <div>
            <ul>
                {state.map((announces) => (
                    <Card announces={announces} key={announces.id}/>
                ))}
            </ul>
        </div>
    );
};
