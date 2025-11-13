import React from "react";

export default function Home() {
  const user = { name: "Sai" }; // temporary mock user data

  const myCourses = [
    { title: "React Basics", instructor: "Jane Doe", progress: 65 },
    { title: "Node.js Fundamentals", instructor: "John Smith", progress: 40 },
    { title: "Python for Data Science", instructor: "Sara Lee", progress: 90 },
  ];

  const recommended = [
    { title: "Docker for Beginners", instructor: "Ravi Teja" },
    { title: "MongoDB Deep Dive", instructor: "Anjali Rao" },
    { title: "Cloud Basics (AWS)", instructor: "Nina Patel" },
  ];

  const upcoming = [
    { title: "React Hooks Workshop", date: "Nov 16, 2025" },
    { title: "JS Coding Challenge", date: "Nov 19, 2025" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">LearnFlow</h1>
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">
            Hi, {user.name || "Student"}
          </span>
          <img
            src={`https://api.dicebear.com/9.x/initials/svg?seed=${user.name}`}
            alt="avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome Banner */}
        <section className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl p-8 mb-10 shadow">
          <h2 className="text-2xl font-bold mb-2">Welcome back 👋</h2>
          <p className="text-white/90">
            Keep learning and track your progress easily.
          </p>
        </section>

        {/* My Courses */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Continue Learning
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  By {course.instructor}
                </p>
                <div className="h-2 bg-gray-200 rounded-full mb-2">
                  <div
                    className="h-2 bg-indigo-500 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">
                  {course.progress}% completed
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Courses */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Recommended for You
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((rec, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold mb-1">{rec.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  By {rec.instructor}
                </p>
                <button className="mt-2 text-sm bg-indigo-500 text-white px-3 py-1 rounded-lg hover:bg-indigo-600">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Lessons */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Upcoming Lessons
          </h3>
          <div className="bg-white shadow-sm rounded-xl p-4">
            {upcoming.map((u, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b last:border-none"
              >
                <span>{u.title}</span>
                <span className="text-sm text-gray-500">{u.date}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
