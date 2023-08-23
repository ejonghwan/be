import './Icon.css';

const Icon = ({ icon, className = '' }) => {
    return (
        <div className={`aicon ${className}`}>
            {icon}
        </div>
    );
};

export default Icon;