import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AdoptionRequest() {
  const { petId } = useParams();

  const storedUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);
  const token = localStorage.getItem("token") || "";

  const [pet, setPet] = useState(null);
  const [petLoading, setPetLoading] = useState(true);
  const [petError, setPetError] = useState("");

  const [formData, setFormData] = useState({
    fullName: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: "",
    address: "",
    experienceWithPets: "",
    reasonForAdoption: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadPet() {
      setPetLoading(true);
      setPetError("");
      try {
        const res = await fetch(`http://localhost:3000/api/pets/${petId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load pet");
        if (active) setPet(data);
      } catch (e) {
        if (active) setPetError(e.message || "Unable to load pet");
      } finally {
        if (active) setPetLoading(false);
      }
    }
    loadPet();
    return () => { active = false; };
  }, [petId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!storedUser || !storedUser._id || !token) {
      setMessage("Please login to submit an adoption request.");
      setIsError(true);
      return false;
    }
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setMessage("Full name and email are required.");
      setIsError(true);
      return false;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      setMessage("Please enter a valid phone number.");
      setIsError(true);
      return false;
    }
    if (!formData.address.trim()) {
      setMessage("Please provide your address.");
      setIsError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = { pet: petId, adopterDetails: formData };
      const res = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to submit request");
      setMessage("Your adoption request has been submitted successfully!");
      setIsError(false);
      setFormData({
        fullName: storedUser?.name || "",
        email: storedUser?.email || "",
        phone: "",
        address: "",
        experienceWithPets: "",
        reasonForAdoption: ""
      });
    } catch (err) {
      setMessage(err.message || "Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/user/home" className="text-emerald-700 hover:text-emerald-800 font-medium">← Back to Home</Link>
          <div className="text-sm text-gray-500">Secure adoption request</div>
        </div>

        {/* Header / Pet Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1 bg-white rounded-2xl shadow-lg overflow-hidden border border-emerald-100">
            <div className="p-4 border-b border-emerald-50">
              <h2 className="text-lg font-semibold text-gray-800">Pet Summary</h2>
            </div>
            <div className="p-4">
              {petLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="w-full h-40 bg-gray-200 rounded-xl"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ) : petError ? (
                <div className="text-red-600 text-sm">{petError}</div>
              ) : pet ? (
                <div>
                  {pet.img ? (
                    <img src={pet.img} alt={pet.name} className="w-full h-40 object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-40 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">No Image</div>
                  )}
                  <div className="mt-4">
                    <div className="text-xl font-bold text-gray-800">{pet.name}</div>
                    <div className="text-gray-600 text-sm mt-1">{pet.type} • {pet.ageMonths ? `${pet.ageMonths} months` : "Age N/A"}</div>
                    {pet.location && (
                      <div className="text-gray-500 text-sm mt-1">Location: {pet.location}</div>
                    )}
                    {Array.isArray(pet.tags) && pet.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {pet.tags.slice(0, 6).map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">Pet details unavailable.</div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100">
              <div className="p-6 border-b border-emerald-50">
                <h1 className="text-2xl font-bold text-emerald-800">Adoption Request Form</h1>
                <p className="text-gray-600 mt-1">Tell us a bit about yourself so the shelter can review your request.</p>
              </div>

              {message && (
                <div className={`mx-6 mt-4 p-3 rounded-xl text-sm font-medium ${isError ? "bg-red-50 text-red-700 border border-red-200" : "bg-emerald-50 text-emerald-800 border border-emerald-200"}`}>
                  {message}
                </div>
              )}

              {!storedUser || !token ? (
                <div className="mx-6 mt-4 mb-6 p-4 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-800">
                  You need to be logged in to submit a request. <Link to="/user/login" className="underline font-medium">Login</Link>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Experience with Pets</label>
                  <textarea
                    name="experienceWithPets"
                    value={formData.experienceWithPets}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Tell us about your experience caring for pets"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Reason for Adoption</label>
                  <textarea
                    name="reasonForAdoption"
                    value={formData.reasonForAdoption}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Why do you want to adopt this pet?"
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="md:col-span-2 flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">We respect your privacy and never share your information.</div>
                  <button
                    type="submit"
                    disabled={submitting || !storedUser || !token}
                    className="px-6 py-3 bg-emerald-600 text-white text-base font-semibold rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}