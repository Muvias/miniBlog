import { Link } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";
import { useFetchDatas } from "../hooks/useFetchDatas";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

export function Dashboard() {
    const { user } = useAuthValue();
    const uid = user.uid;

    const { datas: posts, loading } = useFetchDatas("posts", null, uid);

    const { deleteDocument } = useDeleteDocument("posts");


    if (loading) {
        return <p>Carregando...</p>
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-[1.8rem] mb-1">Dashboard</h1>
            <p  className="text-[#AAA] mb-5 text-[1rem]">Gerencie os seus posts</p>
            {posts && posts.length === 0 ? (
               <div>
                <p>Não foram encontrados posts</p>
                <Link
                    to="/posts/create"
                    className="w-[150px] p-2 mt-5 rounded-lg font-bold text-[1.5rem] text-white text-center cursor-pointer hover:bg-[#0F730c] disabled:bg-[#AAA]"
                >
                        Criar primeiro post
                </Link>
               </div>
            ) : (
                <>
                    <div className="flex justify-between mx-auto w-[50vw] font-bold border-b-2 border-grey">
                        <span>Título</span>
                        <span>ações</span>
                    </div>
                    
                    {posts && posts.map((post) => (
                        <div
                            key={post.id}
                            className="flex justify-between w-[50vw] pb-3 mt-6 border-b-2"
                        >
                            <h2 className="text-[1.1rem] font-medium text-[#3d3d3d] p-1">{post.title}</h2>
                            <div className="flex gap-2">
                                <Link
                                    to={`/posts/${post.id}`}
                                    className="w-[100px] p-1 rounded-sm font-medium text-[1.1rem] text-center cursor-pointer disabled:bg-[#AAA] border-2 border-black transition-colors"
                                >
                                    Ver
                                </Link>
                                <Link
                                    to={`/posts/edit/${post.id}`}
                                    className="w-[100px] p-1 rounded-sm font-medium text-[1.1rem] text-center cursor-pointer disabled:bg-[#AAA] border-2 border-black transition-colors"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => deleteDocument(post.id)}
                                    className="w-[100px] p-1 rounded-sm text-[1.1rem] font-medium text-center text-red-600 hover:text-white hover:bg-red-500 cursor-pointer  disabled:bg-[#AAA] border-2 border-red-400 transition-colors"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};