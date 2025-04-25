export default function Topics() {
  const topics = [
    { label: "Bugs", count: 15 },
    { label: "Feature Requests", count: 0 },
    { label: "Others", count: 3 },
    { label: "Announcements", count: 3 },
    { label: "Resolved", count: 51 },
    { label: "", count: 4 }, // Empty label for last item
  ];

  return (
    <div className="border border-gray-200 rounded-lg p-6 max-w-[300px]">
      {/* Header */}
      <h2 className="text-lg font-bold uppercase mb-4 text-gray-800">
        Courses Topics
      </h2>

      {/* Topics List */}
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className={`flex justify-between items-center ${
              index !== topics.length - 1 ? "pb-4 border-b border-gray-200" : ""
            }`}
          >
            <span className="text-base text-gray-600">{topic.label}</span>
            <span className="text-2xl font-bold text-gray-800">
              {topic.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
