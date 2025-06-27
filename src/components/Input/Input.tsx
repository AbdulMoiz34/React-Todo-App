import type React from "react";
import { Input as AntInput } from "antd";

type Props = {
    placeholder: string,
    required?: boolean,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ placeholder, required, value, onChange }: Props) {
    return (
        <>
            <AntInput
                style={{ padding: "6px" }}
                className="flex-3/4 w-full rounded-lg inline-block text-base shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
            />
        </>
    );
}