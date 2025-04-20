"use client";

const COO = () => {
  return (
    <div className="px-4 py-16">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#084049] mb-12">
        Meet Our COO – Akash Muhammad Abrrar
      </h1>

      <div className="flex flex-col gap-10 items-start">
        {/* Image Section */}
        <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
          <img
            src="/teamImg/fakeTeammate.jpg" // Replace this with your actual image path
            alt="Akash Muhammad Abrrar"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="text-gray-800 space-y-6 md:flex-1">
          <p>
            <strong>Akash Muhammad Abrrar</strong> serves as the Chief Operating
            Officer (COO) of <strong>JobHive</strong>, leading the company’s
            core operations with a focus on efficiency, growth, and team
            coordination. With a rich background in operations and logistics,
            Abrrar ensures every department works in sync to deliver
            high-quality outcomes.
          </p>

          <p>
            Abrrar's operational mindset and leadership skills have helped
            streamline workflows, reduce inefficiencies, and scale internal
            processes. His expertise in systems management and performance
            tracking plays a vital role in JobHive’s day-to-day success.
          </p>

          <p>
            Prior to JobHive, Abrrar led cross-functional teams in multiple tech
            startups, mastering agile operations, performance metrics, and team
            development.
          </p>

          <p>
            Abrrar’s calm leadership, organizational skill, and people-first
            approach make him an inspiring figure within the company, promoting
            a culture of clarity and execution.
          </p>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#f0fdfa] p-6 rounded-xl shadow-md border-l-4 border-[#084049]">
          <h2 className="text-2xl font-semibold mb-3 text-[#084049]">Vision</h2>
          <p>
            To build a seamless and agile operations system that enables JobHive
            to adapt, grow, and perform at the highest level across all
            departments.
          </p>
        </div>

        <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border-l-4 border-[#ff6f00]">
          <h2 className="text-2xl font-semibold mb-3 text-[#ff6f00]">
            Mission
          </h2>
          <p>
            To ensure organizational efficiency by optimizing internal
            workflows, enhancing cross-team communication, and fostering a
            results-driven culture.
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <blockquote className="italic text-xl text-gray-600 border-l-4 border-[#084049] pl-4">
          “Great operations aren't just about systems — they’re about people,
          process, and purpose. At JobHive, my mission is to bring all three
          together.”
        </blockquote>
        <p className="mt-4 text-[#084049] font-bold">– Akash Muhammad Abrrar</p>
      </div>
    </div>
  );
};

export default COO;
