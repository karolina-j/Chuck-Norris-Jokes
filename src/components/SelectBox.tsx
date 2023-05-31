import { ChangeEvent } from 'react'
import { Label } from "./Label";

type SelectOption = {
    label: string
    value: string
}

type Props = {
    value?: string;
    label?: string;
    disabled?: boolean;
    className?: string;
    options: SelectOption[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}


const SelectBox = ({
    value,
    label,
    disabled,
    className,
    options,
    onChange,
}: Props) => {
    const selectBox = (
        <select
            className={className}
            disabled={disabled}
            onChange={onChange}
            value={value}
        >
            {options.map(({ value, label }) => (
                <option key={label} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )

    const result = label ? (
        <Label>
            <div>{label}</div>
            <div> {selectBox} </div>
        </Label>
    ) : (
        selectBox
    )


    return <div> {result} </div>
}

export default SelectBox
export type {SelectOption}