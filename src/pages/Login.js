import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login, error: authError, loading } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const user = {
            email,
            password
        };

        const response = await login(user);

        console.log(response);
    };

    useEffect(() => {

        if(authError) {
            setError(authError);
        };

    }, [authError]);
    
    return (
        <div className="text-center">
            <h1 className="font-bold text-[1.8rem] mb-1">Entrar</h1>

            <p className="text-[#aaa] mb-5 text-[1rem]">Entre e compartilhe</p>

            <form onSubmit={handleSubmit} className="max-w-[30%] my-0 mx-auto text-[1rem]">

                <label className="flex flex-col">
                    <span className="font-bold text-left">Email:</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email do usuário"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="box-border border-b-[1px] border-[#CCC] py-[0.8em] px-1 mb-1 bg-transparent placeholder:text-[#AAA]"
                        required
                    />
                </label>

                <label className="flex flex-col">
                    <span className="font-bold text-left">Senha:</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha do usuário"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="box-border border-b-[1px] border-[#CCC] py-[0.8em] px-1 mb-1 bg-transparent placeholder:text-[#AAA]"
                        required
                    />
                </label>

                {!loading &&
                    <button className="w-[130px] p-2 mt-5 rounded-lg bg-[#1a8918] font-bold text-[1rem] text-white text-center cursor-pointer hover:bg-[#0F730c] disabled:bg-[#AAA]">
                        Entrar
                    </button>
                }
                {loading &&
                    <button className="w-[130px] p-2 mt-5 rounded-lg bg-[#1a8918] font-bold text-[1rem] text-white text-center hover:bg-[#0F730c] disabled:bg-[#AAA]" disabled>
                        Aguarde...
                    </button>
                }

                {error && <p className="mt-5 py-2 shadow rounded-md bg-red-400 text-gray-100 text-sm">{error}</p>}
            </form>
        </div>
    );
}