
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { StoreContext } from '../App';
import type { Product } from '../types';
import { STORE_TYPE_DETAILS } from '../constants';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover"/>
        <div className="p-4">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-xl font-semibold text-green-600 mt-2">
                {product.price.toLocaleString('ar-DZ')} دج
            </p>
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                أضف إلى السلة
            </button>
        </div>
    </div>
);

export const StorefrontPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { getStoreById } = useContext(StoreContext)!;

    if (!id) return <div className="text-center text-red-500">لم يتم العثور على المتجر.</div>;

    const store = getStoreById(id);

    if (!store) return <div className="text-center text-red-500">المتجر غير موجود.</div>;
    
    const isSubscriptionActive = new Date(store.subscriptionEnd) > new Date();
    if (!isSubscriptionActive) {
        return (
            <div className="text-center bg-white p-10 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-red-600 mb-4">هذا المتجر غير متاح حالياً</h1>
                <p className="text-gray-600">اشتراك صاحب المتجر منتهي.</p>
            </div>
        );
    }

    return (
        <div>
            <header className="bg-white p-8 rounded-lg shadow-lg mb-8 text-center">
                <div className="flex justify-center mb-4 text-green-600">{STORE_TYPE_DETAILS[store.type].icon}</div>
                <h1 className="text-4xl font-bold">{store.name}</h1>
                <p className="text-lg text-gray-500 mt-2">{store.type}</p>
            </header>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {store.products.length > 0 ? (
                    store.products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500 text-xl py-10">
                        لا توجد منتجات في هذا المتجر حالياً.
                    </p>
                )}
            </div>
        </div>
    );
};
