"use client";

const CTO = () => {
  return (
    <div>
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#084049] mb-12">
        Meet Our CTO – MD Ruknujjaman Rony
      </h1>

      <div className="flex flex-col gap-10 items-start">
        {/* Image Section */}
        <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
          <img
            src="/teamImg/Rony.jpg"
            alt="MD Ruknujjaman Rony"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="text-gray-800 space-y-6 md:flex-1">
          <p>
            <strong>MD Ruknujjaman Rony</strong> is the brilliant Chief
            Technology Officer (CTO) of <strong>JobHive</strong>. With a decade
            of experience in software engineering, systems architecture, and
            team leadership, Rony has been instrumental in turning JobHive’s
            technical vision into reality.
          </p>

          <p>
            Starting as a computer science enthusiast, Rony rapidly advanced his
            skills in backend technologies like Node.js, Express, MongoDB, and
            cloud services such as AWS and Vercel. He also has deep knowledge in
            DevOps and system security, ensuring JobHive is stable, scalable,
            and secure.
          </p>

          <p>
            At JobHive, Rony leads the engineering team with a focus on quality,
            innovation, and speed. His mentorship and code quality standards
            have raised the bar for the entire team and accelerated JobHive’s
            development process.
          </p>

          <p>
            Outside of work, Rony is an open-source contributor and passionate
            about empowering young developers through workshops and bootcamps
            across Bangladesh.
          </p>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#f0fdfa] p-6 rounded-xl shadow-md border-l-4 border-[#084049]">
          <h2 className="text-2xl font-semibold mb-3 text-[#084049]">Vision</h2>
          <p>
            To build a seamless, intelligent, and future-ready tech backbone for
            JobHive that scales with user needs and stays ahead of industry
            trends.
          </p>
        </div>

        <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border-l-4 border-[#ff6f00]">
          <h2 className="text-2xl font-semibold mb-3 text-[#ff6f00]">
            Mission
          </h2>
          <p>
            To lead JobHive’s technical strategy with a strong focus on
            innovation, performance, and reliability — ensuring a world-class
            experience for users and businesses alike.
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <blockquote className="italic text-xl text-gray-600 border-l-4 border-[#084049] pl-4">
          “Technology should empower people. At JobHive, I strive to create
          systems that not only work — but inspire confidence, fairness, and
          opportunity.”
        </blockquote>
        <p className="mt-4 text-[#084049] font-bold">– MD Ruknujjaman Rony</p>
      </div>
    </div>
  );
};

export default CTO;
