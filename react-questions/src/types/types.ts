type TextConfig = {
    key: string;
    type: 'text';
    label: string;
    placeholder?: string;
}

type SelectConfig = {
    key: string;
    type: 'select';
    label: string;
    children: { value: string; label: string }[];
}

type RadioConfig = {
    key: string;
    type: 'radio';
    label: string;
    children: { value: string; label: string }[];
    multiple: boolean;
}

export type FormElementConfig = TextConfig | SelectConfig | RadioConfig;

export interface DynamicFormProps {
    config: FormElementConfig[];
    onSubmit: (formData: Record<string, string>) => void;
}

