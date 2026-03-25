import { Spin } from 'antd'

interface Props {
    fullPage?: boolean
}

export const LoadingSpinner = ({ fullPage = false }: Props) => (
    <div className={`flex items-center justify-center ${fullPage ? 'min-h-screen' : 'py-16'}`}>
        <Spin size="large" />
    </div>
)