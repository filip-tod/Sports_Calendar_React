import qs from'qs';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    return axios.post("https://localhost:44380/api/login", data)
    .then(data => data.data);
}

const Login = (props) => {

    const nav = useNavigate();

    const { setToken } = useToken();

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
        const data = await LoginUser({
            userName,
            password,
        });
        setToken(data);
        props.setLoggedIn(true)
        nav('/')
    }

    return (
        <div className='login-container'>
            <Form className='login-form'>
                <FormElement props={{ label: 'Username: ', type: 'text', name: 'userName', value: userName, handleChange: handleChangeUsername }} />
                <FormElement props={{ label: 'Password: ', type: 'password', name: 'password',value: password, handleChange: handleChangePassword }} />
                <SubmitButton props={{ text: 'LogIn', color: 'primary', type: 'submit', onClick: handleSubmit}} />
            </Form>
        </div>
    )
}


export default Login;