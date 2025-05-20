"use client";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BarChart,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Activity,
} from "lucide-react";

const DoctorDashboardPage = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "248",
      icon: Users,
      trend: "+12.5%",
      description: "From last month",
    },
    {
      title: "Appointments Today",
      value: "8",
      icon: CalendarIcon,
      trend: "+4.5%",
      description: "From yesterday",
    },
    {
      title: "Average Wait Time",
      value: "14min",
      icon: Clock,
      trend: "-2.3%",
      description: "From last week",
    },
    {
      title: "Patient Satisfaction",
      value: "94%",
      icon: Activity,
      trend: "+1.2%",
      description: "From last month",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Alice Smith",
      time: "10:00 AM",
      date: "Today",
      type: "Check-up",
      status: "Confirmed",
      avatar: "/avatars/alice.jpg",
    },
    {
      id: 2,
      patient: "Bob Johnson",
      time: "11:30 AM",
      date: "Today",
      type: "Follow-up",
      status: "Confirmed",
      avatar: "/avatars/bob.jpg",
    },
    {
      id: 3,
      patient: "Charlie Brown",
      time: "2:00 PM",
      date: "Today",
      type: "Consultation",
      status: "Pending",
      avatar: "/avatars/charlie.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/doctor.jpg" alt="Dr. John Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">Dr. John Doe</h2>
              <p className="text-sm text-gray-500">General Practitioner</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">Settings</Button>
            <Button>View Schedule</Button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <div className="grid gap-6">
          {/* Stats Section */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-gray-500">
                      <span className="text-green-500">{stat.trend}</span>{" "}
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-7">
            {/* Appointments Table */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  You have {upcomingAppointments.length} appointments scheduled
                  for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={appointment.avatar}
                              alt={appointment.patient}
                            />
                            <AvatarFallback>
                              {appointment.patient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {appointment.patient}
                        </TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              appointment.status === "Confirmed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Calendar Card */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Schedule overview</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboardPage;
