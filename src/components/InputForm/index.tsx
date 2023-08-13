import {InputHTMLAttributes} from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    value?: string;
}

export function InputForm({
    value,
    ...props
} : InputProps){

    return (
        <input
            {...props}
            value={value}
        />
    )
}