export default function Topics({ posts = [], setFilter }) {
  const typeCounts = posts.reduce((acc, post) => {
    const key = post.type || "Other";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topics = Object.entries(typeCounts).map(([label, count]) => ({
    label,
    count,
  }));

  return (
    <div className="border border-gray-200 rounded-lg p-6 max-w-[300px] sticky top-16">
      <h2 className="text-lg font-bold uppercase mb-4 text-gray-800">
        Discussion Topics
      </h2>
      <div className="space-y-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            onClick={() => setFilter(topic.label)}
            className={`flex justify-between items-center cursor-pointer hover:bg-gray-100 px-2 py-2 rounded ${
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
