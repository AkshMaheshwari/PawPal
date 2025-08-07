import React from 'react';
import ValueCard from '../Components/ValueCard';
import TeamCard from '../Components/TeamCard';
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
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-900 leading-tight">
          Our Mission
        </h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
          {team.map((member, idx) => (
            <TeamCard key={idx} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
