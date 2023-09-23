import './Spinners.css';

const Spinners = ({ className = 'line_spinner', full = false , bg = false }) => {

    // double_lines_spinner
    // gradient_spinner
    // line_progress_bar
    // line_spinner

    return (
        <div className={`spinner_wrap ${bg && 'bg'} ${full && 'full'}`}>
            <div className={className}></div>
        </div>
    );
};

export default Spinners;