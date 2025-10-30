import { useState } from "react";
import type { ExplorerNode } from "./FileExplorer";
import ActionButtons from "./ActionButtons";
import EditableInput from "./EditableInput";

interface FileItemProps {
  file: ExplorerNode;
  onDelete: (e: React.MouseEvent) => void;
  onUpdate: (newName: string) => void;
}

const FileItem = ({ file, onDelete, onUpdate }: FileItemProps) => {
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
    <div className="file">
      {/* File Display */}
      {!showUpdateField && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
            {/* Spacer to align with folder content */}
            <span style={{ width: "16px" }}></span>
            
            {/* File Icon */}
            <span>
              <i className="fa-file fa-regular"></i>
            </span>
            
            {/* File Name */}
            <span>{file.name}</span>
          </div>

          {/* Action Buttons */}
          <ActionButtons
            onRename={handleUpdateClick}
            onDelete={onDelete}
          />
        </>
      )}

      {/* Update Field */}
      {showUpdateField && (
        <EditableInput
          isFolder={false}
          defaultValue={file.name}
          onSubmit={handleUpdateSubmit}
          onCancel={() => setShowUpdateField(false)}
        />
      )}
    </div>
  );
};

export default FileItem;

