import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useFetchData } from "../hooks/useFetchData";
import { useUpdateDocument } from "../hooks/useUpdateDocument";

export function EditPost() {
    const { id } = useParams();
    const { data: post } = useFetchData("posts", id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if(post) {
            setTitle(post.title);
            setDescription(post.description);
            setImage(post.image);

            const textTags = post.tagsArray.join(", ");

            setTags(textTags);
        }
    }, [post]);

    const { user } = useAuthValue();

    const { updateDocument, response } = useUpdateDocument("posts");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setFormError("");

        try {
            new URL(image);
        } catch (err) {
            setFormError("A imagem precisa ser uma URL.");
        };

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !description || !tags) {
            setFormError("Por favor, preencha todos os campos!")
        };

        if (formError) return;

        const data = {
            title,
            image,
            description,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        };

        updateDocument(
            id,
            data,
        );

        navigate("/dashboard")
    };

    return (
        <div className="text-center">
            <h1 className="font-bold text-[2rem] mb-1">Editar postagem</h1>
            <p className="text-[#AAA] mb-5 text-[1rem]">Altere o título, conteúdo, imagem ou tag de seu post</p>
            {post && (
                <>
                    <form onSubmit={handleSubmit} className="gap-5 max-w-[35rem] my-0 mx-auto text-[1.5rem]">
                        <label className="flex flex-col">
                            <span className="font-bold text-left">Título:</span>
                            <input
                                type="text"
                                name="title"
                                placeholder="Título da postagem"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="box-border border-b-[1px] border-[#CCC] py-[0.8em] px-1 mb-1 bg-transparent placeholder:text-[#AAA] rounded-sm focus:ring-1 focus:outline-none focus:border-[#000] focus:ring-[#000] text-sm"
                                required
                            />
                            
                            <span className="font-bold text-left">Imagem:</span>
                            <input
                                type="text"
                                name="image"
                                placeholder="Insira a URL da imagem"
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                                className="box-border border-b-[1px] border-[#CCC] py-[0.8em] px-1 mb-1 bg-transparent placeholder:text-[#AAA] rounded-sm focus:ring-1 focus:outline-none focus:border-[#000] focus:ring-[#000] text-sm"
                                required
                            />
                            <p className="font-bold text-left">Preview da imagem atual:</p>
                            <img
                                src={image}
                                alt={title}
                                className="w-[100%] mb-3"
                            />

                            <span className="font-bold text-left">Descrição:</span>
                            <textarea
                                name="description"
                                placeholder="Escreva uma legenda..."
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                className="box-border border-b-[1px] border-[#CCC] py-[0.8em] px-1 mb-1 bg-transparent placeholder:text-[#AAA] rounded-sm focus:border-[#000] focus:ring-[#000] focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin text-sm"
                                required
                            />
                            
                            <span className="font-bold text-left">Tags:</span>
                            <input
                                type="text"
                                name="tags"
                                placeholder="Insira as tags separadas por vírgula"
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                                className="box-border border-b-[1px] border-[#CCC] py-[0.8em] px-1 mb-1 bg-transparent placeholder:text-[#AAA] rounded-sm focus:ring-1 focus:outline-none focus:border-[#000] focus:ring-[#000] text-sm"
                                required
                            />
                        </label>

                        {!response.loading &&
                            <button className="w-[150px] p-2 mt-5 rounded-lg bg-[#1a8918] font-bold text-[1.5rem] text-white text-center cursor-pointer hover:bg-[#0F730c] disabled:bg-[#AAA]">
                                Editar
                            </button>
                        }
                        {response.loading &&
                            <button className="w-[150px] p-2 mt-5 rounded-lg bg-[#1a8918] font-bold text-[1.5rem] text-white text-center hover:bg-[#0F730c] disabled:bg-[#AAA]" disabled>
                                Aguarde...
                            </button>
                        }

                        {response.error && <p className="mt-5 py-2 shadow rounded-md bg-red-400 text-gray-100 text-sm">{response.error}</p>}
                        {formError && <p className="mt-5 py-2 shadow rounded-md bg-red-400 text-gray-100 text-sm">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    );
};