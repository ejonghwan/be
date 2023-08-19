import './Button.css';

const Button = ({ id, className, type, disabled, onClick, children, name }) => {

    return (
        <button 
            id={id} 
            type={type} 
            className={className} 
            onClick={onClick} 
            disabled={disabled}
            name={name}
            >
            {children}
        </button>
    )
}

export default Button;