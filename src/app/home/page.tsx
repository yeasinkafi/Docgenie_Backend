"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Calendar,
  Star,
  Heart,
  User,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BookingModal from "@/components/BookingModal";
// Mock data for featured doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 127,
    image: "/api/placeholder/300/300",
    availability: "Available today",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 95,
    image: "/api/placeholder/300/300",
    availability: "Available tomorrow",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 5.0,
    reviews: 143,
    image: "/api/placeholder/300/300",
    availability: "Available today",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    reviews: 89,
    image: "/api/placeholder/300/300",
    availability: "Available in 2 days",
  },
];

// Feature cards data
const features = [
  {
    title: "Find the Right Doctor",
    description:
      "Search from our network of qualified healthcare professionals based on specialty, location, and availability.",
    icon: <Search className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Book Appointments Easily",
    description:
      "Schedule appointments online in just a few clicks, with instant confirmation and reminders.",
    icon: <Calendar className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Verified Reviews",
    description:
      "Read authentic patient reviews and ratings before choosing your healthcare provider.",
    icon: <Star className="h-6 w-6 text-blue-500" />,
  },
  {
    title: "Secure Medical Records",
    description:
      "Your medical information is protected with best-in-class security and encryption protocols.",
    icon: <Shield className="h-6 w-6 text-blue-500" />,
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Amena Begum",
    text: "MediBook made finding a specialist and booking an appointment so simple. I was able to see a doctor within 24 hours!",
    avatar: "/api/placeholder/60/60",
  },
  {
    name: "Ayesha Begum",
    text: "The ability to read verified reviews helped me find an amazing pediatrician for my children. Highly recommend this service!",
    avatar: "/api/placeholder/60/60",
  },
  {
    name: "Sana Begum",
    text: "I love the reminder system and the ease of rescheduling when needed. This platform has transformed how I manage healthcare.",
    avatar: "/api/placeholder/60/60",
  },
];

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  availability: string;
};

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <Heart className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors duration-300" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{doctor.name}</h3>
        <p className="text-gray-600 text-sm">{doctor.specialty}</p>
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium">{doctor.rating}</span>
          <span className="ml-1 text-sm text-gray-500">
            ({doctor.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center mt-2 text-sm text-green-600">
          <Clock className="h-4 w-4 mr-1" />
          {doctor.availability}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300"
        >
          Book Appointment
        </button>
      </div>
      <BookingModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
      />
    </div>
  );
};

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const FeatureCard = ({ feature }: { feature: Feature }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full mb-4 transition-transform duration-300 hover:rotate-6">
        {feature.icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-gray-600 text-sm">{feature.description}</p>
    </div>
  );
};

type Testimonial = {
  name: string;
  text: string;
  avatar: string;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.01]">
      <div className="flex items-center mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <h4 className="font-medium">{testimonial.name}</h4>
      </div>
      <p className="text-gray-600 italic text-sm">"{testimonial.text}"</p>
      <div className="flex mt-3">
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
        <Star className="h-4 w-4 text-yellow-400 fill-current" />
      </div>
    </div>
  );
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your Health, Our Priority
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Find and book appointments with top-rated doctors in your area.
                No waiting, no hassle.
              </p>

              {/* Search Bar */}
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                  <div className="flex-1 relative">
                    <select
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                    >
                      <option value="">Select Specialty</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="dermatology">Dermatology</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="neurology">Neurology</option>
                    </select>
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>

                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Enter your location"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-md text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-300 md:w-auto w-full">
                    Search Doctors
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Doctors */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Top-Rated Doctors
            </h2>
            <Link
              href="/doctors"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All
              <svg
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our streamlined process makes finding and booking healthcare
                appointments simpler than ever.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Statistics/Trust Indicators */}
        <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-12 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2">5000+</div>
                <div className="text-blue-100 font-medium">
                  Verified Doctors
                </div>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2">150k+</div>
                <div className="text-blue-100 font-medium">
                  Satisfied Patients
                </div>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-blue-100 font-medium">Specialties</div>
              </div>
              <div className="p-6 rounded-lg bg-white/10 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-blue-100 font-medium">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              What Our Patients Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from patients who have used our platform to find their
              healthcare providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to prioritize your health?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of patients who have found their perfect healthcare
              match.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/doctors">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Find a Doctor Now
                </button>
              </Link>
              <button className="bg-transparent hover:bg-white hover:text-gray-900 text-white px-8 py-3 rounded-md border-2 border-white font-medium text-lg transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
