'use client';

import React, { useReducer } from "react";
import { DynamicFormProps, FormElementConfig } from "../types/types";
import { Input, Button, Label, Select, Radio } from "../components";
import { FormProvider } from "./context/context";
import { formReducer } from "./reducer/formReducer";

const DynamicFormWithReducer: React.FC<DynamicFormProps> = ({
    config,
    onSubmit,
}) => {
    const [state, dispatch] = useReducer(formReducer, {});

    const handleInputChange = (key: string, value: string) => {
        dispatch({ type: 'UPDATE_FIELD', key, value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(state); // Pass the state (form data) to the onSubmit function
    };

    const renderFormElement = (element: FormElementConfig) => {
        switch (element.type) {
            case "text":
                return (
                    <div key={element.key} className="mb-4">
                        <Label htmlFor={element.key}>{element.label}</Label>
                        <Input
                            type="text"
                            id={element.key}
                            value={state[element.key] || ""}
                            onChange={(e) => handleInputChange(element.key, e.target.value || '')}
                            placeholder={element.placeholder}
                        />
                    </div>
                );
            case "select":
                return (
                    <div key={element.key} className="mb-4">
                        <Label htmlFor={element.key}>{element.label}</Label>
                        <Select
                            value={state[element.key] || ""}
                            onChange={(e) => handleInputChange(element.key, e.target.value)}
                            options={element.children || []}
                        />
                    </div>
                );
            case "radio":
                return (
                    <div key={element.key} className="mb-4">
                        <Radio
                            multiSelect={element.multiple}
                            options={element.children || []}
                            selectedValues={
                                state[element.key] ? state[element.key].split(",") : []
                            }
                            onChange={(selected) =>
                                handleInputChange(element.key, selected.join(","))
                            }
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <FormProvider>
            <form onSubmit={handleSubmit} className="space-y-4">
                {config.map(renderFormElement)}
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    );
};


export default DynamicFormWithReducer