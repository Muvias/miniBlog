import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

export function Post() {
    const { id } = useParams();

    const { data: post, loading } = useFetchData("/posts", id);

    return (
        <div className="flex flex-col max-w-[30rem] m-auto mt-4">
            {loading && <p>Carregando post...</p>}
            {post && (
                <>
                    <h2 className="text-[2rem] font-bold underline underline-offset-2 mt-1 mb-1 p-2 self-center">{post.title}</h2>
                    <img src={post.image} alt={post.title} className="w-[100%]" />
                    <p className="font-bold mt-1 text-sm">@{post.createdBy}</p>
                    <p className="flex text-center p-2 mt-2">{post.description}</p>
                    <h3 className="flex justify-center font-bold mt-4">Este post trata sobre:</h3>
                    <div className="flex flex-row gap-2 p-2 text-[#aaa] justify-center">
                        {post.tagsArray.map((tag) => (
                            <p key={tag}><span>#</span>{tag}</p>
                            ))}
                    </div>
                </>
            )}
        </div>
    );
};