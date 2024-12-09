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
        <div className="grid flex-grow">
            <div className='grid md:grid-cols-2 place-items-center xxs4:py-7 xxs3:py-20 sm:py-18 md:py-0 md:ml-10 lg:mx-8 xl:mx-20'>
                {
                    children
                } 
            </div>
        </div>
    )
}

export const BottomPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="" style={{border: '1px solid red'}}>
            {
                children
            }
        </div>
    )
}
