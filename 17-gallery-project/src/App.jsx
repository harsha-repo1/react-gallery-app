import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const [index, setIndex] = useState(1)

    const itemsPerPage = 12
    const totalItems = 100

    const getData = async () => {
        try {
            setLoading(true)

            const response = await axios.get(
                `https://picsum.photos/v2/list?limit=${totalItems}`
            )

            setAllData(response.data)
        } catch (error) {
            console.log('Error fetching images:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput)
            setIndex(1)
        }, 1500)

        return () => clearTimeout(timer)
    }, [searchInput])

    const filteredData = allData.filter((item) => {
        const value = search.toLowerCase().trim()

        if (!value) {
            return true
        }

        return (
            item.author.toLowerCase().includes(value) ||
            item.id.toString().includes(value)
        )
    })

    const totalPages = Math.ceil(
        filteredData.length / itemsPerPage
    )

    const startIndex = (index - 1) * itemsPerPage

    const currentData = filteredData.slice(
        startIndex,
        startIndex + itemsPerPage
    )

const goFirst = () => {
    setIndex(1)
}

const goPrevious = () => {
    setIndex((prev) => Math.max(prev - 1, 1))
}

const goNext = () => {
    setIndex((prev) => Math.min(prev + 1, totalPages))
}

const goLast = () => {
    setIndex(totalPages)
}

    return (
        <div className="min-h-screen w-full bg-black text-white px-6 py-5">

            <div className="w-full">

                <h1 className="text-3xl font-bold text-center mb-5">
                    React Gallery
                </h1>

                <div className="flex justify-center mt-5 mb-8">

                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) =>
                            setSearchInput(e.target.value)
                        }
                        placeholder="Search photographer or photo ID..."
                        className="w-full max-w-lg px-6 py-3 rounded-full bg-gray-800 border-2 border-gray-700 text-white outline-none transition duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                    />

                </div>

                {searchInput !== search && (
                    <p className="text-center text-gray-500 text-sm mb-5">
                        Searching...
                    </p>
                )}

                {searchInput === search && !loading && (
                    <p className="text-gray-400 text-sm mb-5">
                        {filteredData.length} result(s) found
                        {search && ` for "${search}"`}
                    </p>
                )}

                {loading && (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 w-full">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse"
                            >
                                <div className="h-40 rounded-xl bg-gray-800" />

                                <div className="h-4 bg-gray-800 rounded mt-3 w-3/4" />

                                <div className="h-3 bg-gray-800 rounded mt-2 w-1/2" />
                            </div>
                        ))}

                    </div>
                )}

                {!loading &&
                    searchInput === search &&
                    filteredData.length === 0 && (

                        <div className="text-center py-20">

                            <h2 className="text-xl text-gray-400">
                                No images found
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Try another photographer or photo ID.
                            </p>

                        </div>
                    )}

                {!loading && currentData.length > 0 && (

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 w-full">
                        {currentData.map((item) => (
                            <Card
                                key={item.id}
                                elem={item}
                            />
                        ))}

                    </div>
                )}

                {!loading &&
                    searchInput === search &&
                    totalPages > 0 && (

                        <div className="flex justify-center items-center gap-2 mt-10 pb-8 flex-wrap">

                            <button
                                onClick={goFirst}
                                disabled={index === 1}
                                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                « First
                            </button>

                            <button
                                onClick={goPrevious}
                                disabled={index === 1}
                                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                ‹ Prev
                            </button>

                            <span className="px-4 py-2 font-semibold min-w-28 text-center">
                                Page {index} / {totalPages}
                            </span>

                            <button
                                onClick={goNext}
                                disabled={index === totalPages}
                                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                            >
                                Next ›
                            </button>

                            <button
                                onClick={goLast}
                                disabled={index === totalPages}
                                className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
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