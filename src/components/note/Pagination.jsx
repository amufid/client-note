import PropTypes from 'prop-types';
import { Button } from 'flowbite-react';

const Pagination = ({ currentPage, totalPages, onPageChangePrev, onPageChangeNext }) => {
   const generatePagination = () => {
      const pageNumbers = [];
      const maxPageNumbersToShow = 5;
      const sidePages = 2;

      if (totalPages <= maxPageNumbersToShow) {
         for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
         }
      } else {
         let startPage = Math.max(2, currentPage - sidePages);
         let endPage = Math.min(totalPages - 1, currentPage + sidePages);

         if (currentPage <= sidePages + 1) {
            startPage = 2;
            endPage = maxPageNumbersToShow - 1;
         }

         if (currentPage >= totalPages - sidePages) {
            startPage = totalPages - (maxPageNumbersToShow - 2);
            endPage = totalPages - 1;
         }

         pageNumbers.push(1);

         if (startPage > 2) {
            pageNumbers.push('...');
         }

         for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
         }

         if (endPage < totalPages - 1) {
            pageNumbers.push('...');
         }

         pageNumbers.push(totalPages);
      }
      return pageNumbers;
   }

   const pages = generatePagination();

   return (
      <>
         {totalPages === 1 ? null : (
            <div className="flex justify-center items-center py-5">
               <Button
                  color='gray'
                  className='mr-1'
                  onClick={() => onPageChangePrev(currentPage - 1)}
                  disabled={currentPage === 1}
               >
                  Prev
               </Button>
               {pages.map((page, index) => (
                  <Button
                     color={`${currentPage === page ? 'purple' : 'gray'}`}
                     className='mr-1 hidden sm:flex'
                     key={index}
                     onClick={() => page !== '...' && onPageChangeNext(page)}
                     disabled={page === '...'}
                  >
                     {page}
                  </Button>
               ))}
               <Button
                  color='gray'
                  className='mr-1'
                  onClick={() => onPageChangeNext(currentPage + 1)}
                  disabled={currentPage === totalPages}
               >
                  Next
               </Button>
            </div>
         )}
      </>
   )
}

export default Pagination;

Pagination.propTypes = {
   currentPage: PropTypes.number,
   totalPages: PropTypes.number,
   onPageChangeNext: PropTypes.func,
   onPageChangePrev: PropTypes.func,
}
