import React from "react";

export default function PatientDashboard() {
  return (
    <main className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, John Doe</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button className="flex items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <div className="text-center">
            <div className="text-blue-600 font-semibold">Book Appointment</div>
            <div className="text-sm text-gray-600">Schedule a new visit</div>
          </div>
        </button>
        <button className="flex items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <div className="text-center">
            <div className="text-green-600 font-semibold">
              View Test Results
            </div>
            <div className="text-sm text-gray-600">
              Check your latest results
            </div>
          </div>
        </button>
        <button className="flex items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
          <div className="text-center">
            <div className="text-purple-600 font-semibold">Message Doctor</div>
            <div className="text-sm text-gray-600">Contact your physician</div>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <section className="col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Upcoming Appointments
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <div className="w-8 h-8 flex items-center justify-center text-blue-600 font-semibold">
                        {index + 10}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Dr. Jane Smith</div>
                      <div className="text-sm text-gray-600">
                        General Checkup
                      </div>
                      <div className="text-sm text-gray-500">
                        Dec {index + 10}, 2023 • 10:00 AM
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Join Video
                    </button>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Summary */}
        <section className="col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Summary
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-gray-500">Full Name</div>
                <div className="font-medium">John Doe</div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-gray-500">Date of Birth</div>
                <div className="font-medium">January 15, 1985</div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-gray-500">Primary Doctor</div>
                <div className="font-medium">Dr. Jane Smith</div>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="text-sm text-gray-500">Next Appointment</div>
                <div className="font-medium">Dec 10, 2023</div>
              </div>
              <div className="pt-4 mt-4 border-t">
                <button className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
