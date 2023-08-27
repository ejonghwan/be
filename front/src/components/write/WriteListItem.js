import './WriteListItem.css';

const WriteListItem = ({ project }) => {
    return (
        <div>
            {project.writes?.map(write => (
                <li key={write._id}>
                    <strong>{write.title}</strong>
                    <span>{write.user._id.name}</span>
                    <span>{write.user._id.id}</span>
                    <div>{write.title}</div>
                    <div>{write.content}</div>
                </li>
            ))}
        </div>
    );
};

export default WriteListItem;