import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const ShelterDashboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortKey, setSortKey] = useState("newest");

  const [formData, setFormData] = useState({
    name: "",
    type: "Dog",
    ageMonths: 0,
    location: "",
    isVaccinated: false,
    isHealthy: false,
    isPlayful: false,
    tags: "",
    img: ""
  });

  // Fetch pets from backend
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Create or Update pet
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingPet ? "PUT" : "POST";
    const url = editingPet
      ? `http://localhost:3000/api/pets/${editingPet._id}`
      : "http://localhost:3000/api/pets/add";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((t) => t.trim())
        })
      });
      const updated = await res.json();

      if (editingPet) {
        setPets((prev) =>
          prev.map((p) => (p._id === editingPet._id ? updated : p))
        );
      } else {
        setPets((prev) => [...prev, updated]);
      }

      setFormData({
        name: "",
        type: "Dog",
        ageMonths: 0,
        location: "",
        isVaccinated: false,
        isHealthy: false,
        isPlayful: false,
        tags: "",
        img: ""
      });
      setEditingPet(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving pet:", err);
    }
  };

  // Delete pet
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await fetch(`http://localhost:3000/api/pets/${id}`, { method: "DELETE" });
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  // Open edit form
  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      ...pet,
      tags: pet.tags ? pet.tags.join(", ") : ""
    });
    setShowForm(true);
  };

  // Local search/filter/sort (UI only)
  const normalize = (str) => (str || "").toString().toLowerCase().trim();
  const matchesQuery = (pet) => {
    const q = normalize(searchQuery);
    if (!q) return true;
    const haystack = [pet.name, pet.type, pet.location, ...(Array.isArray(pet.tags) ? pet.tags : [])]
      .map(normalize)
      .join(" ");
    return haystack.includes(q);
  };
  const typeMatches = (pet) => (typeFilter === "All" ? true : normalize(pet.type) === normalize(typeFilter));
  const sorted = (arr) => {
    const copy = [...arr];
    if (sortKey === "age_asc") return copy.sort((a, b) => (a.ageMonths || 0) - (b.ageMonths || 0));
    if (sortKey === "age_desc") return copy.sort((a, b) => (b.ageMonths || 0) - (a.ageMonths || 0));
    return copy.reverse();
  };
  const filteredPets = sorted(pets.filter((p) => matchesQuery(p) && typeMatches(p)));

  // Analytics (overall, not filtered)
  const total = pets.length;
  const countByType = pets.reduce(
    (acc, p) => {
      const t = normalize(p.type);
      if (t === "dog") acc.dog += 1;
      else if (t === "cat") acc.cat += 1;
      else acc.other += 1;
      return acc;
    },
    { dog: 0, cat: 0, other: 0 }
  );
  const vaccinated = pets.filter((p) => p.isVaccinated).length;
  const healthy = pets.filter((p) => p.isHealthy).length;
  const playful = pets.filter((p) => p.isPlayful).length;
  const avgAgeMonths = total > 0 ? Math.round(pets.reduce((s, p) => s + (p.ageMonths || 0), 0) / total) : 0;
  const uniqueLocations = new Set(pets.map((p) => (p.location || "").trim()).filter(Boolean)).size;

  if (loading) return <p className="text-center mt-10">Loading pets...</p>;

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Shelter <span className="text-yellow-600">Dashboard</span>
        </h1>
        <button
          onClick={() => {
            setEditingPet(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl shadow hover:from-green-600 hover:to-emerald-700 transition-all"
        >
          <FaPlus /> Add New Pet
        </button>
      </div>

      {/* Analytics */}
      <div className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Total Pets</p>
            <p className="text-2xl font-semibold text-gray-800">{total}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Dogs</p>
            <p className="text-2xl font-semibold text-gray-800">{countByType.dog}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Cats</p>
            <p className="text-2xl font-semibold text-gray-800">{countByType.cat}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Others</p>
            <p className="text-2xl font-semibold text-gray-800">{countByType.other}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Avg Age</p>
            <p className="text-2xl font-semibold text-gray-800">{Math.round(avgAgeMonths / 12)} yrs</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Locations</p>
            <p className="text-2xl font-semibold text-gray-800">{uniqueLocations}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {/* Type distribution */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-800">Type Distribution</p>
              <span className="text-xs text-gray-500">Overall</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Dogs", value: countByType.dog, color: "bg-amber-400" },
                { label: "Cats", value: countByType.cat, color: "bg-yellow-500" },
                { label: "Others", value: countByType.other, color: "bg-orange-400" }
              ].map(({ label, value, color }) => {
                const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                return (
                  <div key={label} className="text-sm">
                    <div className="flex justify-between text-gray-600 mb-1">
                      <span>{label}</span>
                      <span>{value} ({pct}%)</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full">
                      <div
                        className={`h-2.5 ${color} rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Health indicators */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-800">Wellness Snapshot</p>
              <span className="text-xs text-gray-500">Overall</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Vaccinated", value: vaccinated, icon: "💉", color: "bg-emerald-500" },
                { label: "Healthy", value: healthy, icon: "❤️", color: "bg-green-500" },
                { label: "Playful", value: playful, icon: "🎾", color: "bg-teal-500" }
              ].map(({ label, value, icon, color }) => {
                const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                return (
                  <div key={label} className="text-sm">
                    <div className="flex justify-between text-gray-600 mb-1">
                      <span className="inline-flex items-center gap-2">
                        <span>{icon}</span>
                        {label}
                      </span>
                      <span>{value} ({pct}%)</span>
                    </div>
                    <div className="h-2.5 w-full bg-gray-100 rounded-full">
                      <div
                        className={`h-2.5 ${color} rounded-full transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="mb-8 grid md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Search by name, location, or tag…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-xl bg-white/60 focus:bg-white transition"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full p-3 border rounded-xl bg-white/60 focus:bg-white transition"
        >
          <option>All</option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Rabbit</option>
        </select>
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
          className="w-full p-3 border rounded-xl bg-white/60 focus:bg-white transition"
        >
          <option value="newest">Newest</option>
          <option value="age_asc">Age: Youngest</option>
          <option value="age_desc">Age: Oldest</option>
        </select>
      </div>

      {/* Pets Grid */}
      {filteredPets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-white/70 rounded-2xl border border-dashed">
          <div className="text-5xl mb-3">🐾</div>
          <p className="text-lg text-gray-700 font-medium">No pets match your filters.</p>
          <p className="text-sm text-gray-500 mt-1">Try clearing search or add a new pet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPets.map((pet) => (
          <div
            key={pet._id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-yellow-100 hover:border-yellow-200"
          >
            <div className="relative">
              <img
                src={pet.img}
                alt={pet.name}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow">
                  {pet.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs border border-amber-200">
                  {pet.type}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="inline-flex items-center gap-2">
                  <span>{Math.round(pet.ageMonths / 12)} yrs</span>
                  <div className="flex gap-2">
                    {pet.isVaccinated && <span title="Vaccinated">💉</span>}
                    {pet.isHealthy && <span title="Healthy">❤️</span>}
                    {pet.isPlayful && <span title="Playful">🎾</span>}
                  </div>
                </div>
                {pet.location && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                    <span>📍</span>
                    <span className="truncate max-w-[8rem]">{pet.location}</span>
                  </span>
                )}
              </div>

              {Array.isArray(pet.tags) && pet.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {pet.tags.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200"
                    >
                      #{t}
                    </span>
                  ))}
                  {pet.tags.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-50 text-gray-600 border">
                      +{pet.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(pet)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2 rounded-lg hover:from-yellow-600 hover:to-amber-600 transition-all"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-xl animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingPet ? "Edit Pet" : "Add New Pet"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
              </select>
              <input
                type="number"
                name="ageMonths"
                placeholder="Age in months"
                value={formData.ageMonths}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="img"
                placeholder="Image URL"
                value={formData.img}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
              <div className="flex gap-6 text-sm">
                <label>
                  <input
                    type="checkbox"
                    name="isVaccinated"
                    checked={formData.isVaccinated}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Vaccinated
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isHealthy"
                    checked={formData.isHealthy}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Healthy
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="isPlayful"
                    checked={formData.isPlayful}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Playful
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPet(null);
                  }}
                  className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  {editingPet ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDashboard;
