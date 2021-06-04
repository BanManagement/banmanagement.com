import 'regenerator-runtime/runtime'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import { useRouter } from 'next/router'
import { parse } from 'querystring'
import { commands } from 'data/commands'

function GlobalFilter ({
  globalFilter,
  setGlobalFilter
}) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <div className="col-start-1 col-span-6 md:col-span-3 pr-4 mb-3 md:mb-0">
      <div className="relative w-full md:w-1/3">
        <input
          type="search"
          className="w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-none focus:shadow-outline text-gray-600 font-medium"
          placeholder="Search..."
          value={value || globalFilter || ''}
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

export const CommandsTable = () => {
  const router = useRouter()
  const renderPermission = (e) => <a id={e.value} href={`/docs/banmanager/permissions#${e.value}`}> {e.value} </a>
  const columns = useMemo(
    () => [
      {
        Header: 'Command',
        accessor: 'command'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Flags',
        accessor: 'flags'
      },
      {
        Header: 'Permission',
        accessor: 'permission',
        Cell: renderPermission
      }
    ],
    []
  )
  const data = useMemo(() => commands.map(c => ({ command: c[0], description: c[1], flags: c[2], permission: c[3] })), [])

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

  useEffect(() => {
    const query = parse(router.asPath.substr(router.asPath.indexOf('?') + 1))
    const search = query.search
    if (search) {
      setGlobalFilter(search)
    }
  }, [])

  return (
    <div className="container mx-auto">
      <div className="mb-4 grid grid-cols-6">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <div className="col-end-7 col-span-6 md:col-span-3 place-self-end">
          <div className="flex">
            <div className="relative text-sm">
              <span className="font-bold">Key</span> {'[optional] <required> <option 1 || option 2 || option 3>'}
            </div>
          </div>
        </div>
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
