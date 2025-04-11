export default function Notifications() {
  const applications = [
    { id: 1, name: "Henry Wilson", category: "Product Designer" },
    { id: 2, name: "Emily Johnson", category: "Software Engineer" },
    { id: 3, name: "Michael Brown", category: "Data Analyst" },
    { id: 4, name: "Sophia Davis", category: "Marketing Specialist" },
    { id: 5, name: "James Anderson", category: "UX/UI Designer" },
    { id: 6, name: "Olivia Martinez", category: "Project Manager" },
    { id: 7, name: "William Taylor", category: "Frontend Developer" },
    { id: 8, name: "Ava Thomas", category: "Backend Developer" },
    { id: 9, name: "Ethan White", category: "Cybersecurity Analyst" },
    { id: 10, name: "Mia Harris", category: "Business Analyst" },
  ];

  return (
    <div className="max-w-md  mt-6 space-y-2">
      {applications.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 bg-gray-100 border border-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition duration-200"
        >
          <svg
            className="w-6 h-6 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p className="text-sm font-medium">
            <span className="font-semibold">{item.name}</span> applied for a job
            as <span className="text-blue-700">{item.category}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
