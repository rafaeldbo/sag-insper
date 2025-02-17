import { useState } from "react";

import * as XLSX from "xlsx"

import { ActivityData } from "../../globalTypes";
import { ExcelInputProps } from "./types";
import { colors } from "../../globalStyles";
import styles from "./styles";

import Text from "../basic/Text";
import { validateActivityData, parseActivityData } from "../../databases/ActivityDatabase";


export default function ExcelInput({ setData }: ExcelInputProps) {
  const [filename, setFilename] = useState<string>("");
  const [warningText, setWarningText] = useState<string>("");

 function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {

    const file = event.target.files?.[0];
    if (!file) return;
    setFilename(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: ActivityData[] = XLSX.utils.sheet_to_json(sheet);
      
      if (!validateActivityData(jsonData[0])) {
        setWarningText("Planilha inválida");
        return;
      }
      setData(parseActivityData(jsonData));
    };

    // reader.readAsArrayBuffer(file);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.ExcelInputTitle}>Carregar Planilha de Atividades</h1>
      <label htmlFor="file" style={styles.sendButton}>Escolher Arquivo</label>
      <Text>{filename}</Text>
      <input 
        id="file" 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
        style={{display: 'none'}}
      />
      <Text color={colors.red}>{warningText}</Text>
    </div>
  ); 
};