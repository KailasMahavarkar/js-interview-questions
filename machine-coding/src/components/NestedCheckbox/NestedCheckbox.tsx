import { useEffect, useRef } from "react";

interface CheckboxConfig {
    checked?: boolean;
    label?: string;
    children?: CheckboxConfig[];
}

interface NestedCheckboxProps {
    config: CheckboxConfig;
    onUpdate: (newConfig: CheckboxConfig) => void;
}

const NestedCheckbox = ({ config, onUpdate }: NestedCheckboxProps) => {
    const ref = useRef<HTMLInputElement>(null);

    // Determine state from children
    const isLeaf = !config.children?.length;
    const allChecked = config.children?.every(c => c.checked) ?? false;
    const someChecked = config.children?.some(c => c.checked) ?? false;

    const checked = isLeaf ? (config.checked ?? false) : allChecked;
    const indeterminate = !isLeaf && someChecked && !allChecked;

    useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const toggle = () => {
        const newValue = !checked;
        const setAll = (node: CheckboxConfig): CheckboxConfig => ({
            ...node,
            checked: newValue,
            children: node.children?.map(setAll),
        });
        onUpdate(setAll(config));
    };

    return (
        <div style={{ marginLeft: "40px", border: "1px solid red" }}>
            <label>
                <input ref={ref} type="checkbox" checked={checked} onChange={toggle} />
                {" "}{config.label}
            </label>
            {config.children?.map((child, i) => (
                <NestedCheckbox
                    key={i}
                    config={child}
                    onUpdate={newChild => onUpdate({
                        ...config,
                        children: config.children!.map((c, idx) => idx === i ? newChild : c)
                    })}
                />
            ))}
        </div>
    );
};

export default NestedCheckbox;