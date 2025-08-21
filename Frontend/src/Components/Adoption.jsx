import React from "react";

const Adoption = ({ stories }) => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <h1 className="text-5xl font-bold leading-tight mb-6 text-center">
            Adoption{' '}
            <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>

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
