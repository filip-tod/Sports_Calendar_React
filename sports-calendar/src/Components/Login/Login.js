import qs from'qs';
import { useState } from 'react';
import axios from 'axios';

import useToken from './UseToken';

import '../../Style/Login.css'
import {
    Form
} from 'reactstrap';
import FormElement from '../Generic/FormElement';
import SubmitButton from '../Generic/Button';

async function LoginUser(credentials) {
    const data = qs.stringify({
        Username: credentials.userName,
        Password: credentials.password,
        grant_type: 'password',
    });
    console.log(data);

    return axios.post("https://localhost:44380/api/login", data)
    .then(data => data.data);
}

async function getUserRoles(token) {
    const headers = {
        Authorization: `Bearer ${token}`
    };

    return axios.get("https://localhost:44380/api/user", { headers })
    .then(data => data.data.roles);
}

const Login = ({ setLoggedIn }) => { 

    const { token, setToken } = useToken();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUsername = (event) => {
        event.preventDefault();
        setUserName(event.target.value)
    };

    const handleChangePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = await LoginUser({
            userName,
            password,
        });
        setToken(token);
        setLoggedIn(true); 
        localStorage.setItem('token', token); 
        const roles = await getUserRoles(token);
        localStorage.setItem('roles', JSON.stringify(roles));
    }
    console.log(token)

    return (
        <div className='login-container'>
            <Form className='login-form'>
                <FormElement props={{ label: 'Username: ', type: 'text', name: 'userName', value: userName, handleChange: handleChangeUsername }} />
                <FormElement props={{ label: 'Password: ', type: 'password', name: 'password', value: password, handleChange: handleChangePassword }} />
                <SubmitButton props={{ text: 'LogIn', color: 'primary', type: 'submit', onClick: handleSubmit}} />
            </Form>
        </div>
    )
}

export default Login;
