import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Item = ({ page = 0, isCurrent = false }) => {
  if (page === 0) {
    return (
      <li>
        <span className="pagination-ellipsis">&hellip;</span>
      </li>
    )
  }

  return (
    <li>
      <Link href={`?page=${page}`}>
        <a className={`pagination-link ${isCurrent ? 'is-current' : ''}`}>{page}</a>
      </Link>
    </li>
  )
}

const Pagination = ({ current, total, perPage }) => {
  const pages = total > perPage ? Math.ceil(total / perPage) : 1

  return (
    <div className="Pagination">
      <nav className="pagination" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {Array(pages).fill().map((_, index) => (
            <Item
              key={index}
              page={index + 1}
              isCurrent={index + 1 === current}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired
}

export default Pagination
