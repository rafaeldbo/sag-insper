import { useState } from 'react';

import { SelectionFieldProps, NumberFieldProps, DataFilterProps } from "./types";

import { colors } from '../../globalStyles';
import styles from  "./styles";


function SelectionField({ fieldName, options, setData, defaultOption, placeholder, required }: SelectionFieldProps) {
    const [color, setColor] = useState(colors.black);
    const fieldSize = Math.max(...options.map(str => str.length), fieldName.length);

    function handleSelection(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        if (options.includes(value)) {
            setData(value);
            setColor(colors.green);
        }
        else {
            setData("");
            setColor(colors.red);
        }
    };

    return (
        <div style={styles.selectionFieldContainer}>
            <h1 style={{...styles.fieldTitle, color: color}}>{fieldName}: </h1>
            <input 
                type="text" 
                value={defaultOption} 
                name={fieldName} 
                placeholder={(placeholder !== undefined) ? placeholder : fieldName} 
                list={`options-${fieldName}`} 
                autoComplete="on" 
                required={required} 
                onChange={handleSelection}
                style={{width: `${fieldSize}rem`, borderColor: color}} 
            />
            <datalist id={`options-${fieldName}`}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </datalist>
        </div>
    );
};

function NumberField({ fieldName, setData, min, max, value: defaultValue, placeholder, required }: NumberFieldProps) {
    const [color, setColor] = useState(colors.black);
    const fieldSize = Math.max(fieldName.length, ((max !== undefined) ? max.toString().length : 1));

    function handleSelection(event: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(event.target.value);
        if ((min === undefined || value >= min) && (max === undefined || value <= max)) {
            setData(value);
            setColor(colors.green);
        }
        else {
            setData(value);
            setColor(colors.red);
        }
    };

    return (
        <div style={styles.selectionFieldContainer}>
            <h1 style={styles.fieldTitle}>{fieldName}: </h1>
            <input 
                type="number" 
                name={fieldName} 
                value={(defaultValue === undefined) ? min : defaultValue} 
                placeholder={(placeholder !== undefined) ? placeholder : fieldName} 
                min={min} max={max} 
                required={required} 
                onChange={handleSelection}
                style={{width: `${fieldSize}rem`, borderColor: color}} 
            />
        </div>
    );
};

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
                <div style={styles.column}>
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
            </div>
            <input type='submit' style={styles.sendButton} onClick={sendFilter} value="Selecionar"/>
        </form>
    );
};