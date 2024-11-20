import type { FormHTMLAttributes } from "react";

export function Form(props: FormHTMLAttributes<HTMLFormElement>) {
    return <form {...props} className={`flex flex-col gap-y-7 ${props.className}`.trim()} />
}