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
            <div className='grid lg:grid-cols-2 place-items-center pt-[6vw] xs:pt-0 xs:mt-[14vw] lg:mt-[6vw] lg:mx-[5.5vw]'>{/* pt-10 xs:pt-14  md:pt-40 lg:mx-8 lg:pt-0 xl:mx-20 lg:ml-10 */}
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
