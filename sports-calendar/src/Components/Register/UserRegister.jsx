import '../../Style/UserRegister.css'
import {
    Form
} from 'reactstrap';
import FormElement from '../Generic/FormElement';
import SubmitButton from '../Generic/Button';
import { useState } from 'react';
import UserService from '../../Services/RegisterService';

const UserRegister = () => {

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        UserService.registerUser(user)
            .then((response) => {
                console.log(response);
            })

        setUser({ firstName: "", lastName: "", email: "", username: "", password: "" });
    };

    return (
        <div className='register-container'>
            <Form className='register-form'>
                <FormElement props={{ label: 'First Name: ', type: 'text', name: 'firstName', value: user.firstName, handleChange: handleChange }} />
                <FormElement props={{ label: 'Last Name: ', type: 'text', name: 'lastName', value: user.lastName, handleChange: handleChange }} />
                <FormElement props={{ label: 'Email: ', type: 'email', name: 'email', value: user.email, handleChange: handleChange }} />
                <FormElement props={{ label: 'Username: ', type: 'text', name: 'username', value: user.username, handleChange: handleChange }} />
                <FormElement props={{ label: 'Password: ', type: 'text', name: 'password', value: user.password, handleChange: handleChange }} />
                <SubmitButton props={{ text: 'SignUp', color: 'primary', type: 'submit', onClick: handleSubmit}} />
            </Form>
        </div>
    )
}

export default UserRegister;