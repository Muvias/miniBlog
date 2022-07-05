import { NavLink } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useAuthValue } from "../context/AuthContext";

export function Navbar() {
    const { user } = useAuthValue();
    const { logout } = useAuth();

    return (
        <nav className="flex items-center justify-between py-[.5em] px-[2em] mb-5 shadow">
            <NavLink to="/" className="text-[1em]">
                Mini<span className="font-black uppercase">Blog</span>
            </NavLink>

            <ul className="flex gap-1">
                <li>
                    <NavLink to="/" className="py-[.3em] px-[.5em] focus:bg-black focus:text-white">
                        Início
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className="py-[.3em] px-[.5em] focus:bg-black focus:text-white">
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className="py-[.3em] px-[.5em] focus:bg-black focus:text-white">
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink to="/posts/create" className="py-[.3em] px-[.5em] focus:bg-black focus:text-white">
                                Novo Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard" className="py-[.3em] px-[.5em] focus:bg-black focus:text-white">
                                Dashboard
                            </NavLink>
                        </li>
                    </>
                )}
                <li>
                    <NavLink to="/about" className="py-[.3em] px-[.5em] focus:bg-black focus:text-white">
                        Sobre
                    </NavLink>
                </li>
                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}