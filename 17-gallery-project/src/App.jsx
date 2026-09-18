import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'

import {
    setProducts,
    setLoading,
    setError
} from './store/gallerySlice'

import Card from './components/Card'


const App = () => {

    const dispatch = useDispatch()

    // Get data from Redux
    const products = useSelector(
        state => state.gallery.products
    )

    const loading = useSelector(
        state => state.gallery.loading
    )

    const error = useSelector(
        state => state.gallery.error
    )


    // Search states
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')


    // Pagination
    const [index, setIndex] = useState(1)

    const itemsPerPage = 12


    // --------------------------------
    // Fetch API
    // --------------------------------

    const getData = async () => {

        try {

            dispatch(setLoading(true))

            const response = await axios.get(
                'https://dummyjson.com/products?limit=0'
            )

            dispatch(setProducts(response.data.products))

        }
        catch (error) {

            console.log(error)

            dispatch(
                setError('Failed to load products')
            )

        }
        finally {

            dispatch(setLoading(false))

        }

    }


    useEffect(() => {

        getData()

    }, [])


    // --------------------------------
    // DEBOUNCING
    // --------------------------------

    useEffect(() => {

        const timer = setTimeout(() => {

            setSearch(searchInput)

            // When search changes,
            // go back to first page
            setIndex(1)

        }, 500)


        return () => {

            clearTimeout(timer)

        }

    }, [searchInput])


    // --------------------------------
    // FILTER
    // --------------------------------

    const filteredData = products.filter((item) => {

        const value = search.toLowerCase().trim()

        return (

            item.title
                .toLowerCase()
                .includes(value)

            ||

            (item.brand &&
                item.brand
                    .toLowerCase()
                    .includes(value))

            ||

            item.category
                .toLowerCase()
                .includes(value)

        )

    })


    // --------------------------------
    // PAGINATION
    // --------------------------------

    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
    )


    const startIndex =
        (index - 1) * itemsPerPage


    const currentData = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    )


    // --------------------------------
    // PAGINATION FUNCTIONS
    // --------------------------------

    const goFirst = () => {

        setIndex(1)

    }


    const goPrevious = () => {

        setIndex(prev => Math.max(prev - 1, 1))

    }


    const goNext = () => {

        setIndex(prev =>
            Math.min(prev + 1, totalPages)
        )

    }


    const goLast = () => {

        setIndex(totalPages)

    }


    return (

        <div className='min-h-screen bg-black text-white p-6'>

            <div className='max-w-7xl mx-auto'>


                {/* -------------------------------- */}
                {/* TITLE */}
                {/* -------------------------------- */}

                <h1 className='text-3xl font-bold text-center mb-4'>

                    Product Gallery

                </h1>


                {/* -------------------------------- */}
                {/* SEARCH */}
                {/* -------------------------------- */}

                <div className='flex justify-center mb-8 mt-5'>

                    <input

                        type='text'

                        value={searchInput}

                        onChange={(e) =>
                            setSearchInput(e.target.value)
                        }

                        placeholder='Search by title, author or category...'

                        className='w-full max-w-lg
                                   px-6 py-3
                                   rounded-full
                                   bg-gray-800
                                   border-2
                                   border-gray-700
                                   text-white
                                   outline-none
                                   transition
                                   duration-300
                                   focus:border-amber-400
                                   focus:ring-2
                                   focus:ring-amber-400/20'

                    />

                </div>


                {/* -------------------------------- */}
                {/* SEARCH STATUS */}
                {/* -------------------------------- */}

                {search && !loading && (

                    <p className='text-gray-400 text-sm mb-5'>

                        {filteredData.length} results found
                        for "{search}"

                    </p>

                )}


                {/* -------------------------------- */}
                {/* ERROR */}
                {/* -------------------------------- */}

                {error && (

                    <p className='text-red-400 text-center py-10'>

                        {error}

                    </p>

                )}


                {/* -------------------------------- */}
                {/* LOADING SKELETON */}
                {/* -------------------------------- */}

                {loading && (

                    <div className='grid
                                    grid-cols-2
                                    sm:grid-cols-3
                                    md:grid-cols-4
                                    lg:grid-cols-6
                                    gap-5'>

                        {Array.from({ length: 12 }).map(
                            (_, i) => (

                                <div
                                    key={i}
                                    className='animate-pulse'
                                >

                                    <div className='h-40
                                                    rounded-xl
                                                    bg-gray-800' />

                                    <div className='h-4
                                                    bg-gray-800
                                                    rounded
                                                    mt-3
                                                    w-3/4' />

                                    <div className='h-3
                                                    bg-gray-800
                                                    rounded
                                                    mt-2
                                                    w-1/2' />

                                </div>

                            )
                        )}

                    </div>

                )}


                {/* -------------------------------- */}
                {/* NO RESULTS */}
                {/* -------------------------------- */}

                {!loading &&
                    filteredData.length === 0 && (

                        <div className='text-center py-20'>

                            <h2 className='text-xl text-gray-400'>

                                No products found

                            </h2>

                            <p className='text-gray-500 mt-2'>

                                Try another search term.

                            </p>

                        </div>

                    )}


                {/* -------------------------------- */}
                {/* GALLERY */}
                {/* -------------------------------- */}

                {!loading &&
                    currentData.length > 0 && (

                        <div className='grid
                                        grid-cols-2
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


                {/* -------------------------------- */}
                {/* PAGINATION */}
                {/* -------------------------------- */}

                {!loading &&
                    totalPages > 0 && (

                        <div className='flex
                                        justify-center
                                        items-center
                                        gap-2
                                        mt-10
                                        pb-8
                                        flex-wrap'>


                            {/* FIRST */}

                            <button
                                onClick={goFirst}
                                disabled={index === 1}
                                className='px-4 py-2
                                           rounded-lg
                                           bg-gray-800
                                           hover:bg-gray-700
                                           disabled:opacity-40
                                           disabled:cursor-not-allowed
                                           transition'
                            >

                                « First

                            </button>


                            {/* PREVIOUS */}

                            <button
                                onClick={goPrevious}
                                disabled={index === 1}
                                className='px-4 py-2
                                           rounded-lg
                                           bg-gray-800
                                           hover:bg-gray-700
                                           disabled:opacity-40
                                           disabled:cursor-not-allowed
                                           transition'
                            >

                                ‹ Prev

                            </button>


                            {/* PAGE */}

                            <span className='px-4 py-2
                                             font-semibold
                                             min-w-28
                                             text-center'>

                                {index} / {totalPages}

                            </span>


                            {/* NEXT */}

                            <button
                                onClick={goNext}
                                disabled={index === totalPages}
                                className='px-4 py-2
                                           rounded-lg
                                           bg-gray-800
                                           hover:bg-gray-700
                                           disabled:opacity-40
                                           disabled:cursor-not-allowed
                                           transition'
                            >

                                Next ›

                            </button>


                            {/* LAST */}

                            <button
                                onClick={goLast}
                                disabled={index === totalPages}
                                className='px-4 py-2
                                           rounded-lg
                                           bg-gray-800
                                           hover:bg-gray-700
                                           disabled:opacity-40
                                           disabled:cursor-not-allowed
                                           transition'
                            >

                                Last »

                            </button>

                        </div>

                    )}

            </div>

        </div>

    )

}

export default App