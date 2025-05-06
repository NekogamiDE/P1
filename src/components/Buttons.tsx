import { JSX } from 'react';

interface ButtonProps {
    className?: string;
    variant: "standard" | "primary" | "secondary" | "danger";
    text: string;
    type?: "submit" | "reset" | "button";
    onClick?: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
    
    let type = undefined;
    if(props.type)
    {
        type = props.type;
    }

    let className;
    
    if(props.className)
    {
        className = props.className + " ";
    }
    else
    {
        className = "";
    }

    

    switch(props.variant)
    {
        case "primary":
            className += "btn btn-green";
            break;
        case "secondary":
            className += "btn btn-blue";
            break;
        case "danger":
            className += "btn btn-red";
            break;     
        default:
            className += "btn btn-blue";
            break;
    };

    return (
        <button className={className} onClick={props.onClick} type={type}> {props.text} </button>
    );
};
export default Button;