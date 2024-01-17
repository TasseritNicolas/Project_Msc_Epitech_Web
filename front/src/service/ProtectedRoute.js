import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './authContext';

export default function ProtectedRoute({ requiredStatus, ...rest }) {
    let { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser && currentUser.status === requiredStatus ? (
                    rest.children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
