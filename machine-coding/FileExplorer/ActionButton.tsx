interface ActionButtonsProps {
    onAddFolder?: (e: React.MouseEvent) => void;
    onAddFile?: (e: React.MouseEvent) => void;
    onRename: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    isFolder?: boolean;
}

const ActionButtons = ({ onAddFolder, onAddFile, onRename, onDelete, isFolder }: ActionButtonsProps) => {
    return (
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {isFolder && onAddFolder && (
                <button
                    onClick={onAddFolder}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    title="Add Folder"
                >
                    [folder]+
                </button>
            )}
            {isFolder && onAddFile && (
                <button
                    onClick={onAddFile}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                    title="Add File"
                >
                    [file]+
                </button>
            )}
            <button
                onClick={onRename}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                title="Rename"
            >
                [rename]
            </button>
            <button
                onClick={onDelete}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                title="Delete"
            >
                [delete]
            </button>
        </div>
    );
};

export default ActionButtons;

