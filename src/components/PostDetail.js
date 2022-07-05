import { Link } from "react-router-dom";

export function PostDetail({ post }) {
    return (
        <div className="flex flex-col max-w-[30rem] m-auto border rounded-sm mt-4">
            <p className="font-bold p-2">@{post.createdBy}</p>
            <img src={post.image} alt={post.title} className="w-[100%]" />
            <h2 className="font-bold underline underline-offset-2 mt-2 mb-1 p-2">{post.title}</h2>
            <p className="p-2">{post.description}</p>
            <div className="flex flex-row gap-2 p-2 text-[#aaa]">
                {post.tagsArray.map((tag) => (
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className="p-2">Ler</Link>
        </div>
    )
}