
import { Form } from './styles'

interface SearchInputProps {
    placeholder: string;
    value: string;
    onChange: (e : string) => void;

}

export function SearchForm({onChange, placeholder, value} : SearchInputProps){
    return (
        <Form>
            <form action="#">
                <input 
                    type="text" 
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                />
            </form>
        </Form>
    )
}