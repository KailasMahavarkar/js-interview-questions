import { createContext } from "react";

const FormContext = createContext<{
    formData: Record<string, string>;
    updateFormData: (key: string, value: string) => void;
}>({
    formData: {},
    updateFormData: () => { },
});

export { FormContext };