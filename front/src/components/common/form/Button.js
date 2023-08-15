import './Button.css';

const Button = ({ id, className, type, disabled, onClick, children }) => {

    return (
        <button 
            id={id} 
            type={type} 
            className={className} 
            onClick={onClick} 
            disabled={disabled}
            >
            {children}
        </button>
    )
}

export default Button;