import React, { useState } from 'react'

const Card = ({ elem }) => {
    const [loaded, setLoaded] = useState(false)

    return (
        <div className="group">

            <div className="overflow-hidden rounded-xl bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">

<div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-800">
                    {!loaded && (
                        <div className="absolute inset-0 overflow-hidden bg-gray-800">

                            <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-600/30 to-transparent" />

                        </div>
                    )}

                 <img
    src={`https://picsum.photos/id/${elem.id}/300/200`}
    alt={`Photo by ${elem.author}`}
    loading="lazy"
    decoding="async"
    onLoad={() => setLoaded(true)}
    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
        loaded ? 'opacity-100' : 'opacity-0'
    }`}
/>

                </div>

                <div className="p-3">

                    <h2
                        className="font-semibold text-sm truncate"
                        title={elem.author}
                    >
                        {elem.author}
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                        Photo ID: {elem.id}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Card