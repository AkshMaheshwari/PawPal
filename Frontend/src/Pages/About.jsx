import React from 'react';
import ValueCard from '../Components/ValueCard';
import TeamCard from '../Components/TeamCard';
import Adoption from '../Components/Adoption';
import { Heart, ShieldCheck, Star, Users } from 'lucide-react';
import { FaPaw } from 'react-icons/fa';

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description:
      'We treat every animal with kindness, respect, and empathy, ensuring their physical and emotional needs are met.',
  },
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description:
      'We are committed to transparency in our operations, from animal care to financial management, building trust with our supporters.',
  },
  {
    icon: Star,
    title: 'Excellence',
    description:
      'We strive for excellence in all aspects of our work, from animal care and adoption processes to community outreach and education.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description:
      'We believe in the power of collaboration, working with volunteers, partners, and the community to achieve our mission.',
  },
];

const team = [
  { name: 'John Doe', role: 'Founder & Director', image: '/Boy1.png' },
  { name: 'Jane Smith', role: 'Veterinarian', image: '/Girl1.png' },
  { name: 'Emily Johnson', role: 'Volunteer Coordinator', image: '/Girl2.png' },
  { name: 'Michael Brown', role: 'Adoption Specialist', image: '/Boy2.png' },
];

const stories = [
  {
    image: '/Buddy.png',
    title: "Buddy finds his forever home",
    content:
      "Buddy, a rescued beagle, spent months at our shelter before being adopted by the Thompson family. He now enjoys a loving home with plenty of space to play and a family who adores him.",
  },
  {
    image: '/Simba.webp',
    title: "Simba's Second Chance",
    content:
      "Simba, a playful orange tabby, was found abandoned in a cardboard box. After receiving medical care and lots of love at our shelter, he was adopted by a family who fell in love with his charming personality.",
  },
  {
    image: '/Rocky.png',
    title: "Rocky's Journey to Happiness",
    content:
      "Rocky, a formerly abused German Shepherd, was nursed back to health at our shelter. He was adopted by a retired couple who provide him with the love and care he deserves.",
  },
  {
    image: '/Mittens.png',
    title: "Mittens new life",
    content:
      "Mittens, a shy calico cat, found her confidence and a loving home with a young professional who provides her with a quiet and comfortable environment.",
  },
  {
    image: '/Luna.webp',
    title: "Luna's Leap of Faith",
    content:
      "Luna, a timid grey kitten, was rescued from the streets during a heavy rainstorm. After weeks of gentle care, she warmed up to humans and found her forever family with a kind couple who adore her playful spirit.",
  },
  {
    image: '/Max.webp',
    title: "Max's Tail of Triumph",
    content:
      "Max, a senior Golden Retriever, was surrendered due to his age. Despite this, his gentle nature won over a loving family who now give him the golden years he truly deserves.",
  },
];

const About = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 via-white to-amber-50 text-gray-800 font-sans min-h-screen">
      {/* Navbar with Glass Effect */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-yellow-100/50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaPaw className="text-white text-lg" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
              PawPal
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="/about" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="/pets" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              Pets
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="/contact" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="/donate" className="text-gray-600 hover:text-yellow-600 transition-all duration-300 relative group">
              Donate
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a
              href="/signup"
              className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2.5 rounded-full hover:from-yellow-600 hover:to-amber-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Mission Section */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-yellow-700 px-4 py-2 rounded-full text-sm font-medium shadow-md mb-6">
            Our Mission
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Giving Every Animal a{' '}
            <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Chance at Life
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At <span className="font-semibold text-yellow-600">PawPal</span>, our mission is to provide a safe haven for abandoned, abused, and neglected animals. We are dedicated to finding loving, permanent homes for every animal in our care, ensuring their well-being and happiness.
          </p>
          <img
            src="/About_Image.png"
            alt="About PawPal"
            className="w-full md:w-1/2 mx-auto rounded-3xl shadow-2xl mt-12 transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-yellow-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Guided by principles that shape our work and our bond with animals and the community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, idx) => (
              <ValueCard key={idx} icon={value.icon} title={value.title} description={value.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our <span className="text-yellow-600">Team</span></h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Passionate individuals working together for the welfare of animals.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Stories */}
      <section className="py-20 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div className="container mx-auto px-6">
          <Adoption stories={stories} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
              <FaPaw className="text-white text-lg" />
            </div>
            <h3 className="text-2xl font-bold text-yellow-500">PawPal</h3>
          </div>
          <p className="text-gray-400 leading-relaxed max-w-lg">
            Dedicated to giving every pet a chance to find their forever home. Together, we create a compassionate world.
          </p>
          <div className="mt-8 border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400">&copy; 2025 PawPal. All rights reserved. Made with ❤️ for animals in need.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
