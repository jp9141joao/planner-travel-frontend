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
        <header className="fixed">
            {
                children
            }
        </header>
    )
}

export const MiddlePage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid grid-cols-1 flex-grow">
            <div className='grid grid-cols-1 xs:grid-cols-2 place-items-center xxs4:py-7 xxs3:py-20 sm:py-0 xs:mx-20'>
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
