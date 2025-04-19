"use client";

const CFO = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 mb-8 py-4">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#084049] mb-12">
        Meet Our CFO – Md Rakib Gazi
      </h1>

      <div className="flex flex-col gap-10 items-start">
        {/* Image Section */}
        <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
          <img
            src="/teamImg/RakibGazi.jpg" // Replace with the actual image path
            alt="Md Rakib Gazi"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="text-gray-800 space-y-6 md:flex-1">
          <p>
            <strong>Md Rakib Gazi</strong> is the Chief Financial Officer (CFO)
            of <strong>JobHive</strong>, bringing financial stability, strategic
            planning, and data-driven insights to the heart of the company. With
            years of experience in corporate finance and business analysis, he
            ensures JobHive maintains financial transparency and sustainable
            growth.
          </p>

          <p>
            With a background in Accounting and Finance, Rakib has managed
            large-scale budgets, led audit processes, and implemented efficient
            financial structures in multiple organizations before joining
            JobHive.
          </p>

          <p>
            At JobHive, he is responsible for budgeting, forecasting, risk
            management, and ensuring that every investment aligns with the
            long-term vision of the platform.
          </p>

          <p>
            Rakib is known for his sharp analytical thinking, calm leadership,
            and dedication to ethical financial practices. He believes that a
            strong financial foundation is key to empowering innovation and
            trust in any company.
          </p>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#f0fdfa] p-6 rounded-xl shadow-md border-l-4 border-[#084049]">
          <h2 className="text-2xl font-semibold mb-3 text-[#084049]">Vision</h2>
          <p>
            To ensure financial excellence and long-term sustainability for
            JobHive by implementing robust fiscal strategies and maintaining
            full transparency.
          </p>
        </div>

        <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border-l-4 border-[#ff6f00]">
          <h2 className="text-2xl font-semibold mb-3 text-[#ff6f00]">
            Mission
          </h2>
          <p>
            To support innovation through responsible financial leadership,
            clear data reporting, and strategic decision-making that strengthens
            trust among stakeholders.
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <blockquote className="italic text-xl text-gray-600 border-l-4 border-[#084049] pl-4">
          “I believe transparency and accountability are the foundation of every
          successful business. At JobHive, my mission is to protect and grow our
          financial future with integrity.”
        </blockquote>
        <p className="mt-4 text-[#084049] font-bold">– Md Rakib Gazi</p>
      </div>
    </div>
  );
};

export default CFO;
