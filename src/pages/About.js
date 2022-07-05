import { Link } from "react-router-dom";

export function About() {
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-8 text-[1.8rem] underline underline-offset-2">Sobre o Mini<span className="font-bold uppercase">Blog</span></h1>
            <p className="text-[#AAA] mb-8 text-[1rem]">Este projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>
            <Link to="/posts/create" className="w-[120px] p-2 mt-5 rounded-lg bg-[#1a8918] font-bold text-[0.9em] text-white text-center cursor-pointer hover:bg-[#0F730c] disabled:bg-[#AAA]">
                Criar post
            </Link>
        </div>
    );
}