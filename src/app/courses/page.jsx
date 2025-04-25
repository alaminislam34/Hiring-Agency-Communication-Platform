"use client";
const CrashCourse = () => {
  const courseData = [
    {
      "sectionTitle": "Resume & Cover Letter Perfection",
      "sectionParagraph":
        "Kickstart your job search with a professional resume and cover letter. These videos will help you tailor your documents to stand out in today’s competitive job market.",
      "sectionVideo": [
        {
          "videoLink": "https://www.youtube.com/embed/0jQwXfsOds4?si=G9Hh3nLdOu-tzzBz",
          "videoTitle":
            "How to Create an ATS-Friendly Resume That Gets Noticed",
        },
        {
          "videoLink": "https://www.youtube.com/embed/LGroEGMaV7s?si=MSHx6uqsJAbGI_z_",
          "videoTitle": "How to Write an Effective Cover Letter in 2025",
        },
      ],
    },
    {
      "sectionTitle": "Level Up Your LinkedIn",
      "sectionParagraph":
        "Your LinkedIn profile is your online resume. Make it recruiter-ready with tips to optimize your profile and build powerful professional connections.",
      "sectionVideo": [
        {
          "videoLink": "https://www.youtube.com/embed/j2YA_TScR-E?si=CSQNOyJRWtZKv3R3",
          "videoTitle":
            "Crafting a Professional LinkedIn Profile That Attracts Recruiters",
        },
        {
          "videoLink": "https://www.youtube.com/embed/zknO3GkSFAg?si=I0jPBOOUQ0APdOGw",
          "videoTitle":
            "Mastering LinkedIn Networking: Connect, Engage & Grow",
        },
      ],
    },
    {
      "sectionTitle": "Mastering the Job Hunt",
      "sectionParagraph":
        "Tired of applying with no results? These videos guide you through smart job search strategies and using tech tools to give you the edge.",
      "sectionVideo": [
        {
          "videoLink": "https://www.youtube.com/embed/J6LtHHQOg5w",
          "videoTitle":
            "Job Search Strategies: How to Find Opportunities Faster",
        },
        {
          "videoLink": "https://www.youtube.com/embed/hfl1AtbhVfQ",
          "videoTitle":
            "How to Use ChatGPT and AI Tools to Boost Your Job Hunt",
        },
      ],
    },
    {
      "sectionTitle": "Ace the Interview",
      "sectionParagraph":
        "Confidence is key in interviews. Learn how to answer tricky questions and communicate effectively during both in-person and virtual interviews.",
      "sectionVideo": [
        {
          "videoLink": "https://www.youtube.com/embed/lB1AA-59KrY",
          "videoTitle":
            "Top 10 Common Interview Questions and How to Answer Them Confidently",
        },
        {
          "videoLink": "https://www.youtube.com/embed/GlePkvsgCOY",
          "videoTitle":
            "Body Language & Communication Tips for Virtual Interviews",
        },
      ],
    },
    {
      "sectionTitle": "Stand Out Online",
      "sectionParagraph":
        "Having a personal brand or portfolio sets you apart. These tips will help developers and creatives build an impressive online presence.",
      "sectionVideo": [
        {
          "videoLink": "https://www.youtube.com/embed/DqDtO4dAt3o",
          "videoTitle":
            "Portfolio Tips for Developers & Creatives: Stand Out Online",
        },
        {
          "videoLink": "https://www.youtube.com/embed/4kgXmpyZ3k0",
          "videoTitle":
            "Avoid These 7 Job Search Mistakes That Cost You Offers",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center font-nunito">
      {courseData.map((data, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-gray-600 mb-10 w-[70%] mx-auto">
            {data.sectionParagraph}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sectionVideo.map((video, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div className="relative aspect-video">
                    <iframe
                      src={video.videoLink} // Replace with your video link
                      title="Online Batch Overview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-t-lg"
                    ></iframe>
                  </div>
                  <div className="p-4 text-left">
                    <h3 className="font-semibold text-lg mb-1">
                    {video.videoTitle}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CrashCourse;
