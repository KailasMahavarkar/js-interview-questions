import { useEffect, useRef, useMemo } from "react";

export interface CheckboxConfig {
    checked: boolean;
    label: string;
    children: CheckboxConfig[];
}

interface NestedCheckboxProps {
    config: CheckboxConfig;
    onUpdate: (newConfig: CheckboxConfig) => void;
}


const getCheckState = (node: CheckboxConfig): {
    indeterminate: boolean,
    checked: boolean
} => {
    if (!node.children.length) {
        return {
            checked: node.checked,
            indeterminate: false
        }
    }

    const childStates = node.children.map((child) => getCheckState(child));
    const allChecked = childStates.every((s) => s.checked && !s.indeterminate);
    const noneChecked = childStates.every((s) => !s.checked && !s.indeterminate);

    return {
        indeterminate: !allChecked && !noneChecked,
        checked: allChecked
    }
}

const NestedCheckbox = ({ config, onUpdate }: NestedCheckboxProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const { checked, indeterminate } = useMemo(() => getCheckState(config), [config]);

    useEffect(() => {
        if (ref.current) ref.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const toggle = () => {
        const setAll = (node: CheckboxConfig): CheckboxConfig => ({
            ...node,
            checked: !checked,
            children: node.children.map(setAll),
        });
        onUpdate(setAll(config));
    };

    return (
        <div style={{ marginLeft: "40px", border: "1px solid red" }}>
            <label>
                <input ref={ref} type="checkbox" checked={checked} onChange={toggle} />
                {" "}{config.label}
            </label>
            {config.children.map((child, i) => (
                <NestedCheckbox
                    key={i}
                    config={child}
                    onUpdate={newChild => onUpdate({
                        ...config,
                        children: config.children.map((c, idx) => idx === i ? newChild : c)
                    })}
                />
            ))}
        </div>
    );
};

export default NestedCheckbox;