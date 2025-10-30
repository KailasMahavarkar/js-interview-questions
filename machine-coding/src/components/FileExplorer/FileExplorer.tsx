import { useState } from "react";
import FolderItem from "./FolderItem";
import FileItem from "./FileItem";

export interface ExplorerNode {
    id: string;
    name: string;
    isFolder: boolean;
    items?: ExplorerNode[];
}

interface FileExplorerProps {
    explorer: ExplorerNode;
    onInsert: (parentId: string, name: string, isFolder: boolean) => void;
    onDelete: (nodeId: string) => void;
    onUpdate: (nodeId: string, newName: string) => void;
}

const FileExplorer = ({ explorer, onInsert, onDelete, onUpdate }: FileExplorerProps) => {
    const [expand, setExpand] = useState(true); // Start expanded by default
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false,
    });

    // Handle adding new folder/file
    const handleAddNew = (e: React.MouseEvent, isFolder: boolean) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({ visible: true, isFolder });
    };

    // Handle creating the new item
    const handleCreate = (value: string) => {
        onInsert(explorer.id, value, showInput.isFolder);
        setShowInput({ visible: false, isFolder: false });
    };

    // Handle delete
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(explorer.id);
    };

    // These handlers just pass through to parent - using callback pattern!

    // Render based on type
    if (explorer.isFolder) {
        return (
            <FolderItem
                folder={explorer}
                expand={expand}
                onToggleExpand={() => setExpand(!expand)}
                onAddNew={handleAddNew}
                onDelete={handleDelete}
                onUpdate={(newName) => onUpdate(explorer.id, newName)}
                showInput={showInput}
                onCreateNew={handleCreate}
                onCancelCreate={() => setShowInput({ visible: false, isFolder: false })}
            >
                {/* Render children using the callback pattern */}
                {explorer.items?.map((child) => (
                    <FileExplorer
                        key={child.id}
                        explorer={child}
                        // 🔥 THE CALLBACK PATTERN - Just pass callbacks through!
                        onInsert={onInsert}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                ))}
            </FolderItem>
        );
    }

    return (
        <FileItem
            file={explorer}
            onDelete={handleDelete}
            onUpdate={(newName) => onUpdate(explorer.id, newName)}
        />
    );
};

export default FileExplorer;

