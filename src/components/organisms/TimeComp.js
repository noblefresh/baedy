import React from 'react'

function TimeComp({title}) {
  return (
    <div className='flex items-center'>
      <div className='flex-grow text-sm text-amber-600 font-bold'>{title}</div>
      <div className='p-2 flex  text-amber-950 text-sm divide-gray-400 divide-x *:px-2 border border-gray-50 rounded-xl'>
        <div>15-04-2025</div>
        <div>21:20pm</div>
      </div>
    </div>
  )
}

export default TimeComp
