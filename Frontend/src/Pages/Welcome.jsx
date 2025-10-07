import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  FaPaw,
  FaStar,
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaTimes,
  FaHeart,
  FaChevronDown,
} from "react-icons/fa";
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
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("all");
  const [healthFilters, setHealthFilters] = useState([]);
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
      const matchesHealth =
        healthFilters.length === 0 ||
        healthFilters.every((filter) => {
          switch (filter) {
            case "vaccinated":
              return pet.isVaccinated;
            case "healthy":
              return pet.isHealthy;
            case "playful":
              return pet.isPlayful;
            default:
              return true;
          }
        });
      const matchesQuery =
        query.trim() === "" ||
        pet.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        (pet.tags &&
          pet.tags.some((tag) =>
            tag.toLowerCase().includes(query.trim().toLowerCase())
          ));
      return (
        matchesType &&
        matchesLocation &&
        matchesAge &&
        matchesHealth &&
        matchesQuery
      );
    });
  }, [pets, typeFilter, locationFilter, ageFilter, healthFilters, query]);

  // toggle health filter
  const toggleHealthFilter = (filter) => {
    setHealthFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // reset filters
  const resetFilters = () => {
    setTypeFilter("All");
    setLocationFilter("All");
    setAgeFilter("all");
    setHealthFilters([]);
    setQuery("");
  };

  const scrollToShowcase = () => {
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Finding your perfect companion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
              <FaPaw className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Paw<span className="text-amber-500">Pal</span>
            </h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              sessionStorage.removeItem("authToken");
              window.location.href = "/user/login";
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-rose-700 transition-all transform hover:scale-105 font-semibold"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-28 text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-block mb-6">
            <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold border border-amber-200">
              🐾 Welcome back, {localStorage.getItem("username")}!
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600"> Pet Companion</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Discover loving pets waiting for their forever homes. Your new best friend is just a click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToShowcase}
              className="group flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Browse Available Pets
              <FaChevronDown className="group-hover:animate-bounce" />
            </button>
            <button className="flex items-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all shadow-lg">
              <FaHeart className="text-red-500" /> View Favorites
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { label: "Happy Adoptions", value: "500+", icon: "🏡" },
              { label: "Available Pets", value: pets.length, icon: "🐾" },
              { label: "Success Rate", value: "95%", icon: "⭐" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 shadow-md">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <FaFilter className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Filter Pets</h2>
                <p className="text-sm text-gray-500">Find exactly what you're looking for</p>
              </div>
            </div>
            <button
              className="md:hidden bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-all"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <FaTimes size={20} /> : <FaFilter size={20} />}
            </button>
          </div>

          <div
            className={`space-y-6 transition-all duration-300 ${
              showFilters ? "block" : "hidden md:block"
            }`}
          >
            {/* Main Filters Row */}
            <div className="grid md:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Search by name or tag..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all font-medium"
                />
              </div>

              {/* Type */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all font-medium"
              >
                {typeOptions.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              {/* Location */}
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all font-medium"
              >
                {locationOptions.map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </select>

              {/* Age */}
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all font-medium"
              >
                {ageOptions.map((age) => (
                  <option key={age.key} value={age.key}>
                    {age.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Health Filters */}
            <div className="flex items-center gap-4 flex-wrap pb-2">
              <span className="text-sm font-semibold text-gray-700">Health & Behavior:</span>
              {healthOptions.map((h) => (
                <button
                  key={h.key}
                  onClick={() => toggleHealthFilter(h.key)}
                  className={`px-5 py-2.5 rounded-xl border-2 flex items-center gap-2 transition-all font-semibold transform hover:scale-105 ${
                    healthFilters.includes(h.key)
                      ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-500 shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-amber-400 hover:bg-amber-50"
                  }`}
                >
                  <span className="text-lg">{h.icon}</span> {h.label}
                </button>
              ))}
              
              <button
                onClick={resetFilters}
                className="ml-auto px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-semibold"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Active Filters Count */}
          {(typeFilter !== "All" || locationFilter !== "All" || ageFilter !== "all" || healthFilters.length > 0 || query) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-amber-600">{filteredPets.length}</span> pets match your filters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Showcase Section */}
      <section ref={showcaseRef} className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Available for <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Adoption</span>
          </h2>
          <p className="text-gray-600 text-lg">Meet your future best friend</p>
        </div>

        {filteredPets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 rounded-3xl border-2 border-dashed border-gray-300">
            <div className="text-7xl mb-4">🔍</div>
            <p className="text-xl text-gray-700 font-semibold mb-2">No pets found</p>
            <p className="text-sm text-gray-500 mb-6">Try adjusting your filters</p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-yellow-700 transition-all shadow-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <div
                key={pet._id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pet.img || "/placeholder.png"}
                    alt={pet.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Pet Type Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white">
                      {pet.type === "Dog" ? (
                        <FaPaw className="text-amber-500 text-xl" />
                      ) : pet.type === "Cat" ? (
                        <GiCat className="text-amber-500 text-xl" />
                      ) : pet.type === "Rabbit" ? (
                        <GiRabbit className="text-amber-500 text-xl" />
                      ) : (
                        <MdPets className="text-amber-500 text-xl" />
                      )}
                    </div>
                  </div>

                  {/* Pet Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
                      {pet.name}
                    </h3>
                    <p className="text-white/90 text-sm font-medium drop-shadow">
                      {Math.round(pet.ageMonths / 12)} years old • {pet.type}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <FaMapMarkerAlt className="text-amber-500" />
                    <span className="font-medium">{pet.location}</span>
                  </div>

                  {/* Health Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {pet.isVaccinated && (
                      <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-emerald-200">
                        💉 Vaccinated
                      </span>
                    )}
                    {pet.isHealthy && (
                      <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-blue-200">
                        ❤️ Healthy
                      </span>
                    )}
                    {pet.isPlayful && (
                      <span className="bg-pink-50 text-pink-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-pink-200">
                        🎾 Playful
                      </span>
                    )}
                  </div>

                  {/* Pet Tags */}
                  {pet.tags && pet.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {pet.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-700 border border-amber-200 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-3.5 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                    onClick={() =>
                      (window.location.href = `/user/adopt/${pet._id}/request`)
                    }
                  >
                    <FaHeart /> Adopt {pet.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Didn't Find Your Match?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            New pets are added regularly. Check back soon or contact us for more information.
          </p>
          <button className="bg-white text-amber-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl transform hover:scale-105" onClick={() => window.location.href = "/contact"}>
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default Welcome;