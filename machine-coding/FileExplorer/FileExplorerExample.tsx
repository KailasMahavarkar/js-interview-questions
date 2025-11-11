import React, { useState } from 'react'
import type { ExplorerConfig } from './types'
import FileExplorer from './FileExplorer';

const FileExplorerExample = () => {
    const inputConfig: ExplorerConfig = {
        id: "1",
        name: "root",
        isFolder: true,
        items: [
            {
                id: "2",
                name: "public",
                isFolder: true,
                items: [
                    {
                        id: "3",
                        name: "index.html",
                        isFolder: false,
                        items: [],
                    }
                ]
            },
            {
                id: "4",
                name: "src",
                isFolder: true,
                items: [
                    { id: "5", name: "App.tsx", isFolder: false, items: [] },
                ]
            },
            { id: "6", name: "package.json", isFolder: false, items: [] },
            { id: "7", name: "README.md", isFolder: false, items: [] },
        ]
    };

    const [config, setConfig] = useState<ExplorerConfig>(inputConfig);

    return (
        <div

            style={{
                padding: "20px", fontFamily: "sans-serif"
            }}>
            <h1>📁 File Explorer</h1>
            <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
                <FileExplorer
                    onUpdate={setConfig}
                    config={config} />
            </div>
            <details style={{ marginTop: "20px" }}>
                <summary>Current State (JSON)</summary>
                <pre style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "4px" }}>
                    {JSON.stringify(config, null, 2)}
                </pre>
            </details>
        </div>
    );
};

export default FileExplorerExample;