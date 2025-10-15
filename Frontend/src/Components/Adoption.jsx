/* eslint-disable no-unused-vars */
// src/Components/Adoption.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const StoryCard = ({ image, title, content }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.25)" }}
            // Styling: Use the same background/shadow logic as the main forms/cards
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-yellow-100/50 transition-all duration-500 flex flex-col"
        >
            <div className="h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                {/* Title Styling: Highlighted by text gradient */}
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-3 flex-shrink-0">
                    {title}
                </h3>
                <p className="text-gray-600 flex-grow">
                    {content}
                </p>
                <div className="mt-4 pt-4 border-t border-yellow-100 flex-shrink-0">
                    <span className="inline-flex items-center text-sm font-semibold text-yellow-600">
                        <Heart className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        Happy Ending
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const Adoption = ({ stories }) => {
    return (
        <div>
            {/* Header matches the main page headers */}
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold leading-tight mb-6">
                    Success {' '}
                    <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                        Stories
                    </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    The heart of our work: seeing these beautiful animals find their forever homes.
                </p>
            </div>

            {/* Grid layout for stories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {stories.map((story, index) => (
                    <StoryCard key={index} {...story} />
                ))}
            </div>
        </div>
    );
};

export default Adoption;