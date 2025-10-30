import { useState } from "react";
import type { ExplorerNode } from "./FileExplorer";
import ActionButtons from "./ActionButtons";
import EditableInput from "./EditableInput";

interface FolderItemProps {
    folder: ExplorerNode;
    expand: boolean;
    onToggleExpand: () => void;
    onAddNew: (e: React.MouseEvent, isFolder: boolean) => void;
    onDelete: (e: React.MouseEvent) => void;
    onUpdate: (newName: string) => void;
    showInput: { visible: boolean; isFolder: boolean };
    onCreateNew: (value: string) => void;
    onCancelCreate: () => void;
    children?: React.ReactNode;
}

const FolderItem = ({
    folder,
    expand,
    onToggleExpand,
    onAddNew,
    onDelete,
    onUpdate,
    showInput,
    onCreateNew,
    onCancelCreate,
    children,
}: FolderItemProps) => {
    const [showUpdateField, setShowUpdateField] = useState(false);

    const handleUpdateClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowUpdateField(true);
    };

    const handleUpdateSubmit = (value: string) => {
        onUpdate(value);
        setShowUpdateField(false);
    };

    return (
        <div style={{ marginTop: "10px" }}>
            {/* Folder Header */}
            {!showUpdateField && (
                <div className="folder" onClick={onToggleExpand}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                        {/* Expand/Collapse Icon */}
                        <span style={{ width: "16px", display: "flex", justifyContent: "center" }}>
                            {expand ? (
                                <i className="fa-solid fa-angle-down"></i>
                            ) : (
                                <i className="fa-solid fa-angle-right"></i>
                            )}
                        </span>

                        {/* Folder Icon */}
                        <span>
                            {expand ? (
                                <i className="fa-solid fa-folder-open" style={{ color: "#FFD43B" }}></i>
                            ) : (
                                <i className="fa-solid fa-folder-closed" style={{ color: "#FFD43B" }}></i>
                            )}
                        </span>

                        {/* Folder Name */}
                        <span>{folder.name}</span>
                    </div>

                    {/* Action Buttons */}
                    <ActionButtons
                        onAddFolder={(e) => onAddNew(e, true)}
                        onAddFile={(e) => onAddNew(e, false)}
                        onRename={handleUpdateClick}
                        onDelete={onDelete}
                    />
                </div>
            )}

            {/* Update Field */}
            {showUpdateField && (
                <EditableInput
                    isFolder={true}
                    defaultValue={folder.name}
                    onSubmit={handleUpdateSubmit}
                    onCancel={() => setShowUpdateField(false)}
                />
            )}

            {/* Expanded Content */}
            <div style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}>
                {/* New Item Input */}
                {showInput.visible && (
                    <EditableInput
                        isFolder={showInput.isFolder}
                        placeholder={showInput.isFolder ? "Folder name" : "File name"}
                        onSubmit={onCreateNew}
                        onCancel={onCancelCreate}
                    />
                )}

                {/* Children Nodes */}
                {children}
            </div>
        </div>
    );
};

export default FolderItem;

