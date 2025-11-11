import { useState } from "react";
import NestedCheckbox, { type CheckboxConfig } from "./NestedCheckbox";

const NestedCheckboxExample = () => {
    const initialConfig: CheckboxConfig = {
        label: "Parent",
        checked: false,
        children: [
            {
                label: "Child 1",
                checked: false,
                children: [
                    {
                        label: "Grand Child",
                        checked: false,
                        children: [],
                    },
                ],
            },
            { label: "Child 2", checked: false, children: [] },
        ],
    };

    const [config, setConfig] = useState<CheckboxConfig>(initialConfig);

    const handleUpdate = (newConfig: CheckboxConfig) => {
        setConfig(newConfig);
    };

    return <NestedCheckbox config={config} onUpdate={handleUpdate} />;
};

export default NestedCheckboxExample;