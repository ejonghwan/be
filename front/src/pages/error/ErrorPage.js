import { PiReceiptXDuotone } from "react-icons/pi";
import NoData from "../../components/common/notData/NoData";
import './ErrorPage.css';


const ErrorPage = () => {
    return (
        <div className='b_conts error_wrap'>
            <NoData 
                icon={<PiReceiptXDuotone />}
                title={"페이지가 없습니다."}
                subText={"주소를 다시 확인해주세요."}
            />
        </div>
    );
};

export default ErrorPage;

