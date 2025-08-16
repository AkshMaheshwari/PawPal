import React from 'react';
import ValueCard from '../Components/ValueCard';
import TeamCard from '../Components/TeamCard';
import Adoption from '../Components/Adoption';
import { Heart, ShieldCheck, Star, Users } from 'lucide-react';

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
  {
    name: 'John Doe',
    role: 'Founder & Director',
    image: '/Boy1.png',
  },
  {
    name: 'Jane Smith',
    role: 'Veterinarian',
    image: '/Girl1.png',
  },
  {
    name: 'Emily Johnson',
    role: 'Volunteer Coordinator',
    image: '/Girl2.png',
  },
  {
    name: 'Michael Brown',
    role: 'Adoption Specialist',
    image: '/Boy2.png',
  },
];

const stories = [
  {
    image: '/Buddy.png',
    title: "Buddy finds his forever home",
    content: "Buddy, a rescued beagle, spent months at our shelter before being adopted by the Thompson family. He now enjoys a loving home with plenty of space to play and a family who adores him.",
  },
  {
    image: '/Simba.webp',
    title: "Simba's Second Chance",
    content: "Simba, a playful orange tabby, was found abandoned in a cardboard box. After receiving medical care and lots of love at our shelter, he was adopted by a family who fell in love with his charming personality."
  },
  {
    image: '/Rocky.png',
    title: "Rocky's Journey to Happiness",
    content: "Rocky, a formerly abused German Shepherd, was nursed back to health at our shelter. He was adopted by a retired couple who provide him with the love and care he deserves."
  },
  {
    image: '/Mittens.png',
    title: "Mittens new life",
    content: "Mittens, a shy calico cat, found her confidence and a loving home with a young professional who provides her with a quiet and comfortable environment."
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
    <div className="bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-extrabold text-yellow-600 tracking-tight">
            <a href="/">PawPal</a>
          </h1>
          <nav className="hidden md:flex space-x-6 text-base font-medium">
            <a href="/about" className="hover:text-yellow-600">About</a>
            <a href="/pets" className="hover:text-yellow-600">Pets</a>
            <a href="/contact" className="hover:text-yellow-600">Contact</a>
            <a href="/donate" className="hover:text-yellow-600">Donate</a>
            <a
              href="/auth/google"
              className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 font-semibold"
            >
              Get Started
            </a>
          </nav>
        </div>
      </header>

      {/* Mission Section */}
      <section className="p-8 md:p-16 bg-gray-50">
        <h1 className="text-4xl font-bold text-yellow-600 mb-2 text-center py-5">Our mission</h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed text-center mb-6">
          At <span className="font-semibold text-yellow-600">PawPal</span>, our mission is to provide a safe haven for abandoned, abused, and neglected animals. 
          We are dedicated to finding loving, permanent homes for every animal in our care, ensuring their well-being and happiness. 
          We believe in the power of compassion and the bond between humans and animals.
        </p>
        <img
          src="/About_Image.png"
          alt="About PawPal"
          className="w-full md:w-1/2 mx-auto rounded-3xl shadow-lg mt-8"
        />
      </section>

      {/* Values Section */}
      <section className="p-8 md:p-16 bg-white">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 leading-tight">
          Our Values
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed text-center mb-8">
          We are guided by a set of core values that shape our work and interactions with animals and the community.
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value, idx) => (
            <ValueCard
              key={idx}
              icon={value.icon}
              title={value.title}
              description={value.description}
            />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
            Meet Our Team
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-8">
            Our team is composed of passionate individuals dedicated to animal welfare. Each member brings unique skills and a shared commitment to our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
          {team.map((member, idx) => (
            <TeamCard key={idx} {...member} />
          ))}
        </div>
      </section>
      {/*Adoption Section*/ }
      <section className="py-16 bg-white">
        

        <div>
          <Adoption stories={stories} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center p-6 text-sm text-gray-500">
        <p>&copy; 2025 PawPal. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    
    </div>
  );
};

export default About;
