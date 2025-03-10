import React, { useState } from 'react'

function SearchBar() {
    const [SearchBar,setSearchBar] = useState('')

    const handleSearch = (e)=>{
        setSearchBar(e.target.value)
    }
    return (
        <div>
             <input type="text"
                    placeholder='Search Transaction'
                    onChange={handleSearch}
                    value={SearchBar} 
                    className='w-60 h-20 border-4 flex justify-items-center items-center rounded-xl text-1xl text-center bg-amber-500'/>
        </div>
    )
}

export default SearchBar