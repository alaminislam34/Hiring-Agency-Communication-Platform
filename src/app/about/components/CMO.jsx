"use client";

const CMO = () => {
  return (
    <div className="px-4 py-16">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#084049] mb-12">
        Meet Our CMO – MD Alvee Hasan
      </h1>

      <div className="flex flex-col gap-10 items-start">
        {/* Image Section */}
        <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
          <img
            src="/teamImg/fakeTeammate.jpg" // Replace with actual path
            alt="MD Alvee Hasan"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="text-gray-800 space-y-6 md:flex-1">
          <p>
            <strong>MD Alvee Hasan</strong> is the dynamic Chief Marketing
            Officer (CMO) of <strong>JobHive</strong>, responsible for driving
            the brand’s global presence, user engagement, and growth strategy.
            With a powerful vision and creative marketing skills, she brings
            life to the company’s message.
          </p>

          <p>
            With years of experience in digital marketing, branding, and
            communication, Hasan has led campaigns that successfully connect
            users with JobHive’s core mission. Her expertise spans across social
            media, SEO, email marketing, influencer collaborations, and user
            behavior analytics.
          </p>

          <p>
            Hasan’s leadership brings a strong blend of creativity and data —
            allowing the marketing team to craft campaigns that are not only
            beautiful, but also impactful. She is passionate about telling
            stories that matter and building strong user communities.
          </p>

          <p>
            Outside of marketing, Hasan is admired for her leadership energy,
            team mentoring, and commitment to empowering women in the tech
            space.
          </p>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#f0fdfa] p-6 rounded-xl shadow-md border-l-4 border-[#084049]">
          <h2 className="text-2xl font-semibold mb-3 text-[#084049]">Vision</h2>
          <p>
            To establish JobHive as a globally recognized platform that
            resonates with authenticity, trust, and innovation in the digital
            job market.
          </p>
        </div>

        <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border-l-4 border-[#ff6f00]">
          <h2 className="text-2xl font-semibold mb-3 text-[#ff6f00]">
            Mission
          </h2>
          <p>
            To create powerful, human-centered marketing campaigns that connect
            with audiences, grow user trust, and drive impactful brand growth.
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <blockquote className="italic text-xl text-gray-600 border-l-4 border-[#084049] pl-4">
          “Marketing is not just promotion — it’s connection, emotion, and
          purpose. At JobHive, I aim to make every campaign meaningful for the
          people we serve.”
        </blockquote>
        <p className="mt-4 text-[#084049] font-bold">– MD Alvee Hasan</p>
      </div>
    </div>
  );
};

export default CMO;
