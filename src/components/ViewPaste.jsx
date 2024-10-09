import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
    const { id } = useParams();
    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.find((p) => p._id === id);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (paste) {
            setTitle(paste.title);
            setContent(paste.content);
        }
    }, [paste]);

    const formattedDate = new Date(paste?.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#1F2937] p-5">
            <div className="w-full max-w-2xl bg-gray-900 rounded-xl p-5 shadow-lg">
                <div className="flex flex-col">
                    <input
                        className="p-2 pl-5 bg-gray-700 text-xl rounded-2xl mt-2 w-full"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        disabled
                    />
                    <textarea
                        className="rounded-2xl mt-4 text-lg bg-gray-700 w-full p-4 h-full"
                        value={content}
                        disabled
                        placeholder="Enter Content here..."
                        rows={20}
                    />
                    <div className="flex justify-between mt-4"> 
                        <span className="text-gray-900">{formattedDate}</span>
                        {/* <div className="flex gap-2">
                            <button className="p-2 bg-blue-500 text-white rounded-lg">Edit</button>
                            <button className="p-2 bg-green-500 text-white rounded-lg">View</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPaste;
