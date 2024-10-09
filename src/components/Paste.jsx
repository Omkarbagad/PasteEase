// Paste.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const filterData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleDelete(pasteId) {
        dispatch(removeFromPaste(pasteId));
    }

    function handleShare(paste) {
        const encodedContent = encodeURIComponent(JSON.stringify(paste));
        const link = `${window.location.origin}/share/${paste?._id}?data=${encodedContent}`;
        navigator.clipboard.writeText(link).then(() => {
            toast.success("Link Copied to the clipboard");
        });
    }

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        // Updated Paste Component
        <div className="flex flex-col items-center bg-gray-800 p-5">
            <input
                className="p-2 rounded-lg mt-5 bg-gray-700 text-white w-full max-w-lg md:max-w-md sm:max-w-full"
                type="search"
                placeholder="Search paste"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='flex flex-col gap-5 mt-5 w-full max-w-3xl'>
                {filterData.length > 0 &&
                    filterData.map((paste) => {
                        return (
                            <div
                                className="border p-5 bg-gray-700 text-white rounded-lg flex flex-col sm:flex-row sm:justify-between gap-4"
                                key={paste?._id}
                            >
                                <div className="flex flex-col w-full sm:w-1/2">
                                    <div className="font-bold text-lg">{paste.title}</div>
                                    <div className="mt-2 text-sm">{paste.content}</div>
                                </div>
                                <div className="flex flex-col w-full sm:w-1/2 sm:items-end">
                                    <div className="flex flex-wrap gap-2 mt-2 justify-end">
                                        <button className="text-blue-400 hover:underline">
                                            <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                                        </button>
                                        <button className="text-blue-400 hover:underline">
                                            <a href={`/pastes/${paste?._id}`}>View</a>
                                        </button>
                                        <button
                                            className="text-red-400 hover:underline"
                                            onClick={() => handleDelete(paste?._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="text-green-400 hover:underline"
                                            onClick={() => {
                                                navigator.clipboard.writeText(paste?.content);
                                                toast.success("Copied to Clipboard");
                                            }}
                                        >
                                            Copy
                                        </button>
                                        <button
                                            className="text-blue-400 hover:underline"
                                            onClick={() => handleShare(paste)}
                                        >
                                            Share
                                        </button>
                                    </div>
                                    <div className="text-sm text-gray-400 mt-2 sm:mt-0">
                                        {formatDate(paste.createdAt)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>

    );
};

export default Paste;
