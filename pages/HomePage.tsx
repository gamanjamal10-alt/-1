
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreType } from '../types';
import { STORE_TYPE_DETAILS, ANNUAL_FEE } from '../constants';

const StoreTypeCard: React.FC<{ type: StoreType }> = ({ type }) => {
    const details = STORE_TYPE_DETAILS[type];
    const navigate = useNavigate();
    
    // In a real app, this would redirect to registration with the type pre-selected.
    // Here we'll just log it and redirect to the generic dashboard.
    const handleSelect = () => {
        console.log(`Selected store type: ${type}`);
        navigate('/dashboard'); // Simulates needing to log in first
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer border-t-4 border-green-500" onClick={handleSelect}>
            <div className="flex justify-center mb-4">{details.icon}</div>
            <h3 className="text-xl font-bold mb-2">{type}</h3>
            <p className="text-gray-600">{details.description}</p>
        </div>
    );
};


export const HomePage: React.FC = () => {
    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="text-center bg-green-100 rounded-xl p-12">
                <h1 className="text-5xl font-bold text-green-800 mb-4">أطلق العنان لمتجرك مع سوق الفلاح</h1>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
                    المنصة الأولى في الجزائر التي تجمع الفلاحين، التجار، وخدمات النقل في مكان واحد. أنشئ متجرك الاحترافي اليوم وابدأ البيع.
                </p>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition-transform transform hover:scale-105">
                    ابدأ شهرك التجريبي المجاني
                </button>
            </section>

            {/* Store Type Selection */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-10">اختر نوع متجرك المناسب لك</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.values(StoreType).map(type => (
                        <StoreTypeCard key={type} type={type} />
                    ))}
                </div>
            </section>
            
             {/* Pricing Section */}
            <section className="text-center">
                <h2 className="text-3xl font-bold text-center mb-4">خطة تسعير واضحة وبسيطة</h2>
                <p className="text-gray-600 mb-8">كل ما تحتاجه للنجاح، بسعر واحد.</p>
                <div className="bg-white border-2 border-green-500 p-8 rounded-lg shadow-2xl max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold text-green-700">الخطة السنوية</h3>
                    <p className="text-5xl font-bold my-4">{ANNUAL_FEE.toLocaleString('ar-DZ')} <span className="text-2xl text-gray-500">دج/سنة</span></p>
                    <p className="text-gray-500 mb-6">بعد انتهاء الفترة التجريبية (شهر مجاني)</p>
                    <ul className="text-right space-y-3 mb-8">
                        <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> متجر إلكتروني احترافي</li>
                        <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> عرض عدد غير محدود من المنتجات</li>
                        <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> لوحة تحكم سهلة لإدارة المتجر</li>
                        <li className="flex items-center gap-3"><span className="text-green-500 text-2xl">✓</span> دعم فني متكامل</li>
                    </ul>
                     <button className="w-full bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition-transform transform hover:scale-105">
                        ابدأ الآن
                    </button>
                </div>
            </section>
        </div>
    );
};
