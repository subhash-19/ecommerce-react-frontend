import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center mt-4 mb-[7.5rem] mx-0">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`bg-[#555] text-white border-none px-5 py-2 mx-[5px] my-[1px] rounded-[5px] transition-colors duration-300 cursor-pointer 
                    ${number === currentPage ? 'bg-[#ff681e]' : ''} 
                    hover:bg-[#623f1d]`}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
