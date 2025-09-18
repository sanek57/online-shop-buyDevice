import { useMemo } from 'react'

export const usePagination = (totalPages: number) => {
  const pagesArray = useMemo(() => {
    // console.log('change totalPages', totalPages)
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }, [totalPages])

  return pagesArray
}
