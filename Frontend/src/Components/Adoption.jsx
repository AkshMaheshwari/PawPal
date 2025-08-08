import React from "react";

const Adoption = ({ stories }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
          Adoption Stories
        </h2>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              {/* Image */}
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {story.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 flex-grow">{story.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Adoption;
