
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { LeafIcon } from '../constants';
import { AuthForm } from './AuthForm';

export const Header: React.FC = () => {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const { user, logout } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <>
            <header className="bg-white shadow-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 text-2xl font-bold text-green-700">
                        <LeafIcon className="w-8 h-8"/>
                        <span>سوق الفلاح</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        {user ? (
                            <>
                                {user.type === 'owner' && <Link to="/my-store" className="text-gray-600 hover:text-green-700 font-semibold">متجري</Link>}
                                <Link to="/dashboard" className="text-gray-600 hover:text-green-700 font-semibold">لوحة التحكم</Link>
                                <span className="text-gray-500">|</span>
                                <span className="text-gray-700">{user.email}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    تسجيل الخروج
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                            >
                                تسجيل الدخول / إنشاء حساب
                            </button>
                        )}
                    </nav>
                </div>
            </header>
            <AuthForm isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
};
