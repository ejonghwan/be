import './ErrorMsg.css';

const ErrorMsg = ({ children, className }) => {
    return (
        <p className={className}>
            <span>{children}</span>
        </p>
    );
};

export default ErrorMsg;