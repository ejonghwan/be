import './Icon.css';

const Icon = ({ icon, id, className = '', onClick }) => {
    return (
        <div id={id} className={`aicon ${className}`} onClick={onClick}>
            {icon}
        </div>
    );
};

export default Icon;