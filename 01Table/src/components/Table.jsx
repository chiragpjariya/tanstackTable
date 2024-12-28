
import { useMemo, useState } from 'react'
import Data from '../MOCK_DATA.json'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'

function Table() {

    const data = useMemo(() => Data, [])
    const columns = [
        {
            header: "ID",
            accessorKey: "id"
        },
        {
            header: 'Full Name',
            accessorFn: row => `${row.first_name} ${row.last_name}`,
            cell: info => info.getValue()
        },
        {
            header: "Email",
            accessorKey: "email"
        },
        {
            header: 'Gender',
            accessorKey: 'gender'
        }
    ]
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        state:{
            sorting:sorting,
            globalFilter:filtering
        },
        onGlobalFilterChange:setFiltering,
        onSortingChange:setSorting
    })

    return (
        <>
            <div className="relative overflow-x-auto">
                <form className="max-w-md mx-auto mt-8 mb-9">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="default-search"
                            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search Mockups, Logos..."
                            required=""
                            value={filtering}
                            onChange={(e)=> setFiltering(e.target.value)}
                        />
                        
                    </div>
                </form>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-[1.1rem]">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                        {
                            table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((headers) => (
                                            <th key={headers.id} scope="col" className="px-6 py-3" onClick={headers.column.getToggleSortingHandler()}>
                                                {
                                                    flexRender(headers.column.columnDef.header, headers.getContext())
                                                }

                                                &nbsp;
                                                &nbsp;

                                                { //syntaxt
                                                    { asc: '👆', desc: '👇' }[headers.column.getIsSorted() ?? null]
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }

                        <tr>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            table.getRowModel().rows.map((rows) => (
                                <tr key={rows.id} className="bg-white dark:bg-gray-800">
                                    {
                                        rows.getVisibleCells().map((cell) => {
                                            return (  // Add return here to correctly render each <td>
                                                <td key={cell.id} className="px-6 py-4">
                                                    {
                                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
            <div className=' flex justify-evenly items-center mt-10'>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => table.setPageIndex(0)}>First Page</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next Page</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Previous Page</button>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last page</button>
            </div>

        </>
    )
}

export default Table