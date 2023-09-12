import { useContext, useEffect, useState, useCallback, memo } from 'react';
import Input from '../common/form/Input';
import Label from '../common/form/Label';
import Textarea from '../common/form/Textarea';
import Button from '../common/form/Button';
import { PiPlusCircleDuotone, PiUsersDuotone  } from "react-icons/pi";
import IconVisual from '../common/icon/IconVisual';
import IconList from '../common/icon/IconList';
import IconData from '../common/icon/IconData';
import Search from '../common/form/Search';
import Tags from '../common/tag/Tags';
import { ProjectContext } from '../../context/ProjectContext';
import _debounce from 'lodash.debounce';
import NoData from '../common/notData/NoData';
import UserThumItem from '../common/userThum/UserThumItem';
import ProjectRequest from '../../reducers/ProjectRequest';
import './ProjectEdit.css';
import ViewDate from '../common/date/ViewDate';
import { changeViewDate } from '../../utils/utils';


const ProjectEdit = ({ editRef }) => {

    const { ProjectState: { project }, ProjectDispatch } = useContext(ProjectContext);

    // const [instanceUser, setInstanceUser] = useState([]);
    const [existCategorys, setExistCategorys] = useState([...project.categorys]);
    const [categoryValue, setCategoryValue] = useState(''); 
    const { editProject } = ProjectRequest();

    const [projectImages, setProjectImages] = useState(project.projectImages);
    const [submitData, setSubmitData] = useState({ 
        projectId: project._id,
        content: project.content,
        instanceUser: [],
        categorys: [], //{categoryName: ''} 새로 보낼 것만 넣음
        deleteCategorys: [], // 기존껄 삭제하면 그 카테고리는 여기로
        projectPublic: project.projectPublic,
        projectImages: projectImages,
    });
    

    const handleValuesChange = e => {
        const {name, value} = e.target;
        setSubmitData({...submitData, [name]: value});
    }

    const handleIconClick = idx => {
        setProjectImages(idx);
        setSubmitData(prev => ({ ...prev, projectImages: idx }));
    };

    const handleCategoryReset = () => setCategoryValue('');
    const handleCategoryClick = useCallback(() => {
        let categoryResult = categoryValue.replace(/ /g,"").split('#').filter(item => {
            return item !== null && item !== undefined && item !== '';
           })
        
        let equalsFillter = categoryResult.filter((el, idx) => categoryResult?.indexOf(el) === idx); //같은거 삭제
        let inCategoryName = [];
        for(let i = 0; i < equalsFillter.length; i++) {
            inCategoryName.push({ categoryName: equalsFillter[i] });
        }

        let allCategory = [...submitData.categorys, ...existCategorys, ...inCategoryName];
        let allCategoryEqualsFilter = allCategory.reduce((acc, cur) => acc.find(item => item.categoryName === cur.categoryName) ? acc : [...acc, cur], []);
        let existFilter = allCategoryEqualsFilter.filter(item => !existCategorys.some(x => x.categoryName === item.categoryName)); // 기존에 있던건 제외

        setSubmitData(prev => ({...prev, categorys: [...existFilter]}));
        setCategoryValue('');
    }, [categoryValue]);

    
    const handleTagDelete = (e, tagName) => {
        if(e.target.closest('.exist_category')) {
            setExistCategorys(prev => ( prev.filter(tag => tag.categoryName !== tagName )));
            setSubmitData(prev => ({ ...prev, deleteCategorys: prev.deleteCategorys.concat({ categoryName: tagName }) }));
            console.log(tagName, existCategorys);
        } else {
            setSubmitData(prev => ({ ...prev, categorys: prev.categorys.filter(tag => tag.categoryName !== tagName )}));
        };
    };


    const handleExportUser = e => {
        let userId = e.target.parentNode.dataset.userid;
        e.target.parentNode.parentNode.classList.add('remove');
        // setInstanceUser(prev => prev.concat(userId));
        setSubmitData(prev => ({ ...prev, instanceUser: prev.instanceUser.concat(userId) }));
    };


    const handleProjectEdit = async e => {
        try {
            e.preventDefault();
            ProjectDispatch({ type: "PROJECT_REQUEST" });
            await editProject(submitData);
            alert('수정 완료!');
            editRef.current.popupClose();
        } catch(err) {
            console.log(err);
        }
    } 


    useEffect(() => {
        setProjectImages(project.projectImages);
    }, []);

    useEffect(() => {
        console.log(submitData)
       
    }, [submitData]);


    return (
        <div className='project_edit'>
            <div><IconVisual icon={IconData[projectImages]}/></div>  
            <div className='gapt_30'>
                <IconList icons={IconData} onClick={handleIconClick} current={projectImages}/>
            </div>
            <div className='gap_30 gapt_30 align_c'>
                <p className="project_sub_title">우리의 목표!</p>
                <strong className='project_title'>{project.title}</strong>
            </div>
            <div className='gap_30 align_c'>
                <Label htmlFor="content" content="습관 상세 내용" className={"label_type1 project_sub_title"}/>
                <Textarea 
                    id={"content"}
                    name={"content"}
                    className={"textarea_type1"} 
                    value={submitData.content}
                    onChange={handleValuesChange}
                    required={true} 
                    placeholder={"#룰1 - 영단어 2만개를 외워서 게시판에 인증샷 남기기\n#룰2 - 못하면 못잠"}
                    defaultValue={project.content}
                >
                    {submitData.content}
                </Textarea>
            </div>

            <div className='part_user gap_30'>
                <h3 className='gap_10'>습관에 참여한 친구들</h3>
                {project.instanceUser && project.instanceUser.length > 0 ? (
                    <UserThumItem 
                        users={project.instanceUser} 
                        isText={true} 
                        className={'vertical'} 
                        matched={'part_user'} 
                        buttons={[
                            <Button type={'button'} className={'button_type6 danger'} onClick={handleExportUser}>내보내기</Button>
                        ]} 
                    />
                ) : (
                    <NoData icon={<PiUsersDuotone />} title={"이 습관을 같이 하는 친구가 없습니다."} />
                )}
            </div>

            <div className='gap_30'>
                <Search 
                    id={'category'}
                    placeholder={"#공부 #영단어 #운동"}
                    isLabel={true}
                    labelCont={"카테고리를 등록할 수 있어요."}
                    isButton={true} 
                    type={"text"}
                    // buttonCont={`추가`}   
                    buttonIcon={<PiPlusCircleDuotone />}
                    buttonType={"button"}
                    value={categoryValue}
                    buttonClick={handleCategoryClick}
                    onChange={e => setCategoryValue(e.target.value)}
                    handleInputReset={handleCategoryReset}
                />
                <p className='g_sub_txt'>※ '#' 으로 구분지어 입력해주세요.</p>
                <div className='category_wrap gapt_10'>
                    <Tags tags={existCategorys.map(tag => tag.categoryName)} className={'exist_category'} isLink={false} isNoData={false} handleDelete={handleTagDelete}/>
                    <Tags tags={submitData.categorys.map(tag => tag.categoryName)} className={'add_category'} isNoData={false} isLink={false} handleDelete={handleTagDelete}/>
                </div>
            </div>

            <div className='gap_30'>
                <Label htmlFor="content" content="습관 공개" className={"label_type1"}/>
                <div className='Profile_info_cont gender_wrap'>
                    <Input 
                        id="public" 
                        type="radio" 
                        required={true} 
                        className={"input_type1"} 
                        name="projectPublic" 
                        value={true}
                        onChange={handleValuesChange} 
                        defaultChecked={project.projectPublic && true}
                    />
                    <Label htmlFor="public" content="공개" className={"label_type1 gap_0"} />
                    <Input 
                        id="private" 
                        type="radio" 
                        required={true} 
                        className={"input_type1"} 
                        name="projectPublic" 
                        value={false}
                        onChange={handleValuesChange} 
                        defaultChecked={project.projectPublic === false && true}
                    />
                    <Label htmlFor="private" content="비공개" className={"label_type1 gap_0"} />
                </div>
            </div>
            <ViewDate className='flex_l gap_30' dates={[
                {txt: '생성일 - ', date: changeViewDate(project.createdAt, 'second')},
                {txt: '수정일 - ', date: changeViewDate(project.updatedAt, 'second')},
            ]} />


            <div className='pos_button_wrap'>
                <Button className={"button_type2"} onClick={handleProjectEdit}>습관 수정</Button>
            </div>

        </div>
    );
};

export default memo(ProjectEdit);