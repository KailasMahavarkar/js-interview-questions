import { useEffect, useRef } from "react";

interface CheckboxConfig {
    id: number,
    label: string,
    checked: boolean,
    children: CheckboxConfig[],
}

interface NestedCheckboxProps {
    config: CheckboxConfig,
    onUpdate: (newState: CheckboxConfig) => void,
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
    const checkboxRef = useRef<HTMLInputElement>(null);
    const { checked, indeterminate } = getCheckState(config);

    useEffect(() => {
        if (checkboxRef.current) checkboxRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const handleToggle = () => {
        const setAll = (innerConfig: CheckboxConfig): CheckboxConfig => ({
            ...innerConfig,
            checked: !checked,
            children: innerConfig.children.map(setAll)
        })

        onUpdate(setAll(config)); // <- triggered state update for that node
    }

    return (
        <div className="checkbox-container">
            <input
                ref={checkboxRef}
                className="checkbox"
                type="checkbox" checked={checked}
                onChange={handleToggle} // parent -> child trigger
            ></input>

            <label htmlFor="checkbox">
                {config.label}
            </label>

            {
                config.children.map((child, i) => {
                    return (
                        <NestedCheckbox
                            key={child.id}
                            config={child}
                            onUpdate={newChild => onUpdate({ // triggers state update for parent
                                ...config,
                                children: config.children.map((c, idx) => idx === i ? newChild : c)
                            })}
                        />
                    )
                })
            }
        </div>
    )
}

export default NestedCheckbox