import React from 'react'
import { useDeviceContext } from '../hooks/useDeviceContext'
import { Pagination } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { usePagination } from '../hooks/usePagination'

export const Pages = observer(() => {
  const { devices } = useDeviceContext()

  const pageCount = Math.ceil(devices.totalCount / devices.limit)

  const pagesArray = usePagination(pageCount)

  return (
    <Pagination className='mt-5'>
      {pagesArray.map(page => (
        <Pagination.Item
          key={page}
          active={devices.page === page}
          onClick={() => (devices.page = page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  )
})
