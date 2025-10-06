
import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [userType, setUserType] = useState<'customer' | 'owner'>('customer');
    const [step, setStep] = useState(1);
    const [verificationCode, setVerificationCode] = useState('');
    
    const { login, register } = useContext(AuthContext)!;
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock captcha and verification
        if (!isLogin && step === 1) {
            console.log("Sending verification code...");
            setStep(2);
            return;
        }

        if (isLogin) {
            login(email);
        } else {
            register(email, phone, userType);
        }
        onClose();
        navigate(userType === 'owner' ? '/my-store' : '/dashboard');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-3 left-3 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                <h2 className="text-2xl font-bold text-center text-green-700 mb-4">{isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                        <>
                            <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" required />
                            {!isLogin && <input type="tel" placeholder="رقم الهاتف" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border rounded-lg" required />}
                            <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-lg" required />
                            
                            {!isLogin && (
                                <>
                                    <div className="flex items-center justify-center bg-gray-200 p-3 rounded-lg">
                                        <span className="text-gray-500 tracking-widest text-lg">C4F9E2</span>
                                    </div>
                                    <input type="text" placeholder="أدخل رمز الكابتشا" value={captcha} onChange={e => setCaptcha(e.target.value)} className="w-full p-3 border rounded-lg" required />
                                    <fieldset className="border p-3 rounded-lg">
                                        <legend className="px-2 font-semibold">نوع الحساب:</legend>
                                        <div className="flex justify-around">
                                            <label className="flex items-center gap-2"><input type="radio" name="userType" value="customer" checked={userType === 'customer'} onChange={() => setUserType('customer')} /> زبون</label>
                                            <label className="flex items-center gap-2"><input type="radio" name="userType" value="owner" checked={userType === 'owner'} onChange={() => setUserType('owner')} /> صاحب متجر</label>
                                        </div>
                                    </fieldset>
                                </>
                            )}
                        </>
                    )}
                    
                    {step === 2 && !isLogin && (
                        <div className="text-center">
                            <p className="mb-4">تم إرسال رمز التحقق إلى بريدك الإلكتروني {email}.</p>
                            <input type="text" placeholder="رمز التحقق" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} className="w-full p-3 border rounded-lg text-center tracking-widest" required />
                        </div>
                    )}
                    
                    <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                        {isLogin ? 'دخول' : (step === 1 ? 'التالي' : 'تأكيد وإنشاء حساب')}
                    </button>
                </form>

                <p className="text-center mt-4">
                    {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                    <button onClick={() => { setIsLogin(!isLogin); setStep(1); }} className="text-green-600 font-bold mr-2 hover:underline">
                        {isLogin ? 'إنشاء حساب' : 'تسجيل الدخول'}
                    </button>
                </p>
            </div>
        </div>
    );
};
