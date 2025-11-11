import type { ExplorerConfig } from "./types";
import "./style.css";
import ActionButtons from "./ActionButton";
import { useState } from "react";

const FileExplorer = ({ config, onUpdate, onDelete }: { 
    config: ExplorerConfig, 
    onUpdate: (newConfig: ExplorerConfig) => void,
    onDelete?: (id: string) => void 
}) => {
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputType, setInputType] = useState<"folder" | "file" | "rename">("folder");
    const [isRenaming, setIsRenaming] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleRename = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsRenaming(true);
        setInputValue(config.name);
        setInputType("rename");
    }
    
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${config.name}"?`)) {
            if (onDelete) {
                onDelete(config.id);
            }
        }
    }

    const handleRenameSubmit = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!inputValue.trim() || inputValue === config.name) {
            setIsRenaming(false);
            setInputValue("");
            return;
        }

        const newConfig: ExplorerConfig = {
            ...config,
            name: inputValue
        };

        onUpdate(newConfig);
        setIsRenaming(false);
        setInputValue("");
    }

    const handleAddFolder = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInputType("folder");
        setShowInput(true);
        setInputValue("");
    }
    
    const handleAddFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInputType("file");
        setShowInput(true);
        setInputValue("");
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!inputValue.trim()) {
            return;
        }

        const isFile = inputType === 'file';
        const newId = `${config.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const newConfig: ExplorerConfig = {
            ...config,
            items: [
                {
                    id: newId,
                    name: inputValue,
                    isFolder: !isFile,
                    items: []
                },
                ...config.items
            ]
        };

        onUpdate(newConfig);
        setShowInput(false);
        setInputValue("");
    }

    const handleNestedUpdate = (updatedChild: ExplorerConfig) => {
        const newConfig: ExplorerConfig = {
            ...config,
            items: config.items.map(item => 
                item.id === updatedChild.id ? updatedChild : item
            )
        };
        onUpdate(newConfig);
    }

    const handleNestedDelete = (idToDelete: string) => {
        const newConfig: ExplorerConfig = {
            ...config,
            items: config.items.filter(item => item.id !== idToDelete)
        };
        onUpdate(newConfig);
    }


    return (
        <div className="folder-or-file-container">

            <div className="folder-or-file">
                {
                    config.isFolder ? (
                        <div className="folder">
                            <div className="folder-name">
                                {isRenaming ? (
                                    <div className="input-container" style={{ display: "inline-flex", marginRight: "8px" }}>
                                        <input 
                                            type="text" 
                                            value={inputValue} 
                                            onChange={handleInputChange}
                                            placeholder="Enter new name"
                                            autoFocus
                                        />
                                        <button onClick={handleRenameSubmit}>✓</button>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            setIsRenaming(false);
                                            setInputValue("");
                                        }}>✕</button>
                                    </div>
                                ) : (
                                    <>
                                        {config.name}
                                        <ActionButtons
                                            onRename={handleRename}
                                            onDelete={handleDelete}
                                            onAddFolder={handleAddFolder}
                                            onAddFile={handleAddFile}
                                            isFolder={true}
                                        />
                                    </>
                                )}
                            </div>
                            {
                                showInput && (
                                    <div className="input-container" style={{ marginLeft: "20px" }}>
                                        <input 
                                            type="text" 
                                            value={inputValue} 
                                            onChange={handleInputChange}
                                            placeholder={`Enter ${inputType} name`}
                                            autoFocus
                                        />
                                        <button onClick={handleSubmit}>Submit</button>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            setShowInput(false);
                                            setInputValue("");
                                        }}>Cancel</button>
                                    </div>
                                )
                            }
                            <div className="folder-items">
                                {
                                    config.items.map((item) => (
                                        <FileExplorer
                                            key={item.id} 
                                            config={item}
                                            onUpdate={handleNestedUpdate}
                                            onDelete={handleNestedDelete}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <div className="file">
                            <div className="file-name">
                                {isRenaming ? (
                                    <div className="input-container" style={{ display: "inline-flex", marginRight: "8px" }}>
                                        <input 
                                            type="text" 
                                            value={inputValue} 
                                            onChange={handleInputChange}
                                            placeholder="Enter new name"
                                            autoFocus
                                        />
                                        <button onClick={handleRenameSubmit}>✓</button>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            setIsRenaming(false);
                                            setInputValue("");
                                        }}>✕</button>
                                    </div>
                                ) : (
                                    <>
                                        {config.name}
                                        <ActionButtons
                                            onRename={handleRename}
                                            onDelete={handleDelete}
                                            onAddFolder={() => { }}
                                            onAddFile={handleAddFile}
                                            isFolder={false}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default FileExplorer