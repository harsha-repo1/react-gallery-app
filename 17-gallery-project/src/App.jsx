import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {

  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  // Store already loaded pages
  const [pageCache, setPageCache] = useState({})

  const getData = async (page) => {

    // Use cached data if page was already loaded
    if (pageCache[page]) {
      setUserData(pageCache[page])
      return
    }

    try {
      setLoading(true)

      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=12`
      )

      setUserData(response.data)

      // Save page in cache
      setPageCache(prev => ({
        ...prev,
        [page]: response.data
      }))

    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData(index)
  }, [index])

  // Search by author name
  const filteredData = userData.filter((elem) =>
    elem.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='bg-black min-h-screen p-6 text-white'>

      {/* Header */}
      <div className='max-w-7xl mx-auto mb-6'>

        <h1 className='text-3xl font-bold mb-5'>
          React Gallery
        </h1>

        {/* Search */}
        <div className='flex justify-center mb-6'>
          <input
            type='text'
            placeholder='Search by photographer...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full max-w-md px-4 py-3 rounded-lg
                       bg-gray-800 text-white
                       outline-none border border-gray-700
                       focus:border-amber-400'
          />
        </div>

      </div>

      {/* Gallery */}
      <div className='max-w-7xl mx-auto'>

        {loading && userData.length === 0 && (
          <div className='flex justify-center py-10'>
            <p className='text-gray-400'>
              Loading images...
            </p>
          </div>
        )}

        {!loading && filteredData.length === 0 && (
          <div className='text-center py-10'>
            <p className='text-gray-400'>
              No images found.
            </p>
          </div>
        )}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5'>

          {filteredData.map((elem) => (
            <Card
              key={elem.id}
              elem={elem}
            />
          ))}

        </div>

      </div>

      {/* Pagination */}
      <div className='flex justify-center items-center gap-6 mt-10 pb-6'>

        <button
          disabled={index === 1 || loading}
          className={`px-5 py-2 rounded-lg font-semibold transition
            ${index === 1 || loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-amber-400 text-black hover:bg-amber-300 active:scale-95'
            }`}
          onClick={() => setIndex(prev => prev - 1)}
        >
          ← Prev
        </button>

        <h4 className='font-semibold min-w-20 text-center'>
          Page {index}
        </h4>

        <button
          disabled={loading}
          className={`px-5 py-2 rounded-lg font-semibold transition
            ${loading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-amber-400 text-black hover:bg-amber-300 active:scale-95'
            }`}
          onClick={() => setIndex(prev => prev + 1)}
        >
          Next →
        </button>

      </div>

    </div>
  )
}

export default App