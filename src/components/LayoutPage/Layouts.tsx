import './styles.css'

export const BodyPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col">
            {
                children
            }
        </div>
    )
}

export const TopPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <header className="">
            {
                children
            }
        </header>
    )
}

export const MiddlePage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 flex-grow">
            <div className='grid place-items-center'>
                {
                    children
                }  
            </div>
        </div>
    )
}

export const BottomPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid place-items-center">
            {
                children
            }
        </div>
    )
}
