import './Label.css';

const Label = ({ htmlFor, className, content  }) => {
    return <label htmlFor={htmlFor} className={className}>{content}</label>
}

export default Label;