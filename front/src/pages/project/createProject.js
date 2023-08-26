import CreateProjectDetail from "../../components/project/CreateProjectDetail";


const CreateProject = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <CreateProjectDetail />
        </div>
    );
};

export default CreateProject;