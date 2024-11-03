const Loading = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='hidden md:block'>
                <h1 className='animate-pulse'>Loading...</h1>
            </div>
            <div className='block md:hidden'>
                <p className='title text-[--disabled] animate-pulse'>Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
