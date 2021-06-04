import 'regenerator-runtime/runtime'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import placeholders from 'data/placeholders'
import { CopyButton } from 'components/copy-button'

function GlobalFilter ({
  globalFilter,
  setGlobalFilter
}) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className="pr-4 mb-3 md:mb-0">
      <div className="relative w-full md:w-1/3">
        <input
          type="search"
          className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Search..."
          value={value || ''}
          onChange={e => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
        />
        <div className="absolute top-0 left-0 inline-flex items-center p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
            strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
            <circle cx="10" cy="10" r="7" />
            <line x1="21" y1="21" x2="15" y2="15" />
          </svg>
        </div>
      </div>
    </div>
  )
}

GlobalFilter.propTypes = {
  globalFilter: PropTypes.string,
  setGlobalFilter: PropTypes.func.isRequired
}

export const PlaceholdersTable = () => {
  const renderPlaceholder = (e) => (
    <>
      {e.value}
      <a className="row-link" id={e.value} href={`#${e.value}`}></a>
      <CopyButton>{e.value}</CopyButton>
    </>)
  const columns = useMemo(
    () => [
      {
        Header: 'Placeholder',
        accessor: 'placeholder',
        Cell: renderPlaceholder
      },
      {
        Header: 'Example',
        accessor: 'example'
      },
      {
        Header: 'Description',
        accessor: 'description'
      }
    ],
    []
  )
  const data = useMemo(() => placeholders.map(c => ({ placeholder: c[0], example: c[1], description: c[2] })), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter
  )

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative">
        <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative my-0" {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              // eslint-disable-next-line react/jsx-key
              <tr className="text-left" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // eslint-disable-next-line react/jsx-key
                  <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs" {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)

              return (
                  // eslint-disable-next-line react/jsx-key
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <td className="border-dashed border-t border-gray-200" {...cell.getCellProps()}>
                          <span className="text-gray-700 px-6 py-3 flex items-center flex-wrap">{cell.render('Cell')}</span>
                        </td>
                      )
                    })}
                  </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
