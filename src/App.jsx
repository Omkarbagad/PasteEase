import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div>
                <Navbar />
                <div className="flex-grow">
                    <Home />
                </div>
            </div>
        ),
    },
    {
        path: '/pastes',
        element: (
            <div>
                <Navbar />
                <div className="flex-grow">
                    <Paste />
                </div>
            </div>
        ),
    },
    {
        path: '/pastes/:id',
        element: (
            <div>
                <Navbar />
                <div className="flex-grow">
                    <ViewPaste />
                </div>
            </div>
        ),
    },
]);

const App = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
