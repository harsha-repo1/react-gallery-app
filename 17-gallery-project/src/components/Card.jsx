import React, { useState } from 'react'

const Card = ({ elem }) => {

    const [loaded, setLoaded] = useState(false)

    return (

        <div className='group'>

            <div className='overflow-hidden
                            rounded-xl
                            bg-gray-800
                            shadow-lg
                            hover:shadow-2xl
                            transition-all
                            duration-300
                            hover:-translate-y-1'>

                {/* Image */}
                <div className='relative
                                h-40
                                w-full
                                overflow-hidden
                                bg-gray-800'>

                    {/* Shimmer */}
                    {!loaded && (

                        <div className='absolute inset-0
                                        overflow-hidden
                                        bg-gray-800'>

                            <div className='absolute inset-0
                                            -translate-x-full
                                            animate-[shimmer_1.5s_infinite]
                                            bg-gradient-to-r
                                            from-transparent
                                            via-gray-600/30
                                            to-transparent' />

                        </div>

                    )}

                    <img
                        src={elem.thumbnail}
                        alt={elem.title}
                        loading='lazy'
                        decoding='async'
                        onLoad={() => setLoaded(true)}
                        className={`
                            h-full
                            w-full
                            object-cover
                            transition-all
                            duration-500
                            group-hover:scale-105
                            ${loaded
                                ? 'opacity-100'
                                : 'opacity-0'
                            }
                        `}
                    />

                </div>

                {/* Details */}
                <div className='p-3'>

                    <h2 className='font-semibold
                                   text-sm
                                   truncate'
                        title={elem.title}
                    >
                        {elem.title}
                    </h2>

                    <p className='text-xs
                                  text-gray-400
                                  mt-1
                                  truncate'
                    >
                        {elem.brand || 'Unknown Author'}
                    </p>

                    <p className='text-xs
                                  text-amber-400
                                  mt-1
                                  capitalize'
                    >
                        {elem.category}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Card