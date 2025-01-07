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
        <div className="grid flex-grow">
            <div className='grid lg:grid-cols-2 place-items-center lg:mx-[5.5vw]'>                {
                    children
                } 
            </div>
        </div>
    )
}

export const MiddlePageOneCol = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid flex-grow">
            <div className='grid grid-cols-1 place-items-center lg:mx-[5.5vw]'>                
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
