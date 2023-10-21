import './Input.css';


const Input = ({ id, className = '', type, required, placeholder, name, value, onChange, onKeyUp, disabled, checked, defaultChecked, autocomplete = 'off' }) => {
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
            autocomplete={autocomplete}
        />
    );
};

export default Input;

