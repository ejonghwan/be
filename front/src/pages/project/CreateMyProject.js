import HeadMetaTag from "../../components/common/HeadMetaTag";
import CreateProjectDetail from "../../components/project/CreateProjectDetail";


const CreateMyProject = ({ page }) => {
    return (
        <div className="b_conts">
            <HeadMetaTag title={`HOBBYIST. 습관 만들기 | ${page}`} />
            <h2>{page}</h2>
            <CreateProjectDetail />
        </div>
    );
};

export default CreateMyProject;