
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, StoreContext } from '../App';
// FIX: Import `StoreType` as a value because it is used for enum access, while keeping `Product` and `Store` as type-only imports.
import { type Product, type Store, StoreType } from '../types';
import { ANNUAL_FEE } from '../constants';

const ProductRow: React.FC<{ product: Product, onEdit: () => void, onDelete: () => void }> = ({ product, onEdit, onDelete }) => (
    <tr className="border-b">
        <td className="p-3"><img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md" /></td>
        <td className="p-3 font-semibold">{product.name}</td>
        <td className="p-3">{product.price.toLocaleString('ar-DZ')} دج</td>
        <td className="p-3 space-x-2 space-x-reverse">
            <button onClick={onEdit} className="text-blue-500 hover:underline">تعديل</button>
            <button onClick={onDelete} className="text-red-500 hover:underline">حذف</button>
        </td>
    </tr>
);

const ProductForm: React.FC<{ product?: Product | null, onSave: (product: Omit<Product, 'id'> & { id?: string }) => void, onCancel: () => void }> = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
        } else {
            setName('');
            setPrice(0);
        }
    }, [product]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ id: product?.id, name, price, imageUrl: `https://picsum.photos/seed/${name.replace(/\s/g, '')}/200` });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-xl font-bold mb-4">{product ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
                <div className="space-y-4">
                    <input type="text" placeholder="اسم المنتج" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded-md" required />
                    <input type="number" placeholder="السعر (دج)" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full p-2 border rounded-md" required />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">إلغاء</button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">حفظ</button>
                </div>
            </form>
        </div>
    );
};

const CreateStoreForm: React.FC<{ onCreate: (name: string, type: StoreType) => void }> = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [type, setType] = useState<StoreType>(StoreType.Farmer);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(name, type);
    };

    return (
        <div className="text-center max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">أنت على بعد خطوة من إطلاق متجرك!</h2>
            <p className="text-gray-600 mb-8">ابدأ شهرك التجريبي المجاني الآن. أدخل معلومات متجرك الأساسية.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="اسم متجرك" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded-lg" required />
                <select value={type} onChange={e => setType(e.target.value as StoreType)} className="w-full p-3 border rounded-lg bg-white">
                    {Object.values(StoreType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <button type="submit" className="w-full bg-green-600 text-