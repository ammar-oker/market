import React, { FC } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

interface PaginationProps {
    page: number,
    length: number,
    onChange?: (e: number) => void
}

const Pagination: FC<PaginationProps> = ({ length, onChange, page }) => {
  // create a range of integers starting from 1
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const numbers = Array.from({ length }, (x, i) => i + 1);

  const onPageChange = (pageNum: number) => {
    if (onChange) onChange(pageNum);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderButtons = (items: number[], start: number, end: number) => items
    .slice(start, end).map((number) => (
      <button
        data-testid={`pagination-btn-${number}`}
        key={`pagination-btn-${number}`}
        type="button"
        className={`mx-3 font-semibold w-8 h-10 text-sm rounded-sm focus:outline-none
            ${page === number ? 'bg-primary text-white' : 'hover:text-primary'}`}
        onClick={() => {
          onPageChange(number);
        }}
      >
        {number}
      </button>
    ));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderButton = (btnNumber: number) => (
    <button
      data-testid={`pagination-btn-${btnNumber}`}
      key={`pagination-btn-${btnNumber}`}
      type="button"
      className={`mx-3 font-semibold w-8 h-10 text-sm rounded-sm focus:outline-none
        ${page === btnNumber ? 'bg-primary text-white' : 'hover:text-primary'}`}
      onClick={() => { onPageChange(btnNumber); }}
    >
      {btnNumber}
    </button>
  );

  const buttons = () => (
    <>
      {
            length > 6 ? (
              <>
                { !(page < 4) || page !== 1 ? (renderButton(1)) : ('') }
                { page < 4 ? ('') : ('...') }
                {
                        numbers.slice(page > 2 ? page - 2 : page - 1, page + 2)
                          .map((item) => (renderButton(item)))
                    }
                { page > length - 4 ? ('') : ('...') }
                { !(page > length - 3) ? (renderButton(length)) : ('') }
              </>
            ) : (
              numbers.slice(0, length)
                .map((item) => (renderButton(item)))
            )
        }

    </>
  );

  return (
    <div data-testid="pagination" className="flex justify-between mt-8 mb-34">
      <button
        data-testid="pagination-prev"
        type="button"
        disabled={page === 1}
        className={`flex items-center focus:outline-none ${page === 1 ? 'text-title-light cursor-default' : 'text-primary'}`}
        onClick={() => { onPageChange(page - 1); }}
      >
        <ArrowLeftIcon className="w-6 h-6 mr-3" />
        <span className="font-semibold text-sm">Prev</span>
      </button>
      <div>
        {buttons()}
      </div>
      <button
        data-testid="pagination-next"
        type="button"
        disabled={page === length}
        className={`flex items-center focus:outline-none ${page === length ? 'text-title-light cursor-default' : 'text-primary'}`}
        onClick={() => { onPageChange(page + 1); }}
      >
        <span className="font-semibold text-sm mr-3">Next</span>
        <ArrowRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Pagination;
