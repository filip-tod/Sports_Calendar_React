import '../../Style/UserRegister.css'
import {
    Form
} from 'reactstrap';
import FormElement from '../Generic/FormElement';
import SubmitButton from '../Generic/Button';

const UserRegister = () => {

    return (
        <div className='register-container'>
            <Form className='register-form'>
            <FormElement props={{ label: 'First Name: ', type: 'text', name: 'firstname' }} />
            <FormElement props={{ label: 'Last Name: ', type: 'text', name: 'lastname' }} />
            <FormElement props={{ label: 'Email: ', type: 'email', name: 'email' }} />
            <FormElement props={{ label: 'Username: ', type: 'text', name: 'username' }} />
            <FormElement props={{ label: 'Password: ', type: 'text', name: 'password' }} />
            <SubmitButton props={{ text: 'SignUp', color: 'primary', type: 'submit'}} />
            </Form>
        </div>
    )
}

export default UserRegister;