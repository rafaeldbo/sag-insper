import { Activity } from "../../globalTypes";

export interface ExcelInputProps {
    setData: React.Dispatch<React.SetStateAction<{ [key: string]: { [key: string]: Activity[] } }>>;
};