import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'

const getStrength = (password: string): { level: number; label: string } => {
    if (!password) return { level: 0, label: '' }
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    if (score <= 1) return { level: 1, label: 'Lemah' }
    if (score === 2) return { level: 2, label: 'Sedang' }
    if (score === 3) return { level: 3, label: 'Kuat' }
    return { level: 4, label: 'Sangat Kuat' }
}

const STRENGTH_COLORS = ['', 'bg-red', 'bg-amber-400', 'bg-green-500', 'bg-green-600']

export const RegisterPage = () => {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        agree: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

    const set = (field: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setForm(prev => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!form.firstName.trim()) newErrors.firstName = 'Wajib diisi'
        if (!form.lastName.trim()) newErrors.lastName = 'Wajib diisi'
        if (!form.email.trim()) newErrors.email = 'Email wajib diisi'
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Format email tidak valid'
        if (!form.phone.trim()) newErrors.phone = 'No. HP wajib diisi'
        if (!form.password) newErrors.password = 'Kata sandi wajib diisi'
        else if (form.password.length < 8) newErrors.password = 'Minimal 8 karakter'
        if (!form.agree) newErrors.agree = 'Kamu harus menyetujui syarat & ketentuan'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return
        // TODO: connect to backend register endpoint
        console.log('register', form)
    }

    const strength = getStrength(form.password)

    const inputClass = (field: keyof typeof form) =>
        `w-full h-[38px] border rounded-sm px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-gray-50 outline-none transition-colors ${errors[field] ? 'border-red' : 'border-gray-200 focus:border-gray-400'}`

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12">
            <div className="w-full max-w-[460px]">
                {/* logo */}
                <div
                    className="font-display text-[1.6rem] font-bold text-red tracking-tight leading-none cursor-pointer mb-1"
                    onClick={() => navigate('/')}
                >
                    Tomad<sup className="text-[0.45rem] text-gray-400 font-body font-normal tracking-widest align-super">ID</sup>
                </div>
                <div className="text-[12px] text-gray-400 mb-6">Bergabung dengan jutaan pembeli</div>

                <div className="border border-gray-200 rounded-sm p-8">
                    {/* section header */}
                    <div className="border-t-2 border-gray-900 mb-5" />
                    <div className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-5">
                        Buat akun baru
                    </div>

                    {/* name row */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1">
                            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                                Nama Depan
                            </label>
                            <input
                                type="text"
                                value={form.firstName}
                                onChange={set('firstName')}
                                placeholder="Nama depan"
                                className={inputClass('firstName')}
                            />
                            {errors.firstName && (
                                <div className="text-[11px] text-red mt-1">{errors.firstName}</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                                Nama Belakang
                            </label>
                            <input
                                type="text"
                                value={form.lastName}
                                onChange={set('lastName')}
                                placeholder="Nama belakang"
                                className={inputClass('lastName')}
                            />
                            {errors.lastName && (
                                <div className="text-[11px] text-red mt-1">{errors.lastName}</div>
                            )}
                        </div>
                    </div>

                    {/* email */}
                    <div className="mb-4">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={set('email')}
                            placeholder="contoh@email.com"
                            className={inputClass('email')}
                        />
                        {errors.email && (
                            <div className="text-[11px] text-red mt-1">{errors.email}</div>
                        )}
                    </div>

                    {/* phone */}
                    <div className="mb-4">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                            No. HP
                        </label>
                        <div className="flex">
                            <div className="flex items-center px-3 h-[38px] bg-gray-100 border border-r-0 border-gray-200 rounded-l-sm text-[13px] text-gray-500 font-medium select-none flex-shrink-0">
                                +62
                            </div>
                            <input
                                type="tel"
                                value={form.phone}
                                onChange={set('phone')}
                                placeholder="812-xxxx-xxxx"
                                className={`flex-1 h-[38px] border rounded-r-sm px-3 text-[13px] text-gray-900 placeholder-gray-400 bg-gray-50 outline-none transition-colors rounded-l-none ${errors.phone ? 'border-red' : 'border-gray-200 focus:border-gray-400'}`}
                            />
                        </div>
                        {errors.phone && (
                            <div className="text-[11px] text-red mt-1">{errors.phone}</div>
                        )}
                    </div>

                    {/* password */}
                    <div className="mb-5">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-1.5">
                            Kata Sandi
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={set('password')}
                                placeholder="Minimal 8 karakter"
                                className={`w-full h-[38px] border rounded-sm px-3 pr-10 text-[13px] text-gray-900 placeholder-gray-400 bg-gray-50 outline-none transition-colors ${errors.password ? 'border-red' : 'border-gray-200 focus:border-gray-400'}`}
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
                        {/* strength bar */}
                        {form.password && (
                            <div className="mt-2">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <div
                                            key={i}
                                            className={`h-[3px] flex-1 rounded-sm transition-all ${i <= strength.level ? STRENGTH_COLORS[strength.level] : 'bg-gray-200'}`}
                                        />
                                    ))}
                                </div>
                                <div className="text-[10px] text-gray-400 mt-1">
                                    Kekuatan: <span className="font-bold text-gray-600">{strength.label}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* terms */}
                    <label className="flex items-start gap-2 mb-5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.agree}
                            onChange={set('agree')}
                            className="accent-red w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                        />
                        <span className="text-[12px] text-gray-500 leading-relaxed">
                            Saya setuju dengan{' '}
                            <span className="text-red font-bold cursor-pointer hover:text-red-dark">Syarat & Ketentuan</span>
                            {' '}dan{' '}
                            <span className="text-red font-bold cursor-pointer hover:text-red-dark">Kebijakan Privasi</span>
                            {' '}Tomad
                        </span>
                    </label>
                    {errors.agree && (
                        <div className="text-[11px] text-red -mt-3 mb-4">{errors.agree}</div>
                    )}

                    {/* submit */}
                    <button
                        onClick={handleSubmit}
                        className="w-full h-[40px] bg-red text-white text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-red-dark transition-colors"
                    >
                        Buat Akun
                    </button>

                    {/* login link */}
                    <div className="text-center text-[12px] text-gray-400 mt-5">
                        Sudah punya akun?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-red font-bold hover:text-red-dark transition-colors"
                        >
                            Masuk →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}