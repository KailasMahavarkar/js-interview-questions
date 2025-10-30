interface EditableInputProps {
    isFolder: boolean;
    defaultValue?: string;
    placeholder?: string;
    onSubmit: (value: string) => void;
    onCancel: () => void;
}

const EditableInput = ({ isFolder, defaultValue, placeholder, onSubmit, onCancel }: EditableInputProps) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.currentTarget.value.trim()) {
            onSubmit(e.currentTarget.value.trim());
        }
    };

    return (
        <div className="inputContainer" style={{ width: "250px", marginBottom: "5px" }}>
            <span style={{ marginRight: "1rem" }}>
                {isFolder ? (
                    <i className="fa-solid fa-folder-closed" style={{ color: "#FFD43B" }}></i>
                ) : (
                    <i className="fa-file fa-regular"></i>
                )}
            </span>
            <input
                type="text"
                className="inputContainer__input"
                defaultValue={defaultValue}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                onBlur={onCancel}
                autoFocus
            />
        </div>
    );
};

export default EditableInput;

