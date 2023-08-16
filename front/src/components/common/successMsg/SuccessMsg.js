import './SuccessMsg.css';

const SuccessMsg = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default SuccessMsg;