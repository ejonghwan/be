import './Textarea.css';

const Textarea = ({ id, className, children, type, required, placeholder, name, value, onChange, disabled}) => {
    return (
        <textarea
            id={id} 
            type={type}
            required={required} 
            placeholder={placeholder} 
            className={className} 
            value={value} 
            name={name} 
            onChange={onChange} 
            disabled={disabled} 
        >{children}</textarea>
    );
};

export default Textarea;

