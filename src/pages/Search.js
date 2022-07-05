import { Link } from "react-router-dom";

import { useFetchDatas } from "../hooks/useFetchDatas";
import { useQuery } from "../hooks/useQuery";

import { PostDetail } from "../components/PostDetail";

export function Search() {
    const query = useQuery();
    const search = query.get("q");

    const {datas: posts} = useFetchDatas("posts", search);

    return (
        <div>
            <h1 className="flex justify-center text-[2rem] font-bold">Resultado da pesquisa:</h1>
            <div>
                {posts && posts.length === 0 && (
                    <>
                        <p className="flex justify-center text-[1.5rem] mt-4">Não foram encontrados posts a partir da sua busca...</p>
                        <Link to="/" className="flex justify-center mx-auto mt-4 w-[7rem] p-[0.5rem] bg-[#000] font-bold text-md text-white text-center cursor-pointer hover:bg-[#242424] disabled:bg-[#AAA]">Voltar</Link>
                    </>
                )}

                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
};