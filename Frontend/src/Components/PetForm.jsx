import { useState } from "react";

export default function PetForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    ageMonths: "",
    type: "Dog",
    location: "Mumbai",
    img: "",
    rating: 0,
    isVaccinated: false,
    isHealthy: true,
    isPlayful: false,
    tags: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const petData = {
      ...form,
      ageMonths: Number(form.ageMonths),
      rating: Number(form.rating),
      tags: form.tags.split(",").map((tag) => tag.trim())
    };
    onSubmit(petData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold mb-2">Add a New Pet</h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Pet Name"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Age */}
      <input
        type="number"
        name="ageMonths"
        placeholder="Age in Months"
        value={form.ageMonths}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Type */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Dog</option>
        <option>Cat</option>
        <option>Rabbit</option>
      </select>

      {/* Location */}
      <select
        name="location"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Mumbai</option>
        <option>Pune</option>
      </select>

      {/* Image URL */}
      <input
        type="url"
        name="img"
        placeholder="Image URL"
        value={form.img}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      {/* Rating */}
      <input
        type="number"
        name="rating"
        placeholder="Rating (0-5)"
        value={form.rating}
        onChange={handleChange}
        min="0"
        max="5"
        step="0.1"
        className="w-full p-2 border rounded"
      />

      {/* Checkboxes */}
      <div className="flex items-center space-x-4">
        <label>
          <input
            type="checkbox"
            name="isVaccinated"
            checked={form.isVaccinated}
            onChange={handleChange}
            className="mr-2"
          />
          Vaccinated
        </label>
        <label>
          <input
            type="checkbox"
            name="isHealthy"
            checked={form.isHealthy}
            onChange={handleChange}
            className="mr-2"
          />
          Healthy
        </label>
        <label>
          <input
            type="checkbox"
            name="isPlayful"
            checked={form.isPlayful}
            onChange={handleChange}
            className="mr-2"
          />
          Playful
        </label>
      </div>

      {/* Tags */}
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Pet
      </button>
    </form>
  );
}
