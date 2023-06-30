import {
    FormGroup,
    Input,
    Label
  } from 'reactstrap';

            
 const FormElement = ({props}) => {

    return (
        <FormGroup>
        <Label for={props.name}>{props.label}</Label>
        <Input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.handleChange}
        />
        </FormGroup>
    )
 }           

 export default FormElement;