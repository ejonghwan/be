import { PiReceiptXDuotone } from "react-icons/pi";
import NoData from "../../components/common/notData/NoData";
import './ErrorPage.css';
import HeadMetaTag from "../../components/common/HeadMetaTag";


const ErrorPage = () => {
    return (
        <div className='b_conts error_wrap'>
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | 에러페이지`} />
            <NoData 
                icon={<PiReceiptXDuotone />}
                title={"페이지가 없습니다."}
                subText={"주소를 다시 확인해주세요."}
            />
        </div>
    );
};

export default ErrorPage;

