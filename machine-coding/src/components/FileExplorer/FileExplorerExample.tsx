import { useState } from "react";
import FileExplorer from "./FileExplorer";
import type { ExplorerNode } from "./FileExplorer";
import "../../styles.css";

// Helper function to generate unique IDs
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const FileExplorerExample = () => {
    const [explorerData, setExplorerData] = useState<ExplorerNode>({
        id: "1",
        name: "root",
        isFolder: true,
        items: [
            {
                id: "2",
                name: "public",
                isFolder: true,
                items: [
                    { id: "3", name: "index.html", isFolder: false },
                    { id: "4", name: "styles.css", isFolder: false },
                ],
            },
            {
                id: "5",
                name: "src",
                isFolder: true,
                items: [
                    { id: "6", name: "App.tsx", isFolder: false },
                    { id: "7", name: "index.tsx", isFolder: false },
                    {
                        id: "8",
                        name: "components",
                        isFolder: true,
                        items: [
                            { id: "9", name: "Header.tsx", isFolder: false },
                            { id: "10", name: "Footer.tsx", isFolder: false },
                        ],
                    },
                ],
            },
            { id: "11", name: "package.json", isFolder: false },
            { id: "12", name: "README.md", isFolder: false },
        ],
    });

    // Insert a new node (folder or file)
    const handleInsertNode = (parentId: string, name: string, isFolder: boolean) => {
        const newNode: ExplorerNode = {
            id: generateId(),
            name,
            isFolder,
            items: isFolder ? [] : undefined,
        };

        const insertIntoTree = (node: ExplorerNode): ExplorerNode => {
            // If this is the parent, add the new node to its items
            if (node.id === parentId && node.isFolder) {
                return {
                    ...node,
                    items: [...(node.items || []), newNode],
                };
            }

            // If this node has children, recursively search them
            if (node.items) {
                return {
                    ...node,
                    items: node.items.map(insertIntoTree),
                };
            }

            return node;
        };

        setExplorerData(insertIntoTree(explorerData));
    };

    // Delete a node
    const handleDeleteNode = (nodeId: string) => {
        const deleteFromTree = (node: ExplorerNode): ExplorerNode | null => {
            // If this is the node to delete, return null
            if (node.id === nodeId) {
                return null;
            }

            // If this node has children, filter out the deleted node
            if (node.items) {
                return {
                    ...node,
                    items: node.items
                        .map(deleteFromTree)
                        .filter((child): child is ExplorerNode => child !== null),
                };
            }

            return node;
        };

        const result = deleteFromTree(explorerData);
        if (result) {
            setExplorerData(result);
        }
    };

    // Update a node's name
    const handleUpdateNode = (nodeId: string, newName: string) => {
        const updateInTree = (node: ExplorerNode): ExplorerNode => {
            // If this is the node to update, change its name
            if (node.id === nodeId) {
                return {
                    ...node,
                    name: newName,
                };
            }

            // If this node has children, recursively update them
            if (node.items) {
                return {
                    ...node,
                    items: node.items.map(updateInTree),
                };
            }

            return node;
        };

        setExplorerData(updateInTree(explorerData));
    };

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>📁 File Explorer</h1>
            <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
                <FileExplorer
                    explorer={explorerData}
                    onInsert={handleInsertNode}
                    onDelete={handleDeleteNode}
                    onUpdate={handleUpdateNode}
                    
                />
            </div>

            <details style={{ marginTop: "20px" }}>
                <summary>Current State (JSON)</summary>
                <pre style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "4px" }}>
                    {JSON.stringify(explorerData, null, 2)}
                </pre>
            </details>

            <div style={{ marginTop: "20px", backgroundColor: "#e8f4f8", padding: "15px", borderRadius: "8px" }}>
                <h3>🔑 Callback Pattern Used:</h3>
                <pre>{`
// In FileExplorer.tsx (lines 66-72):
{explorer.items?.map((child) => (
  <FileExplorer
    key={child.id}
    explorer={child}
    // 🔥 Callbacks bubble up from child to parent
    onInsert={(parentId, name, isFolder) => handleChildInsert(parentId, name, isFolder)}
    onDelete={(childId) => handleChildDelete(childId)}
    onUpdate={(childId, newName) => handleChildUpdate(childId, newName)}
  />
))}

// When a deep child updates:
// 1. Child calls onUpdate(id, newName)
// 2. Parent receives it and passes it up
// 3. Continues bubbling up to top
// 4. Top-level updates state
// 5. React re-renders entire tree
        `}</pre>
            </div>
        </div>
    );
};

export default FileExplorerExample;

