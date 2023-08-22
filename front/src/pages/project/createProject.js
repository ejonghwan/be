import CreateProjectDetail from "../../components/project/CreateProjectDetail";


const createProject = ({ page }) => {
    return (
        <div>
            <h2>{page}</h2>
            <CreateProjectDetail />
        </div>
    );
};

export default createProject;