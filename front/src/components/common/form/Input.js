import './Input.css';


const Input = ({ id, className = '', type, required, placeholder, name, value, onChange, onKeyUp, disabled, checked, defaultChecked, autoComplete = 'off' }) => {
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
            onKeyUp={onKeyUp}
            disabled={disabled} 
            checked={checked}
            defaultChecked={defaultChecked}
            autoComplete={autoComplete}
        />
    );
};

export default Input;

