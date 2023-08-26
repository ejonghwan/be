import './Input.css';


const Input = ({ id, className, type, required, placeholder, name, value, onChange, disabled, checked, defaultChecked }) => {
    return (
        <input 
            id={id} 
            type={type}
            required={required} 
            placeholder={placeholder} 
            className={className} 
            value={value} 
            name={name} 
            onChange={onChange} 
            disabled={disabled} 
            checked={checked}
            defaultChecked={defaultChecked}
        />
    );
};

export default Input;

