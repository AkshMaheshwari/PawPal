import React, { useMemo, useRef, useState } from 'react'
import { FaPaw, FaStar, FaSearch, FaMapMarkerAlt } from 'react-icons/fa'
import { GiCat, GiRabbit } from 'react-icons/gi'
import { MdPets } from 'react-icons/md'

const allPets = [
  { id: 1, name: 'Buddy', ageMonths: 26, type: 'Dog', location: 'Mumbai', img: '/Buddy.png', rating: 4.8, tags: ['Playful', 'Vaccinated'] },
  { id: 2, name: 'Luna', ageMonths: 14, type: 'Cat', location: 'Pune', img: '/Luna.webp', rating: 4.9, tags: ['Gentle', 'Spayed'] },
  { id: 3, name: 'Mittens', ageMonths: 10, type: 'Cat', location: 'Mumbai', img: '/Mittens.png', rating: 4.7, tags: ['Indoor', 'Litter Trained'] },
  { id: 4, name: 'Simba', ageMonths: 18, type: 'Cat', location: 'Pune', img: '/Simba.webp', rating: 4.6, tags: ['Affectionate'] },
  { id: 5, name: 'Max', ageMonths: 30, type: 'Dog', location: 'Mumbai', img: '/Max.webp', rating: 4.5, tags: ['Energetic'] },
  { id: 6, name: 'Rocky', ageMonths: 8, type: 'Dog', location: 'Pune', img: '/Rocky.png', rating: 4.4, tags: ['Good with kids'] },
  
]

const typeOptions = ['All', 'Dog', 'Cat', 'Rabbit']
const locationOptions = ['All', 'Mumbai', 'Pune']
const ageOptions = [
  { key: 'all', label: 'All Ages' },
  { key: '0-12', label: '0-12 months' },
  { key: '13-24', label: '13-24 months' },
  { key: '25+', label: '25+ months' },
]

const Welcome = () => {
  const [typeFilter, setTypeFilter] = useState('All')
  const [locationFilter, setLocationFilter] = useState('All')
  const [ageFilter, setAgeFilter] = useState('all')
  const [query, setQuery] = useState('')
  const showcaseRef = useRef(null)

  const filteredPets = useMemo(() => {
    return allPets.filter(pet => {
      const matchesType = typeFilter === 'All' || pet.type === typeFilter
      const matchesLocation = locationFilter === 'All' || pet.location === locationFilter
      const matchesAge = (() => {
        if (ageFilter === 'all') return true
        if (ageFilter === '0-12') return pet.ageMonths <= 12
        if (ageFilter === '13-24') return pet.ageMonths >= 13 && pet.ageMonths <= 24
        if (ageFilter === '25+') return pet.ageMonths >= 25
        return true
      })()
      const matchesQuery = query.trim() === '' || pet.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesType && matchesLocation && matchesAge && matchesQuery
    })
  }, [typeFilter, locationFilter, ageFilter, query])

  const scrollToShowcase = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-yellow-100/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow">
              <FaPaw className="text-white" />
            </div>
            <span className="font-bold text-xl text-yellow-700">PawPal</span>
          </div>
          <button onClick={scrollToShowcase} className="hidden sm:inline-flex bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-yellow-600 hover:to-amber-600 transition">
            Browse Pets
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-14 pb-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-yellow-700 bg-white/70 px-4 py-2 rounded-full shadow">
              <MdPets /> Find your perfect companion
            </div>
            <h1 className="mt-5 text-5xl font-extrabold leading-tight">
              Welcome to
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500">PawPal</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">Discover lovable pets from verified shelters in Mumbai and Pune. Filter by type, location, age, and more.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={scrollToShowcase} className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-3 rounded-2xl font-semibold shadow hover:from-yellow-600 hover:to-amber-600 transition">Get Started</button>
              <a href="/signup" className="border-2 border-yellow-500 text-yellow-600 px-6 py-3 rounded-2xl font-semibold hover:bg-yellow-50 transition">Join Now</a>
            </div>
          </div>
          <div>
            <img src="/Pet and Family.jpg" alt="Pets and family" className="w-full rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section ref={showcaseRef} className="px-6 pb-4">
        <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur rounded-3xl shadow p-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name" className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none bg-white" />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-yellow-500">
              {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="px-3 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-yellow-500">
              {locationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} className="px-3 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-yellow-500">
              {ageOptions.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
            </select>
            <button onClick={() => { setTypeFilter('All'); setLocationFilter('All'); setAgeFilter('all'); setQuery('') }} className="px-3 py-3 rounded-xl border-2 border-yellow-500 text-yellow-700 font-semibold hover:bg-yellow-50">Reset</button>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Available Pets</h2>
            <span className="text-sm text-gray-500">{filteredPets.length} found</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map(pet => (
              <article key={pet.id} className="group bg-white rounded-3xl shadow hover:shadow-2xl transition overflow-hidden border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={pet.img} alt={pet.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                    {pet.type === 'Dog' && <FaPaw className="text-yellow-500" />}
                    {pet.type === 'Cat' && <GiCat className="text-yellow-500" />}
                    {pet.type === 'Rabbit' && <GiRabbit className="text-yellow-500" />}
                    {pet.type}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {pet.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
                    <span className="text-sm text-gray-500">{Math.round(pet.ageMonths/12)} yr{Math.round(pet.ageMonths/12) !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-gray-500 text-sm">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {pet.location}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pet.tags?.map((t) => (
                      <span key={t} className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2.5 rounded-2xl font-semibold hover:from-yellow-600 hover:to-amber-600 transition">Adopt {pet.name}</button>
                </div>
              </article>
            ))}
          </div>
          {filteredPets.length === 0 && (
            <div className="mt-10 text-center text-gray-500">No pets match your filters. Try resetting.</div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Welcome