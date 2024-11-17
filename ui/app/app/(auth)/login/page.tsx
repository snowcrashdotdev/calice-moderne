import { LoginForm } from "@/app/components/auth";
import { Main } from "@/app/components/layout";

export default function Login() {
    return (
        <Main className="justify-center items-center">
            <LoginForm />
        </Main>
    )
}