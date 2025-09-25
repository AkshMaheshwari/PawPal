
import React, { useMemo, useRef, useState, useEffect } from "react";
import { FaPaw, FaStar, FaSearch, FaMapMarkerAlt, FaFilter, FaTimes } from "react-icons/fa";
import { GiCat, GiRabbit } from "react-icons/gi";
import { MdPets } from "react-icons/md";

// filter options (static)
const typeOptions = ["All", "Dog", "Cat", "Rabbit"];
const locationOptions = ["All", "Mumbai", "Pune"];
const ageOptions = [
  { key: "all", label: "All Ages" },
  { key: "0-12", label: "0-12 months" },
  { key: "13-24", label: "13-24 months" },
  { key: "25+", label: "25+ months" },
];

const healthOptions = [
  { key: "vaccinated", label: "Vaccinated", icon: "💉" },
  { key: "healthy", label: "Healthy", icon: "❤️" },
  { key: "playful", label: "Playful", icon: "🎾" },
];

const Welcome = () => {
  const [pets, setPets] = useState([]);        // pets from backend
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("all");
  const [healthFilters, setHealthFilters] = useState([]); // array of selected health filters
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const showcaseRef = useRef(null);

  // fetch pets from backend
  useEffect(() => {
    fetch("http://localhost:3000/api/pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pets:", err);
        setLoading(false);
      });
  }, []);

  // apply filters
  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesType = typeFilter === "All" || pet.type === typeFilter;
      const matchesLocation =
        locationFilter === "All" || pet.location === locationFilter;
      const matchesAge = (() => {
        if (ageFilter === "all") return true;
        if (ageFilter === "0-12") return pet.ageMonths <= 12;
        if (ageFilter === "13-24")
          return pet.ageMonths >= 13 && pet.ageMonths <= 24;
        if (ageFilter === "25+") return pet.ageMonths >= 25;
        return true;
      })();
      const matchesHealth = healthFilters.length === 0 || healthFilters.every(filter => {
        switch(filter) {
          case "vaccinated": return pet.isVaccinated;
          case "healthy": return pet.isHealthy;
          case "playful": return pet.isPlayful;
          default: return true;
        }
      });
      const matchesQuery =
        query.trim() === "" ||
        pet.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        (pet.tags && pet.tags.some(tag => 
          tag.toLowerCase().includes(query.trim().toLowerCase())
        ));
      return matchesType && matchesLocation && matchesAge && matchesHealth && matchesQuery;
    });
  }, [pets, typeFilter, locationFilter, ageFilter, healthFilters, query]);

  // handle health filter toggle
  const toggleHealthFilter = (filter) => {
    setHealthFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // reset all filters
  const resetFilters = () => {
    setTypeFilter("All");
    setLocationFilter("All");
    setAgeFilter("all");
    setHealthFilters([]);
    setQuery("");
  };

  // get unique tags from all pets for tag filtering
  const allTags = useMemo(() => {
    const tagSet = new Set();
    pets.forEach(pet => {
      if (pet.tags) {
        pet.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [pets]);

  const scrollToShowcase = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading pets...</p>;
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen">
      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Pet Companion
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover loving pets waiting for their forever homes
          </p>
          <button
            onClick={scrollToShowcase}
            className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-600 hover:to-amber-600 transition shadow-lg"
          >
            Browse Available Pets
          </button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="px-6 py-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Find Your Perfect Match</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <FaFilter />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                <FaTimes />
                Reset
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or tags..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="space-y-6">
              {/* Basic Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pet Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {typeOptions.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {locationOptions.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Age Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                  <select
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {ageOptions.map((age) => (
                      <option key={age.key} value={age.key}>{age.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Health Characteristics */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Health & Characteristics</label>
                <div className="flex flex-wrap gap-3">
                  {healthOptions.map((option) => (
                    <button
                      key={option.key}
                      onClick={() => toggleHealthFilter(option.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition ${
                        healthFilters.includes(option.key)
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-yellow-400'
                      }`}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags Filter */}
              {allTags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Popular Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-yellow-100 hover:text-yellow-700 transition"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active Filters Display */}
          {(typeFilter !== "All" || locationFilter !== "All" || ageFilter !== "all" || healthFilters.length > 0 || query) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {typeFilter !== "All" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Type: {typeFilter}
                </span>
              )}
              {locationFilter !== "All" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Location: {locationFilter}
                </span>
              )}
              {ageFilter !== "all" && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Age: {ageOptions.find(a => a.key === ageFilter)?.label}
                </span>
              )}
              {healthFilters.map(filter => (
                <span key={filter} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  {healthOptions.find(h => h.key === filter)?.label}
                </span>
              ))}
              {query && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  Search: "{query}"
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Showcase */}
      <section ref={showcaseRef} className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Available Pets</h2>
            <div className="text-sm text-gray-500">
              {filteredPets.length === pets.length ? (
                <span>{pets.length} pets available</span>
              ) : (
                <span>{filteredPets.length} of {pets.length} pets</span>
              )}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <article
                key={pet._id}  // ✅ Mongo uses _id, not id
                className="group bg-white rounded-3xl shadow hover:shadow-2xl transition overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pet.img}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                    {pet.type === "Dog" && <FaPaw className="text-yellow-500" />}
                    {pet.type === "Cat" && <GiCat className="text-yellow-500" />}
                    {pet.type === "Rabbit" && <GiRabbit className="text-yellow-500" />}
                    {pet.type}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {pet.rating}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
                    <span className="text-sm text-gray-500">
                      {Math.round(pet.ageMonths / 12)} yr
                      {Math.round(pet.ageMonths / 12) !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-gray-500 text-sm">
                    <FaMapMarkerAlt className="text-gray-400" />
                    {pet.location}
                  </div>
                  {/* Health Characteristics */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pet.isVaccinated && (
                      <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full flex items-center gap-1">
                        💉 Vaccinated
                      </span>
                    )}
                    {pet.isHealthy && (
                      <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full flex items-center gap-1">
                        ❤️ Healthy
                      </span>
                    )}
                    {pet.isPlayful && (
                      <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full flex items-center gap-1">
                        🎾 Playful
                      </span>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {pet.tags && pet.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {pet.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-1 rounded-full"
                        >
                          #{t}
                        </span>
                      ))}
                      {pet.tags.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{pet.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  <button className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2.5 rounded-2xl font-semibold hover:from-yellow-600 hover:to-amber-600 transition">
                    Adopt {pet.name}
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filteredPets.length === 0 && !loading && (
            <div className="mt-10 text-center text-gray-500">
              <div className="mb-4">
                <MdPets className="mx-auto text-6xl text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No pets found</h3>
              <p className="text-gray-500 mb-4">
                No pets match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={resetFilters}
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Welcome;
