import './Textarea.css';

const Textarea = ({ id, className, children, type, required, placeholder, name, value, onChange, disabled, style}) => {
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
            style={style}
        >{children}</textarea>
    );
};

export default Textarea;

