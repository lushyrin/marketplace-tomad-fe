import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

export const LoginPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!email.trim()) newErrors.email = 'Email atau No. HP wajib diisi'
        if (!password) newErrors.password = 'Kata sandi wajib diisi'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return
        // TODO: connect to backend auth endpoint
        console.log('login', { email, password, remember })
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12">
            <div className="w-full max-w-[420px]">
                {/* logo */}
                <div
                    className="font-display text-[1.6rem] font-bold text-red tracking-tight leading-none cursor-pointer mb-1"
                    onClick={() => navigate('/')}
                >
                    Tomad<sup className="text-[0.45rem] text-gray-400 font-body font-normal tracking-widest align-super">ID</sup>
                </div>
                <div className="text-[12px] text-gray-400 mb-6">Selamat datang kembali</div>

                <div className="border border-gray-200 rounded-sm p-8">
                    <div className="border-t-2 border-gray-900 mb-5" />
                    <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-5">
                        Masuk ke akunmu
                    </div>

                    {/* email */}
                    <div className="mb-4">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                            Email / No. HP
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            placeholder="contoh@email.com"
                            className={`w-full h-[38px] border rounded-sm px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-gray-50 outline-none transition-colors
                                ${errors.email ? 'border-red' : 'border-gray-200 focus:border-gray-400'}`}
                        />
                        {errors.email && (
                            <div className="text-[11px] text-red mt-1">{errors.email}</div>
                        )}
                    </div>

                    {/* password */}
                    <div className="mb-2">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                                placeholder="Masukkan kata sandi"
                                className={`w-full h-[38px] border rounded-sm px-3 pr-10 text-[13px] text-gray-900 placeholder-gray-400 bg-gray-50 outline-none transition-colors
                                    ${errors.password ? 'border-red' : 'border-gray-200 focus:border-gray-400'}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword
                                    ? <EyeInvisibleOutlined style={{ fontSize: 14 }} />
                                    : <EyeOutlined style={{ fontSize: 14 }} />
                                }
                            </button>
                        </div>
                        {errors.password && (
                            <div className="text-[11px] text-red mt-1">{errors.password}</div>
                        )}
                    </div>

                    {/* forgot */}
                    <div className="text-right mb-4">
                        <button
                            onClick={() => navigate('/forgot-password')}
                            className="text-[10px] font-bold tracking-widest uppercase text-red hover:text-red-dark transition-colors"
                        >
                            Lupa kata sandi?
                        </button>
                    </div>

                    {/* remember me */}
                    <label className="flex items-center gap-2 mb-5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                            className="accent-red w-3.5 h-3.5 flex-shrink-0"
                        />
                        <span className="text-[12px] text-gray-500">Ingat saya di perangkat ini</span>
                    </label>

                    {/* submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full h-[40px] bg-red text-white text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-red-dark transition-colors"
                    >
                        Masuk
                    </button>

                    {/* register link */}
                    <div className="text-center text-[12px] text-gray-400 mt-5">
                        Belum punya akun?{' '}
                        <button
                            onClick={() => navigate('/register')}
                            className="text-red font-bold hover:text-red-dark transition-colors"
                        >
                            Daftar sekarang →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}