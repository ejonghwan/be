import CreateProjectDetail from "../../components/project/CreateProjectDetail";


const CreateMyProject = ({ page }) => {
    return (
        <div className="b_conts">
            <h2>{page}</h2>
            <CreateProjectDetail />
        </div>
    );
};

export default CreateMyProject;