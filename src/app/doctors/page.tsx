"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  Heart,
  ArrowRight,
  ChevronDown,
  Phone,
  Loader2,
  User,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Dynamically import heavy components
const BookingModal = dynamic(() => import("@/components/BookingModal"), {
  loading: () => <div className="animate-pulse">Loading...</div>,
  ssr: false,
});

// Mock category data
const categories = [
  { id: 1, name: "Cardiology", count: 24, icon: "/cardiology.png" },
  { id: 2, name: "Dermatology", count: 18, icon: "/dermatology.png" },
  { id: 3, name: "Pediatrics", count: 32, icon: "/pediatric.png" },
  { id: 4, name: "Orthopedics", count: 15, icon: "/arthritis.png" },
  { id: 5, name: "Neurology", count: 12, icon: "/neurology.png" },
  { id: 6, name: "Gynecology", count: 20, icon: "/gynecology.png" },
  {
    id: 7,
    name: "Ophthalmology",
    count: 14,
    icon: "/ophthalmology.png",
  },
  { id: 8, name: "Dentistry", count: 28, icon: "/dentistry.png" },
];

// Mock doctors data with categories
const allDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    categoryId: 1,
    rating: 4.9,
    reviews: 127,
    image: "/api/placeholder/300/300",
    availability: "Available today",
    hospital: "City Medical Center",
    experience: "12 years",
    featured: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    categoryId: 2,
    rating: 4.8,
    reviews: 95,
    image: "/api/placeholder/300/300",
    availability: "Available tomorrow",
    hospital: "Skin Health Institute",
    experience: "8 years",
    featured: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    categoryId: 3,
    rating: 5.0,
    reviews: 143,
    image: "/api/placeholder/300/300",
    availability: "Available today",
    hospital: "Children's Hospital",
    experience: "15 years",
    featured: true,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    categoryId: 4,
    rating: 4.7,
    reviews: 89,
    image: "/api/placeholder/300/300",
    availability: "Available in 2 days",
    hospital: "Joint & Spine Center",
    experience: "10 years",
    featured: false,
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    specialty: "Neurology",
    categoryId: 5,
    rating: 4.9,
    reviews: 112,
    image: "/api/placeholder/300/300",
    availability: "Available today",
    hospital: "Brain & Nerve Institute",
    experience: "14 years",
    featured: false,
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Cardiology",
    categoryId: 1,
    rating: 4.8,
    reviews: 78,
    image: "/api/placeholder/300/300",
    availability: "Available tomorrow",
    hospital: "Heart Center",
    experience: "9 years",
    featured: false,
  },
  {
    id: 7,
    name: "Dr. Amanda Torres",
    specialty: "Dermatology",
    categoryId: 2,
    rating: 4.7,
    reviews: 64,
    image: "/api/placeholder/300/300",
    availability: "Available in 3 days",
    hospital: "Derma Care Clinic",
    experience: "7 years",
    featured: false,
  },
  {
    id: 8,
    name: "Dr. David Williams",
    specialty: "Pediatrics",
    categoryId: 3,
    rating: 4.9,
    reviews: 105,
    image: "/api/placeholder/300/300",
    availability: "Available today",
    hospital: "Kids Health Center",
    experience: "11 years",
    featured: false,
  },
];

// Doctor type definition
interface Doctor {
  id: number;
  name: string;
  specialty: string;
  categoryId: number;
  rating: number;
  reviews: number;
  image: string;
  availability: string;
  hospital: string;
  experience: string;
  featured: boolean;
}

// Category type definition
interface Category {
  id: number;
  name: string;
  count: number;
  icon: string;
}

// Loading skeleton for doctor card
const DoctorCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="h-48 bg-gray-200 animate-pulse" />
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-12 bg-gray-200 rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-48 bg-gray-200 rounded" />
        <div className="h-4 w-36 bg-gray-200 rounded" />
      </div>
      <div className="mt-4">
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
      <div className="mt-5 flex gap-3">
        <div className="flex-1 h-10 bg-gray-200 rounded-md" />
        <div className="flex-1 h-10 bg-gray-200 rounded-md" />
      </div>
    </div>
  </div>
);

// Loading skeleton for category card
const CategoryCardSkeleton = () => (
  <div className="flex items-center p-4 rounded-lg bg-white">
    <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4 animate-pulse" />
    <div>
      <div className="h-5 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
    </div>
  </div>
);

// Doctor card component
const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <div
            className={`w-full h-48 bg-gray-100 ${
              !isImageLoaded ? "animate-pulse" : ""
            }`}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className={`w-full h-48 object-cover transition-opacity duration-300 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
          {doctor.featured && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-blue-600 font-medium px-3 py-1.5 rounded-full text-xs">
              Featured
            </div>
          )}
          <button
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:scale-105 transition-all"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`h-5 w-5 transition-colors duration-200 ${
                isFavorite ? "text-red-500 fill-current" : "text-gray-600"
              }`}
            />
          </button>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm">
                {doctor.specialty}
              </p>
            </div>
            <div className="flex items-center bg-gray-50 px-2.5 py-1.5 rounded-lg">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1.5 text-sm font-semibold text-gray-900">
                {doctor.rating}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2.5 text-gray-400" />
              <span>{doctor.hospital}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2.5 text-gray-400" />
              <span>{doctor.experience}</span>
            </div>
          </div>

          <div className="flex items-center mt-4 text-sm font-medium text-green-600">
            <Clock className="h-4 w-4 mr-2" />
            {doctor.availability}
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300"
            >
              Book Now
            </button>
            <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-300">
              View Profile
            </button>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={isBookingModalOpen}
        onCloseAction={handleCloseBooking}
      />
    </>
  );
};

// Category card component
const CategoryCard = ({
  category,
  isActive,
  onClick,
}: {
  category: Category;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-102 ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
          : "bg-white hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <img
        src={category.icon}
        alt={category.name}
        className={`w-12 h-12 rounded-lg object-cover mr-4 ${
          isActive ? "border-2 border-white/30" : "border border-gray-200"
        }`}
      />
      <div>
        <h3 className="font-medium mb-0.5">{category.name}</h3>
        <p className={isActive ? "text-blue-100" : "text-gray-500"}>
          {category.count} doctors
        </p>
      </div>
    </div>
  );
};

export default function DoctorCategories() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [displayedDoctors, setDisplayedDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter doctors based on selected category and search query
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...allDoctors];

      if (selectedCategory !== null) {
        filtered = filtered.filter(
          (doctor) => doctor.categoryId === selectedCategory
        );
      }

      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query) ||
            doctor.hospital.toLowerCase().includes(query)
        );
      }

      // Apply sorting
      switch (sortOption) {
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "experience":
          filtered.sort(
            (a, b) => parseInt(b.experience) - parseInt(a.experience)
          );
          break;
        case "availability":
          filtered.sort((a, b) => (a.availability.includes("today") ? -1 : 1));
          break;
        default:
          filtered.sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return b.rating - a.rating;
          });
      }

      setDisplayedDoctors(filtered);
      setIsLoading(false);
    }, 500); // Add a small delay to show loading state

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Find Your Perfect Doctor
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Browse through our extensive list of qualified healthcare
                professionals by specialty
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
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
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

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Categories Sidebar */}
            <div className="lg:w-1/4 w-full">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Medical Specialties
                </h2>
                <div className="space-y-3">
                  {isLoading ? (
                    <>
                      <CategoryCardSkeleton />
                      <CategoryCardSkeleton />
                      <CategoryCardSkeleton />
                      <CategoryCardSkeleton />
                    </>
                  ) : (
                    <>
                      <CategoryCard
                        category={{
                          id: 0,
                          name: "All Specialties",
                          count: allDoctors.length,
                          icon: "/med.png",
                        }}
                        isActive={selectedCategory === null}
                        onClick={() => setSelectedCategory(null)}
                      />
                      {categories.map((category) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          isActive={selectedCategory === category.id}
                          onClick={() => setSelectedCategory(category.id)}
                        />
                      ))}
                    </>
                  )}
                </div>

                <div className="mt-10 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Need Help?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our support team is here to assist you in finding the right
                    doctor for your needs.
                  </p>
                  <button className="w-full bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="lg:w-3/4 w-full">
              <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === null
                      ? "All Doctors"
                      : categories.find((c) => c.id === selectedCategory)
                          ?.name || "Doctors"}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        Loading...
                      </span>
                    ) : (
                      `Showing ${displayedDoctors.length} doctors`
                    )}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative min-w-[180px]">
                    <select
                      className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="rating">Highest Rated</option>
                      <option value="experience">Most Experienced</option>
                      <option value="availability">Soonest Available</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>

                  <button
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </button>
                </div>
              </div>

              {showFilters && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-slide-up">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Availability
                      </label>
                      <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Any time</option>
                        <option>Today</option>
                        <option>Tomorrow</option>
                        <option>This week</option>
                        <option>Next week</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience
                      </label>
                      <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Any experience</option>
                        <option>Less than 5 years</option>
                        <option>5-10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Any gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DoctorCardSkeleton />
                  <DoctorCardSkeleton />
                  <DoctorCardSkeleton />
                  <DoctorCardSkeleton />
                </div>
              ) : displayedDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayedDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <Search className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No doctors found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any doctors matching your criteria. Try
                    adjusting your search or filters.
                  </p>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                      setSortOption("recommended");
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {displayedDoctors.length > 0 && !isLoading && (
                <div className="mt-12 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <ArrowRight className="h-5 w-5 mr-2 rotate-180" />
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      3
                    </button>
                    <span className="text-gray-500">...</span>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      10
                    </button>
                    <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Next
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Statistics Section */}
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

        {/* Newsletter Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-24">
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -left-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-12 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="max-w-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Get Expert Health Tips Delivered to Your Inbox
                </h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  Join our community of health-conscious individuals. Receive
                  weekly insights from top medical professionals, exclusive
                  wellness content, and early access to special medical
                  services.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-blue-100">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Weekly health tips from expert doctors
                  </div>
                  <div className="flex items-center text-blue-100">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Exclusive access to medical resources
                  </div>
                  <div className="flex items-center text-blue-100">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Priority booking for appointments
                  </div>
                </div>
              </div>

              {/* Right Content - Subscribe Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-10">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Subscribe Now
                </h3>
                <p className="text-blue-100 mb-6">
                  Join over 25,000+ health-conscious subscribers
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="full-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full-name"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    />
                  </div>
                  <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/20">
                    Subscribe to Newsletter
                  </button>
                </form>
                <p className="text-sm text-blue-100 mt-4 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
