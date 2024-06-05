const Navbar = () => {
  return (
    <>
      <div className='sticky top-0 w-full bg-white border-b-2 border-slate-50 z-10'>
        <div className='flex max-w-full items-center justify-between px-4 py-1 sm:px-6 lg:px-8'>
          <div>
            <h1 className='text-xl font-bold'>Dashboard</h1>
          </div>

          <div className='ml-2   hidden lg:block'>
            <span className='relative rounded-full border-[3px] inline-block '>
              <img
                className='h-10 w-10 rounded-full'
                src='/defaultUser.png'
                alt='Dan_Abromov'
              />
              <span className='absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white'></span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
