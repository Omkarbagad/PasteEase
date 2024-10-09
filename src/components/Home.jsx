// Home.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };
        if (pasteId) {
            dispatch(updateToPaste(paste));
        } else {
            dispatch(addToPaste(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-800 text-white">
            <div className="w-full max-w-3xl p-5 bg-gray-800 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input
                        className="flex-grow p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={createPaste}
                        className="p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all font-semibold">
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>
                <textarea
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    value={value}
                    placeholder="Enter content here..."
                    onChange={(e) => setValue(e.target.value)}
                    rows={10}
                />
            </div>
        </div>
    );
};

export default Home;
