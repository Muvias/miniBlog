import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useFetchDatas } from "../hooks/useFetchDatas"

import { PostDetail } from "../components/PostDetail";

export function Home() {
  const [query, setQuery] = useState("");
  const { datas: posts, loading } = useFetchDatas("posts") 
  
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`)
    };
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="flex font-bold text-[2rem] justify-center mb-5">Postagens mais recentes</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 items-center text-center justify-center">
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-[100%] w-[20rem] box-border border-b-[1px] border-[#CCC] py-[0.5rem] px-1 bg-transparent placeholder:text-[#AAA] rounded-sm focus:ring-1 focus:outline-none focus:border-[#000] focus:ring-[#000] text-sm"
        />

        <button className="w-[100px] p-[0.5rem] bg-[#000] font-bold text-sm text-white text-center cursor-pointer hover:bg-[#242424] disabled:bg-[#AAA]">Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <p>Não foram encontrados posts</p>
            <Link
              to="/posts/create"
              className="w-[200px] p-[0.70rem] mt-5 rounded-lg bg-[#1a8918] font-bold text-[1rem] text-white text-center cursor-pointer hover:bg-[#0F730c] disabled:bg-[#AAA]"
            >
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}