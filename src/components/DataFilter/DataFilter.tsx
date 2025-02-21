import { useState } from 'react';

import { DataFilterProps } from "./types";
import styles from  "./styles";

import { SelectionField, NumberField } from '../basic/Fields';


export default function DataFilter({ setData }: DataFilterProps) {
    const [curso, setCurso] = useState<string>("");
    const [serie, setserie] = useState<number>(1);
    const [turma, setTurma] = useState<string>("");

    function sendFilter(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        event.preventDefault();
        if (curso !== "" && turma !== "") {
            setData(`${curso}_${serie}${turma}`);
        };
    }

    return (
        <form style={{...styles.container, ...styles.column}}>
            <h1 style={styles.dataFilterTitle}>Selecione um Curso e uma Turma</h1>
                <div style={styles.row}>
                <SelectionField 
                    fieldName="Curso" 
                    options={["ADM/ECO", "ADM", "ECO", "ENG", "MECA/MECAT", "COMP", "MECA", "MECAT", "DIR", "CIECOMP"]} 
                    setData={setCurso} 
                    placeholder="Curso" 
                    required={true}
                />
                <NumberField 
                    fieldName="Série" 
                    value={serie} 
                    setData={setserie}
                    min={1} max={10} 
                    placeholder="Série"
                    required={true}
                />
                <SelectionField 
                    fieldName="Turma" 
                    setData={setTurma} 
                    options={["A", "B", "C", "D", "DPA", "DPB", "DPC"]}
                    placeholder="Turma" 
                    required={true}
                />
            </div>
            <input type='submit' style={styles.sendButton} onClick={sendFilter} value="Selecionar"/>
        </form>
    );
};