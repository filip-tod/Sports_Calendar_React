import { Button } from 'reactstrap';

const SubmitButton = ({props}) => {
    return (
        <Button className={props.className} type={props.type} onClick={props.onClick} color={props.color}>
            {props.text}
        </Button>
    )
}
export default SubmitButton;