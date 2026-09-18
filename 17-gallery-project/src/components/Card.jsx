import React, { useState } from 'react'

const Card = ({ elem }) => {

    const [loaded, setLoaded] = useState(false)

    return (
        <div className='group'>

            <a
                href={elem.url}
                target='_blank'
                rel='noopener noreferrer'
            >

                <div className='relative h-40 w-full overflow-hidden rounded-xl bg-gray-800'>

                    {/* Loading placeholder */}
                    {!loaded && (
                        <div className='absolute inset-0 animate-pulse bg-gray-700' />
                    )}

                    <img
                        className={`h-full w-full object-cover transition-all duration-500
                            group-hover:scale-105
                            ${loaded ? 'opacity-100' : 'opacity-0'}
                        `}
                        src={`https://picsum.photos/id/${elem.id}/300/200`}
                        alt={`Photo by ${elem.author}`}
                        loading='lazy'
                        decoding='async'
                        onLoad={() => setLoaded(true)}
                    />

                </div>

                <h2 className='font-bold text-base mt-2 truncate'>
                    {elem.author}
                </h2>

            </a>

        </div>
    )
}

export default Card