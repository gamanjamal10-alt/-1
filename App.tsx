
import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { User, Store, Product } from './types';
import { StoreType } from './types';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { MyStorePage } from './pages/MyStorePage';
import { StorefrontPage } from './pages/StorefrontPage';
import { Header } from './components/Header';
import { PaymentPage } from './pages/PaymentPage';

// --- MOCK DATA ---
const initialStores: Store[] = [
    { id: '1', name: 'مزرعة الخيرات', type: StoreType.Farmer, ownerId: 'farmer1', products: [{ id: 'p1', name: 'طماطم طازجة', price: 120, imageUrl: 'https://picsum.photos/seed/tomato/400/300' }, { id: 'p2', name: 'خيار بلدي', price: 80, imageUrl: 'https://picsum.photos/seed/cucumber/400/300' }], subscriptionEnd: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000) },
    { id: '2', name: 'أسواق الشمال بالجملة', type: StoreType.Wholesaler, ownerId: 'wholesaler1', products: [{ id: 'p3', name: 'صندوق بطاطا (50 كغ)', price: 2500, imageUrl: 'https://picsum.photos/seed/potato/400/300' }], subscriptionEnd: new Date(new Date().getTime() + 100 * 24 * 60 * 60 * 1000) },
    { id: '3', name: 'خضرواتي', type: StoreType.Retailer, ownerId: 'retailer1', products: [{ id: 'p4', name: 'فلفل حلو (للكيلو)', price: 200, imageUrl: 'https://picsum.photos/seed/pepper/400/300' }], subscriptionEnd: new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000) }, // Expired
    { id: '4', name: 'نقل إكسبريس', type: StoreType.Transport, ownerId: 'transport1', products: [{id: 's1', name: 'توصيل سريع لكل الولايات', price: 1500, imageUrl: 'https://picsum.photos/seed/truck/400/300'}], subscriptionEnd: new Date(new Date().getTime() + 200 * 24 * 60 * 60 * 1000) },
];

// --- CONTEXTS ---
type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (email: string, phone: string, type: 'customer' | 'owner') => void;
  updateSubscription: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);

type StoreContextType = {
    stores: Store[];
    myStore: Store | undefined;
    createStore: (name: string, type: StoreType) => void;
    updateMyStore: (updatedStore: Store) => void;
    getStoreById: (id: string) => Store | undefined;
};
export const StoreContext = createContext<StoreContextType | null>(null);


const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (email: string) => {
        // Mock login
        const isStoreOwner = initialStores.some(s => s.ownerId === 'test-user');
        const subscriptionEnd = isStoreOwner 
            ? new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) // existing owner
            : undefined;

        setUser({ id: 'test-user', email, phone: '0555123456', type: isStoreOwner ? 'owner' : 'customer', subscriptionEnd });
    };

    const logout = () => {
        setUser(null);
    };

    const register = (email: string, phone: string, type: 'customer' | 'owner') => {
        const subscriptionEnd = type === 'owner' ? new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000) : undefined;
        setUser({ id: 'new-user', email, phone, type, subscriptionEnd });
    };

    const updateSubscription = () => {
        if (user) {
            const newExpiryDate = new Date();
            newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1);
            setUser(prevUser => prevUser ? { ...prevUser, subscriptionEnd: newExpiryDate } : null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, updateSubscription }}>
            {children}
        </AuthContext.Provider>
    );
};

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useContext(AuthContext)!;
    const [stores, setStores] = useState<Store[]>(initialStores);
    
    const myStore = stores.find(s => s.ownerId === user?.id);

    const createStore = (name: string, type: StoreType) => {
        if (user && user.type === 'owner' && !myStore) {
            const newStore: Store = {
                id: (stores.length + 1).toString(),
                name,
                type,
                ownerId: user.id,
                products: [],
                subscriptionEnd: user.subscriptionEnd!,
            };
            setStores(prev => [...prev, newStore]);
        }
    };

    const updateMyStore = (updatedStore: Store) => {
        setStores(prev => prev.map(s => s.id === updatedStore.id ? updatedStore : s));
    };
    
    const getStoreById = (id: string): Store | undefined => {
        return stores.find(s => s.id === id);
    };

    useEffect(() => {
        if(user && user.subscriptionEnd) {
             setStores(prev => prev.map(s => s.ownerId === user.id ? {...s, subscriptionEnd: user.subscriptionEnd!} : s));
        }
    }, [user]);

    return (
        <StoreContext.Provider value={{ stores, myStore, createStore, updateMyStore, getStoreById }}>
            {children}
        </StoreContext.Provider>
    );
};

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { user } = useContext(AuthContext)!;
    return user ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <AuthProvider>
        <HashRouter>
            <div className="bg-gray-50 min-h-screen text-gray-800">
                <StoreProvider>
                    <Header />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                            <Route path="/my-store" element={<PrivateRoute><MyStorePage /></PrivateRoute>} />
                            <Route path="/store/:id" element={<PrivateRoute><StorefrontPage /></PrivateRoute>} />
                            <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
                        </Routes>
                    </main>
                </StoreProvider>
            </div>
        </HashRouter>
    </AuthProvider>
  );
}
