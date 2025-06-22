import TextField from "@mui/material/TextField";

type InputProps = {
    placeholder: string,
    required: boolean,
    value: string,
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ placeholder, required, changeHandler, value }: InputProps) => {
    return <TextField id="standard-basic" label={placeholder} value={value} onChange={changeHandler} variant="outlined" required={required} />;

}

export default Input;