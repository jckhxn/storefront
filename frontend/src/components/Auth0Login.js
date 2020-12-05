import React from 'react'
import {useAuth0} from '@auth0/auth0-react'


const Auth0Login = () => {
    const {loginWithRedirect} = useAuth0();
    
    return (
        
        <button onClick={() => loginWithRedirect()}>Social Login.</button>
        
    )
}

export default Auth0Login
