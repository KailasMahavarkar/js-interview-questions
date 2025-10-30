interface ActionButtonsProps {
    onAddFolder?: (e: React.MouseEvent) => void;
    onAddFile?: (e: React.MouseEvent) => void;
    onRename: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
}

const ActionButtons = ({ onAddFolder, onAddFile, onRename, onDelete }: ActionButtonsProps) => {
    return (
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {onAddFolder && (
                <button
                    onClick={onAddFolder}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    title="Add Folder"
                >
                    <i className="fa-solid fa-folder-plus fa-lg"></i>
                </button>
            )}
            {onAddFile && (
                <button
                    onClick={onAddFile}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    title="Add File"
                >
                    <i className="fa-solid fa-file-circle-plus"></i>
                </button>
            )}
            <button
                onClick={onRename}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                title="Rename"
            >
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
                onClick={onDelete}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                title="Delete"
            >
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </div>
    );
};

export default ActionButtons;

