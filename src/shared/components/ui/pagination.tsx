import Image from 'next/image'
import { FC } from 'react'

interface PaginationProps {
    totalPages: number
    currentPage: number
    onPageChange: (page: number) => void
    maxVisiblePages?: number
}

export const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange, maxVisiblePages = 5 }) => {
    if (totalPages <= 1) return null

    const handleFirstPage = (): void => onPageChange(1)
    const handleLastPage = (): void => onPageChange(totalPages)
    const handlePrevPage = (): void => onPageChange(currentPage - 1)
    const handleNextPage = (): void => onPageChange(currentPage + 1)

    const visiblePages: number[] = []
    const half = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(currentPage - half, 1)
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
        endPage = totalPages
        startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i)
    }

    const showLeftEllipsis = startPage > 2
    const showRightEllipsis = endPage < totalPages - 1

    return (
        <div className='flex items-center gap-2 text-white'>
            <button onClick={handleFirstPage} disabled={currentPage === 1} className='disabled:opacity-50'>
                <Image className={'rotate-180'} src={'/assets/last.svg'} alt={''} width={30} height={30} />
            </button>

            <button onClick={handlePrevPage} disabled={currentPage === 1} className='disabled:opacity-50'>
                <Image className={'rotate-180'} src={'/assets/next.svg'} alt={''} width={50} height={50} />
            </button>

            {!visiblePages.includes(1) && (
                <>
                    <button onClick={() => onPageChange(1)} className={currentPage === 1 ? 'font-bold' : ''}>
                        1
                    </button>
                    {showLeftEllipsis && <span className='px-1'>...</span>}
                </>
            )}

            {visiblePages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-2 ${page === currentPage ? 'font-bold' : ''}`}
                >
                    {page}
                </button>
            ))}

            {!visiblePages.includes(totalPages) && (
                <>
                    {showRightEllipsis && <span className='px-1'>...</span>}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className={currentPage === totalPages ? 'font-bold' : ''}
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='disabled:opacity-50'>
                <Image src={'/assets/next.svg'} alt={''} width={50} height={50} />
            </button>

            <button onClick={handleLastPage} disabled={currentPage === totalPages} className='disabled:opacity-50'>
                <Image src={'/assets/last.svg'} alt={''} width={30} height={30} />
            </button>
        </div>
    )
}
