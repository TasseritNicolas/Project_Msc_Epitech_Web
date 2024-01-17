import React from 'react';

import ApplyModify from './button-component'

export default function CardUser (props)  {
    const {user} = props;


    return (
        <div className="user">
            <h1>User {user.id} / {user.username}</h1>


            <ApplyModify user={user}/>

        </div>


    );
};
