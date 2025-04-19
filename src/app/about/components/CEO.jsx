"use client";
const CEO = () => {
  return (
    <div>
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-[#084049] mb-12">
        Meet Our CEO – MD Al-Amin Islam
      </h1>

      <div className="flex flex-col gap-10 items-start">
        {/* Image Section */}
        <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden">
          <img
            src="/teamImg/alamin2.jpg"
            alt="MD Al-Amin Islam"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="text-gray-800 space-y-6 md:flex-1">
          <p>
            <strong>MD Al-Amin Islam</strong> is the visionary Founder and CEO
            of <strong>JobHive</strong>, a cutting-edge micro-tasking and
            freelancing platform designed to revolutionize the way people work
            and earn online. With a deep passion for technology and leadership,
            Al-Amin has successfully brought together a team of talented
            developers, designers, and thinkers to build a platform that
            empowers both workers and businesses.
          </p>

          <p>
            Al-Amin's journey started with a diploma in Textile Engineering, but
            his heart was always inclined toward coding and innovation. As a
            self-taught web developer, he quickly expanded his skills in HTML,
            CSS, JavaScript, React.js, and Node.js. His commitment to excellence
            and continuous learning made him a key figure in multiple
            high-performing projects even before founding JobHive.
          </p>

          <p>
            Under his leadership, JobHive has grown from an idea to a thriving
            platform that connects thousands of users globally. Al-Amin believes
            in ethical innovation, transparency, and creating meaningful
            opportunities for all.
          </p>

          <p>
            Outside of his professional role, Al-Amin is known for his
            mentorship spirit, collaborative mindset, and dedication to building
            a supportive tech community in Bangladesh.
          </p>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#f0fdfa] p-6 rounded-xl shadow-md border-l-4 border-[#084049]">
          <h2 className="text-2xl font-semibold mb-3 text-[#084049]">Vision</h2>
          <p>
            To establish JobHive as the go-to platform for digital micro-tasks
            globally, where users can earn fairly, grow their skills, and build
            their careers on their own terms.
          </p>
        </div>

        <div className="bg-[#fff7ed] p-6 rounded-xl shadow-md border-l-4 border-[#ff6f00]">
          <h2 className="text-2xl font-semibold mb-3 text-[#ff6f00]">
            Mission
          </h2>
          <p>
            To bridge the gap between workers and employers by creating a
            secure, fast, and user-friendly task platform with the highest
            standards in quality and transparency.
          </p>
        </div>
      </div>

      {/* Personal Message */}
      <div className="mt-16 text-center max-w-3xl mx-auto">
        <blockquote className="italic text-xl text-gray-600 border-l-4 border-[#084049] pl-4">
          “I believe everyone deserves the opportunity to work with freedom,
          flexibility, and dignity. That’s why I created JobHive — to help
          people unlock their potential and build a better future.”
        </blockquote>
        <p className="mt-4 text-[#084049] font-bold">– MD Al-Amin Islam</p>
      </div>
    </div>
  );
};

export default CEO;
