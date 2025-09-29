import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Adopt = () => {
  const { id } = useParams();   // ✅ get id from route (/user/adopt/:id)
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No pet id provided");
      setLoading(false);
      return;
    }

    const fetchPet = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/pets/${id}`);
        if (!res.ok) throw new Error("Failed to fetch pet details");
        const data = await res.json();
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading pet details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!pet) return <p className="text-center">No pet found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="relative">
          <img
            src={pet.img || "/placeholder.png"}
            alt={pet.name}
            className="w-full h-72 object-cover"
          />
          <span className="absolute bottom-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow">
            {pet.type}
          </span>
        </div>

        {/* Details */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800">{pet.name}</h2>
          <p className="text-gray-600 mt-1">{pet.breed || "Unknown breed"}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-semibold text-gray-800">{pet.ageMonths} months</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-semibold text-gray-800">{pet.location}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Health</p>
              <p className="font-semibold text-gray-800">
                {pet.isHealthy ? "Healthy" : "Checkup needed"}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Vaccination</p>
              <p className="font-semibold text-gray-800">
                {pet.isVaccinated ? "Vaccinated" : "Pending"}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {pet.isVaccinated && (
              <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                ✅ Vaccinated
              </span>
            )}
            {pet.isHealthy && (
              <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full">
                💙 Healthy
              </span>
            )}
            {pet.isPlayful && (
              <span className="bg-pink-100 text-pink-600 text-xs px-3 py-1 rounded-full">
                🎉 Playful
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg text-gray-800">About {pet.name}</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {pet.description || "No description available."}
            </p>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition "onClick={() => window.location.href = "/user/confirmation"}>
              Adopt {pet.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adopt;
