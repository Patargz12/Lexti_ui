export function Logo() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="relative w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-500"
        >
          <path 
            d="M12 8v4m0 4h.01M12 3c-1.857 0-3.637.577-5.2 1.66-1.563 1.083-2.774 2.617-3.48 4.44-.705 1.825-.89 3.848-.534 5.8.357 1.953 1.23 3.729 2.5 5.12.822-1.739 2.584-2.835 4.5-2.835 1.915 0 3.678 1.096 4.5 2.835 1.27-1.39 2.143-3.167 2.5-5.12.357-1.952.171-3.975-.534-5.8-.706-1.823-1.918-3.357-3.48-4.44C15.638 3.577 13.858 3 12 3z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute -top-1 -right-1 text-blue-500">
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2l1.5 5h5l-4 3.5 1.5 5-4-3.5-4 3.5 1.5-5-4-3.5h5z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className="text-2xl font-bold flex items-center">
        <span className="text-black dark:text-white">lexi</span>
        <span className="text-blue-500">bean</span>
      </div>
    </div>
  );
} 