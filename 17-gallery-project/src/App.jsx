import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {

    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [index, setIndex] = useState(1)

    const itemsPerPage = 12

    // Fetch all products only once
    const getData = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                'https://dummyjson.com/products?limit=0'
            )

            setAllData(response.data.products)

        } catch (error) {
            console.log('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // Search title + brand + category
    const filteredData = allData.filter((item) => {

        const searchText = search.toLowerCase()

        return (
            item.title.toLowerCase().includes(searchText) ||
            (item.brand &&
                item.brand.toLowerCase().includes(searchText)) ||
            item.category.toLowerCase().includes(searchText)
        )
    })

    // Calculate total pages
    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
    )

    // Get current page data
    const startIndex = (index - 1) * itemsPerPage

    const currentData = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    )

    // Reset to page 1 when searching
    const handleSearch = (e) => {
        setSearch(e.target.value)
        setIndex(1)
    }

    return (

        <div className='min-h-screen bg-black text-white p-6'>

            {/* Heading */}
            <div className='max-w-7xl mx-auto'>

                <h1 className='text-3xl font-bold text-center mb-6'>
                    Product Gallery
                </h1>

                {/* Search */}
                <div className='flex justify-center mb-8'>

                    <input
                        type='text'
                        value={search}
                        onChange={handleSearch}
                        placeholder='Search by title, author or category...'
                        className='w-full max-w-lg px-5 py-3
                                   rounded-xl
                                   bg-gray-800
                                   border border-gray-700
                                   text-white
                                   outline-none
                                   focus:border-amber-400
                                   transition'
                    />

                </div>

                {/* Loading Animation */}
                {loading && (

                    <div className='grid grid-cols-2 sm:grid-cols-3
                                    md:grid-cols-4 lg:grid-cols-6
                                    gap-5'>

                        {Array.from({ length: 12 }).map((_, i) => (

                            <div
                                key={i}
                                className='animate-pulse'
                            >

                                <div className='h-40 rounded-xl bg-gray-800' />

                                <div className='h-4 bg-gray-800
                                                rounded mt-3 w-3/4' />

                                <div className='h-3 bg-gray-800
                                                rounded mt-2 w-1/2' />

                            </div>

                        ))}

                    </div>
                )}

                {/* No Results */}
                {!loading && currentData.length === 0 && (

                    <div className='text-center py-20'>

                        <h2 className='text-xl text-gray-400'>
                            No products found
                        </h2>

                        <p className='text-gray-500 mt-2'>
                            Try another search term.
                        </p>

                    </div>
                )}

                {/* Gallery */}
                {!loading && currentData.length > 0 && (

                    <div className='grid grid-cols-2
                                    sm:grid-cols-3
                                    md:grid-cols-4
                                    lg:grid-cols-6
                                    gap-5'>

                        {currentData.map((item) => (

                            <Card
                                key={item.id}
                                elem={item}
                            />

                        ))}

                    </div>
                )}

                {/* Pagination */}
                {!loading && totalPages > 0 && (

                    <div className='flex justify-center
                                    items-center gap-6
                                    mt-10 pb-8'>

                        <button
                            disabled={index === 1}
                            onClick={() =>
                                setIndex(prev => prev - 1)
                            }
                            className='px-5 py-2 rounded-lg
                                       bg-amber-400 text-black
                                       font-semibold
                                       disabled:bg-gray-700
                                       disabled:text-gray-500
                                       disabled:cursor-not-allowed
                                       hover:bg-amber-300
                                       transition'
                        >
                            ← Previous
                        </button>

                        <span className='font-semibold'>
                            Page {index} of {totalPages}
                        </span>

                        <button
                            disabled={index === totalPages}
                            onClick={() =>
                                setIndex(prev => prev + 1)
                            }
                            className='px-5 py-2 rounded-lg
                                       bg-amber-400 text-black
                                       font-semibold
                                       disabled:bg-gray-700
                                       disabled:text-gray-500
                                       disabled:cursor-not-allowed
                                       hover:bg-amber-300
                                       transition'
                        >
                            Next →
                        </button>

                    </div>
                )}

            </div>

        </div>
    )
}

export default App