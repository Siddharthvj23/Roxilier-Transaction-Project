import React, { useState, useEffect, useCallback } from 'react'
import MonthDropdown from './MonthDropDown';
import Pagination from './Pagination'
import { fetchTransactions } from '../Apicalls/transaction';
import SearchBar from './SearchBar';
// import SearchBar from './SearchBar';
const Home = () => {
    const [pageNo, setPageno] = useState(1)
    const [search, setSearch] = useState("")
    const [transactions, setTransactions] = useState([]);  // Store fetched transactions 
    const [selectedMonth, setSelectedMonth] = useState('03'); // Default March
    const [perPage] = useState(10);

    const validTransactions = Array.isArray(transactions) ? transactions : []
    const getData = useCallback(async () => {
        try {
            const data = await fetchTransactions({
                params: {
                    pageNo,            // Current page
                    perPage,         // Items per page
                    search, // Search text
                    selectedMonth, // Selected month
                },
            });

            setTransactions(data); // Set transactions in state
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }, [pageNo, perPage, search, selectedMonth])



    useEffect(() => {
        getData()
    }, [getData]);

    const handleNext = () => {
        setPageno(pageNo + 1)
    }
    const handlePrevious = () => {
        if (pageNo === 1) {
            setPageno(pageNo)
        }
        else {
            setPageno(pageNo - 1)
        }

    }

    return (
        <>
            <div className='flex justify-evenly m-8'>
                <div className='w-60 h-40 border-4 flex justify-items-center items-center rounded-xl text-2xl text-center bg-amber-500'>
                    Transaction DashBoard
                </div>
            </div>
            <div className='flex justify-between p-3'>
                <div>
                    <SearchBar search={search} setSearch={setSearch} />
                </div>
                <div className='w-60 h-20 border-4 flex justify-items-center items-center rounded-xl text-1xl text-center bg-amber-500'>
                    <MonthDropdown selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                </div>
            </div>
            <div className='flex justify-center items-center p-8 flex-col'>
                {validTransactions.length > 0 ? (
                    <table class="table">
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Sold</th>
                                <th>Image</th>
                                <th>DateOfSale</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validTransactions.map((transactions) => (
                                <tr >
                                    <td>{transactions.externalId}</td>
                                    <td>{transactions.title}</td>
                                    <td>{transactions.description}</td>
                                    <td>{transactions.price}</td>
                                    <td>{transactions.category}</td>
                                    <td>{transactions.sold ? 'Yes' : 'No'}</td>
                                    <td>{transactions.image}</td>
                                    <td>{transactions.dateOfSale}</td>


                                </tr>
                            ))}

                        </tbody>
                    </table>
                ) : (
                    <p>No transactions found for the selected month.</p>
                )}
                <div className='flex w-7xl'>
                    <Pagination nextPageFn={handleNext} previosuPageFn={handlePrevious} pageNumber={pageNo} />
                </div>
            </div>

        </>

    );
};
export default Home