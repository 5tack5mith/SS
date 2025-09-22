import React from 'react'

const Dropdown = ({ label, options = [], value, onChange }) => {
  return (
    <div className='w-full'>
      <label className='block text-white/90 mb-2 font-marker'>{label}</label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e)=> onChange(e.target.value)}
          className='w-full appearance-none bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 rounded-2xl pr-10 focus:outline-none focus:ring-2 focus:ring-pink-400/60 focus:border-transparent transition-all'
        >
          <option value='' className='bg-gray-900 text-white'>Select...</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} className='bg-gray-900 text-white'>
              {opt.label}
            </option>
          ))}
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/70'>
          ▼
        </div>
      </div>
    </div>
  )
}

export default Dropdown


