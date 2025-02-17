export interface SelectionFieldProps {
    fieldName: string;
    options: string[];
    setData: React.Dispatch<React.SetStateAction<string>>;
    defaultOption?: string;
    placeholder?: string;
    required?: boolean;
};

export interface NumberFieldProps {
    fieldName: string;
    value: number;
    setData: React.Dispatch<React.SetStateAction<number>>;
    min?: number;
    max?: number;
    placeholder?: string;
    required?: boolean;
};

export interface DataFilterProps {
    setData: React.Dispatch<React.SetStateAction<string>>;
};