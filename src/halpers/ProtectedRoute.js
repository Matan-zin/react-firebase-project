import React from 'react';
import { Route, Redirect } from 'react-router';

export default function ProtectedRoute({ bool, redirect, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if(bool) {
                    return React.cloneElement(children);
                }
                if(!bool) {
                    return <Redirect to={{
                                        pathname: redirect,
                                        state: { from: location} }} />
                }
              return null;
            }}/>
    )
}