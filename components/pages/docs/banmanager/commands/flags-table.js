import { useMemo } from 'react'
import { useTable } from 'react-table'
import { flags } from 'data/commands'

export const FlagsTable = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Flag',
        accessor: 'flag'
      },
      {
        Header: 'Alias',
        accessor: 'alias'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Permission',
        accessor: 'permission'
      },
      {
        Header: 'Example',
        accessor: 'example'
      }
    ],
    []
  )
  const data = useMemo(() => flags.map(c => ({ flag: c[0], alias: c[1], description: c[2], permission: c[3], example: c[4] })), [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    }
  )

  return (
    <div className="container mx-auto">
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
