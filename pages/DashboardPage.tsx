
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../App';
import type { Store, Product } from '../types';
import { STORE_TYPE_DETAILS } from '../constants';

const ProductPreview: React.FC<{ product: Product }> = ({ product }) => (
    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded">
        <img src={product.imageUrl} alt={product.name} className="w-8 h-8 rounded-sm object-cover" />
        <span className="text-xs text-gray-700">{product.name}</span>
    </div>
);

const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
    const isSubscriptionActive = new Date(store.subscriptionEnd) > new Date();
    if (!isSubscriptionActive) return null; // Hide expired stores from dashboard

    return (
        <Link to={`/store/${store.id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-5 border-b flex items-center gap-4">
                    <div className="text-gray-500">{STORE_TYPE_DETAILS[store.type].icon}</div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                        <p className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full inline-block mt-1">{store.type}</p>
                    </div>
                </div>
                <div className="p-5">
                    <h4 className="font-semibold text-gray-600 mb-3">بعض المنتجات:</h4>
                    <div className="flex flex-wrap gap-2">
                        {store.products.slice(0, 3).map(p => <ProductPreview key={p.id} product={p} />)}
                        {store.products.length === 0 && <p className="text-sm text-gray-500">لا توجد منتجات حالياً.</p>}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const DashboardPage: React.FC = () => {
    const { stores } = useContext(StoreContext)!;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStores = stores.filter(store => 
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-8 bg-white p-6 rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-2">مرحباً بك في سوق الفلاح</h1>
                <p className="text-gray-600">تصفح المتاجر المتاحة أو ابحث عن متجر محدد.</p>
                <input
                    type="text"
                    placeholder="ابحث عن متجر..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mt-4 p-3 border rounded-lg"
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStores.map(store => (
                    <StoreCard key={store.id} store={store} />
                ))}
            </div>
        </div>
    );
};
