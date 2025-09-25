import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const ShelterDashboard = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

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
      : "http://localhost:3000/api/pets";

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

  if (loading) return <p className="text-center mt-10">Loading pets...</p>;

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 via-white to-amber-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
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

      {/* Pets Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={pet.img}
              alt={pet.name}
              className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800">
                {pet.name}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{pet.type}</p>
              <p className="text-gray-500 text-sm">
                {Math.round(pet.ageMonths / 12)} yrs
              </p>

              <div className="mt-2 flex gap-2 text-sm">
                {pet.isVaccinated && <span title="Vaccinated">💉</span>}
                {pet.isHealthy && <span title="Healthy">❤️</span>}
                {pet.isPlayful && <span title="Playful">🎾</span>}
              </div>

              <div className="mt-5 flex gap-3">
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
