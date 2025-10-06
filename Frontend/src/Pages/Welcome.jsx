import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  FaPaw,
  FaStar,
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaTimes,
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
    return <p className="text-center mt-10 text-gray-600">Loading pets...</p>;
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen">
      {/* 🔹 Logout Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            sessionStorage.removeItem("authToken");
            window.location.href = "/user/login";
          }}
          className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-5 py-2 rounded-lg shadow hover:from-red-600 hover:to-rose-700 transition-all"
        >
          🚪 Logout
        </button>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Find Your Perfect Pet Companion, <span className="text-yellow-600">{localStorage.getItem("username")}</span>
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
      <section className="px-6 py-8 bg-white/70 backdrop-blur-sm shadow-md rounded-2xl mx-4 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaFilter /> Filters
          </h2>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <FaTimes size={20} /> : <FaFilter size={20} />}
          </button>
        </div>

        <div
          className={`grid md:grid-cols-5 gap-4 transition-all duration-300 ${
            showFilters ? "block" : "hidden md:grid"
          }`}
        >
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or tag..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          >
            {typeOptions.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          {/* Location */}
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          >
            {locationOptions.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>

          {/* Age */}
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none"
          >
            {ageOptions.map((age) => (
              <option key={age.key} value={age.key}>
                {age.label}
              </option>
            ))}
          </select>

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Reset
          </button>
        </div>

        {/* Health Filters */}
        <div className="flex gap-4 mt-6 flex-wrap">
          {healthOptions.map((h) => (
            <button
              key={h.key}
              onClick={() => toggleHealthFilter(h.key)}
              className={`px-4 py-2 rounded-full border flex items-center gap-2 transition ${
                healthFilters.includes(h.key)
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
              }`}
            >
              {h.icon} {h.label}
            </button>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section ref={showcaseRef} className="px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Available Pets for Adoption
        </h2>

        {filteredPets.length === 0 ? (
          <p className="text-center text-gray-600">
            No pets match your filters. Try adjusting them.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={pet.img || "/placeholder.png"}
                  alt={pet.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    {pet.type === "Dog" ? (
                      <FaPaw className="text-yellow-500" />
                    ) : pet.type === "Cat" ? (
                      <GiCat className="text-yellow-500" />
                    ) : pet.type === "Rabbit" ? (
                      <GiRabbit className="text-yellow-500" />
                    ) : (
                      <MdPets className="text-yellow-500" />
                    )}
                    {pet.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {pet.ageMonths} months old
                  </p>
                  <p className="text-gray-500 flex items-center gap-1 mt-2">
                    <FaMapMarkerAlt /> {pet.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pet.isVaccinated && (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                        Vaccinated
                      </span>
                    )}
                    {pet.isHealthy && (
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                        Healthy
                      </span>
                    )}
                    {pet.isPlayful && (
                      <span className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                        Playful
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                      onClick={() => window.location.href = `/user/adopt/${pet._id}/request`}
>
                      Adopt Me
                    </button>
                    <FaStar className="text-yellow-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Welcome;
