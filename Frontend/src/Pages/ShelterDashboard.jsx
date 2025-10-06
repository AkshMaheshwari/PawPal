import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit, FaInbox, FaCheckCircle, FaTimesCircle, FaClock, FaPaw, FaChartBar } from "react-icons/fa";

const ShelterDashboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pets");
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

  const [requests, setRequests] = useState([]);
  const [reqLoading, setReqLoading] = useState(false);
  const [reqError, setReqError] = useState("");

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

  useEffect(() => {
    if (activeTab !== "requests") return;
    const token = localStorage.getItem("token") || "";
    const headers = token ? { "Authorization": `Bearer ${token}` } : {};
    async function loadRequests() {
      setReqLoading(true);
      setReqError("");
      try {
        const res = await fetch("http://localhost:3000/api/requests", { headers });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load requests");
        setRequests(Array.isArray(data) ? data : (data.data || []));
      } catch (e) {
        setReqError(e.message || "Unable to load requests");
      } finally {
        setReqLoading(false);
      }
    }
    loadRequests();
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this pet?")) return;
    try {
      await fetch(`http://localhost:3000/api/pets/${id}`, { method: "DELETE" });
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      ...pet,
      tags: pet.tags ? pet.tags.join(", ") : ""
    });
    setShowForm(true);
  };

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

  if (loading && activeTab === "pets") return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading pets...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-2">
                Shelter <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Dashboard</span>
              </h1>
              <p className="text-gray-600 text-sm">Manage your shelter pets and adoption requests</p>
            </div>
            {activeTab === "pets" && (
              <button
                onClick={() => {
                  setEditingPet(null);
                  setShowForm(true);
                }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold"
              >
                <FaPlus className="text-lg" /> Add New Pet
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="inline-flex bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden p-1">
            {[
              { key: "pets", label: "Pets", icon: <FaPaw /> },
              { key: "requests", label: "Requests", icon: <FaInbox /> },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all ${
                  activeTab === t.key 
                    ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-md" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Analytics */}
        {activeTab === "pets" && (
          <div className="mb-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "Total Pets", value: total, icon: "🐾", color: "from-blue-500 to-blue-600" },
                { label: "Dogs", value: countByType.dog, icon: "🐕", color: "from-amber-500 to-orange-600" },
                { label: "Cats", value: countByType.cat, icon: "🐈", color: "from-yellow-500 to-amber-600" },
                { label: "Others", value: countByType.other, icon: "🐰", color: "from-orange-500 to-red-600" },
                { label: "Avg Age", value: `${Math.round(avgAgeMonths / 12)} yrs`, icon: "📅", color: "from-purple-500 to-pink-600" },
                { label: "Locations", value: uniqueLocations, icon: "📍", color: "from-green-500 to-emerald-600" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-100 group cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-all`}></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-1 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Type Distribution */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                    <FaChartBar className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Type Distribution</h3>
                    <p className="text-xs text-gray-500">Pet categories breakdown</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Dogs", value: countByType.dog, color: "from-amber-400 to-orange-500", icon: "🐕" },
                    { label: "Cats", value: countByType.cat, color: "from-yellow-400 to-amber-500", icon: "🐈" },
                    { label: "Others", value: countByType.other, color: "from-orange-400 to-red-500", icon: "🐰" }
                  ].map(({ label, value, color, icon }) => {
                    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                    return (
                      <div key={label}>
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="flex items-center gap-2 font-medium text-gray-700">
                            <span className="text-lg">{icon}</span>
                            {label}
                          </span>
                          <span className="font-bold text-gray-900">{value} <span className="text-gray-500 font-normal">({pct}%)</span></span>
                        </div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 shadow-sm`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Health Indicators */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg">
                    ❤️
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Wellness Snapshot</h3>
                    <p className="text-xs text-gray-500">Health status overview</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Vaccinated", value: vaccinated, icon: "💉", color: "from-emerald-400 to-green-600" },
                    { label: "Healthy", value: healthy, icon: "❤️", color: "from-green-400 to-emerald-600" },
                    { label: "Playful", value: playful, icon: "🎾", color: "from-teal-400 to-cyan-600" }
                  ].map(({ label, value, icon, color }) => {
                    const pct = total > 0 ? Math.round((value / total) * 100) : 0;
                    return (
                      <div key={label}>
                        <div className="flex justify-between items-center text-sm mb-2">
                          <span className="flex items-center gap-2 font-medium text-gray-700">
                            <span className="text-lg">{icon}</span>
                            {label}
                          </span>
                          <span className="font-bold text-gray-900">{value} <span className="text-gray-500 font-normal">({pct}%)</span></span>
                        </div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 shadow-sm`}
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
        )}

        {/* Filters */}
        {activeTab === "pets" && (
          <div className="mb-8 grid md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, location, or tag…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 border-2 border-gray-200 rounded-xl bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none font-medium"
            >
              <option>All</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
            </select>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="age_asc">Age: Youngest</option>
              <option value="age_desc">Age: Oldest</option>
            </select>
          </div>
        )}

        {/* Pets Grid */}
        {activeTab === "pets" && (filteredPets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/60 rounded-3xl border-2 border-dashed border-gray-300">
            <div className="text-7xl mb-4">🐾</div>
            <p className="text-xl text-gray-700 font-semibold mb-2">No pets found</p>
            <p className="text-sm text-gray-500">Try adjusting your filters or add a new pet</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPets.map((pet) => (
              <div
                key={pet._id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pet.img}
                    alt={pet.name}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                      {pet.name}
                    </h3>
                    <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold border border-white/50 shadow-lg">
                      {pet.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-800">{Math.round(pet.ageMonths / 12)} yrs</span>
                      <div className="flex gap-1.5">
                        {pet.isVaccinated && <span title="Vaccinated" className="text-lg">💉</span>}
                        {pet.isHealthy && <span title="Healthy" className="text-lg">❤️</span>}
                        {pet.isPlayful && <span title="Playful" className="text-lg">🎾</span>}
                      </div>
                    </div>
                    {pet.location && (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-medium text-xs">
                        📍 {pet.location}
                      </span>
                    )}
                  </div>

                  {Array.isArray(pet.tags) && pet.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {pet.tags.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-700 border border-amber-200 font-medium"
                        >
                          #{t}
                        </span>
                      ))}
                      {pet.tags.length > 3 && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 font-medium">
                          +{pet.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(pet)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-3 rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Requests List */}
        {activeTab === "requests" && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                  <FaInbox className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Adoption Requests</h2>
                  <p className="text-sm text-gray-500">Review and manage applications</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab("pets");
                  setTimeout(() => setActiveTab("requests"), 10);
                }}
                className="px-4 py-2 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all font-medium text-sm"
              >
                Refresh
              </button>
            </div>

            {reqLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-gray-600">Loading requests...</p>
              </div>
            ) : reqError ? (
              <div className="p-12 text-center">
                <div className="text-5xl mb-4">⚠️</div>
                <p className="text-red-600 font-medium">{reqError}</p>
              </div>
            ) : requests.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-600 font-medium text-lg">No requests yet</p>
                <p className="text-sm text-gray-500 mt-2">Applications will appear here when users submit them</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {requests.map((r) => {
                  const status = (r.status || "pending").toLowerCase();
                  const statusConfig = status === "approved"
                    ? { box: "bg-emerald-50 border-l-emerald-500", pill: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: <FaCheckCircle className="text-emerald-600" /> }
                    : status === "rejected"
                    ? { box: "bg-rose-50 border-l-rose-500", pill: "bg-rose-100 text-rose-800 border-rose-300", icon: <FaTimesCircle className="text-rose-600" /> }
                    : { box: "bg-amber-50 border-l-amber-500", pill: "bg-amber-100 text-amber-800 border-amber-300", icon: <FaClock className="text-amber-600" /> };

                  return (
                    <div key={r._id} className={`p-6 border-l-4 ${statusConfig.box} hover:bg-opacity-80 transition-all`}>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            {statusConfig.icon}
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.pill} uppercase tracking-wide`}>
                              {status}
                            </span>
                          </div>
                          <div className="text-gray-900 font-bold text-lg mb-2">
                            {r.pet?.name ? `Adoption request for ${r.pet.name}` : "Adoption request"}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Applicant:</span>
                              <span>{r.adopterDetails?.fullName || "Unknown"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Contact:</span>
                              <span>{r.adopterDetails?.email || "N/A"} • {r.adopterDetails?.phone || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 font-medium">
                          {new Date(r.createdAt || r.updatedAt || Date.now()).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-yellow-500 p-6 rounded-t-3xl">
                <h2 className="text-3xl font-bold text-white">
                  {editingPet ? "Edit Pet" : "Add New Pet"}
                </h2>
                <p className="text-amber-50 text-sm mt-1">Fill in the details below</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Pet Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Buddy"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none font-medium"
                    >
                      <option value="Dog">Dog 🐕</option>
                      <option value="Cat">Cat 🐈</option>
                      <option value="Rabbit">Rabbit 🐰</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Age (months)</label>
                    <input
                      type="number"
                      name="ageMonths"
                      placeholder="e.g. 12"
                      value={formData.ageMonths}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Mumbai"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    name="img"
                    placeholder="https://example.com/image.jpg"
                    value={formData.img}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    name="tags"
                    placeholder="e.g. friendly, playful, trained"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all outline-none"
                  />
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-700 mb-4">Health & Behavior</p>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="isVaccinated"
                        checked={formData.isVaccinated}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-amber-500 focus:ring-4 focus:ring-amber-100 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">💉 Vaccinated</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="isHealthy"
                        checked={formData.isHealthy}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-amber-500 focus:ring-4 focus:ring-amber-100 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">❤️ Healthy</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="isPlayful"
                        checked={formData.isPlayful}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-amber-500 focus:ring-4 focus:ring-amber-100 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-amber-600 transition-colors">🎾 Playful</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPet(null);
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {editingPet ? "Update Pet" : "Create Pet"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShelterDashboard;