import { useState } from "react";
import NestedCheckbox from "./NestedCheckbox";

interface CheckboxConfig {
    checked?: boolean;
    label?: string;
    children?: CheckboxConfig[];
}

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

    return <NestedCheckbox config={config} onUpdate={setConfig} />;
};

export default NestedCheckboxExample;