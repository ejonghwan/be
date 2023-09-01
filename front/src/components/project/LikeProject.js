import { PiStarDuotone } from "react-icons/pi";
import Button from '../common/form/Button';
import './LikeProject.css';

const LikeProject = ({ projectId, userId }) => {
    return (
        <span className=''>
            <Button className={'button_type4'}>
                <PiStarDuotone />
                <span className='blind'>이 습관 좋아요</span>
            </Button>
        </span>
    );
};

export default LikeProject;