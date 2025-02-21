import { useState } from 'react';

import { SelectionFieldProps, NumberFieldProps } from  "./types";

import { colors } from '../../globalStyles';
import styles from  "./styles";

export function SelectionField({ fieldName, options, setData, defaultOption, placeholder, required }: SelectionFieldProps) {
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
        <div style={styles.fieldContainer}>
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

export function NumberField({ fieldName, setData, min, max, value: defaultValue, placeholder, required }: NumberFieldProps) {
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
        <div style={styles.fieldContainer}>
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