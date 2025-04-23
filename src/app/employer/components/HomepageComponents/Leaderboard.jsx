"use client";
import React from "react";

const rawLeaders = [
  {
    id: 1,
    image: "/fakeUser.jpg",
    name: "Rakib Hossain",
    postedJobs: 35,
    points: 1200,
  },
  {
    id: 2,
    image: "/fakeUser.jpg",
    name: "Nusrat Jahan",
    postedJobs: 31,
    points: 1100,
  },
  {
    id: 3,
    image: "/fakeUser.jpg",
    name: "Tanvir Alam",
    postedJobs: 28,
    points: 980,
  },
  {
    id: 4,
    image: "/fakeUser.jpg",
    name: "Sadia Sultana",
    postedJobs: 24,
    points: 940,
  },
  {
    id: 5,
    image: "/fakeUser.jpg",
    name: "Mahmudul Hasan",
    postedJobs: 21,
    points: 900,
  },
  {
    id: 6,
    image: "/fakeUser.jpg",
    name: "Nasim Reza",
    postedJobs: 19,
    points: 870,
  },
  {
    id: 7,
    image: "/fakeUser.jpg",
    name: "Jannatul Ferdous",
    postedJobs: 17,
    points: 820,
  },
  {
    id: 8,
    image: "/fakeUser.jpg",
    name: "Rasel Ahmed",
    postedJobs: 15,
    points: 780,
  },
  {
    id: 9,
    image: "/fakeUser.jpg",
    name: "Fahim Rahman",
    postedJobs: 13,
    points: 740,
  },
  {
    id: 10,
    image: "/fakeUser.jpg",
    name: "Anika Tamanna",
    postedJobs: 11,
    points: 700,
  },
];

const fakeLeaders = rawLeaders.map((leader, index) => {
  const rank = index + 1;
  let rankLabel = "";
  let rankName = "";
  let rankColor = "";

  if (rank === 1) {
    rankLabel = "🥇";
    rankName = "Platinum";
    rankColor = "text-yellow-400";
  } else if (rank === 2) {
    rankLabel = "🥈";
    rankName = "Gold";
    rankColor = "text-amber-400";
  } else if (rank === 3) {
    rankLabel = "🥉";
    rankName = "Silver";
    rankColor = "text-gray-300";
  } else if (rank <= 5) {
    rankLabel = "⭐";
    rankName = "Elite";
    rankColor = "text-purple-400";
  } else {
    rankLabel = "🔰";
    rankName = "Member";
    rankColor = "text-green-400";
  }

  return {
    ...leader,
    rank,
    rankLabel,
    rankName,
    rankColor,
  };
});

const Leaderboard = () => {
  return (
    <div className="bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 text-teal-900 rounded-xl p-6 shadow-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-6 tracking-wide">
        Employers Leaderboard
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className=" text-teal-950 uppercase font-semibold rounded-md">
            <tr className="*:px-4 *:py-3 text-left">
              <th className="text-center">Rank</th>
              <th>Employer</th>
              <th className="text-right">Posted Jobs</th>
              <th className="text-right">Total Points</th>
            </tr>
          </thead>
          <tbody className="">
            {fakeLeaders.map((leader) => (
              <tr
                key={leader.id}
                className="hover:bg-teal-200 transition duration-200 *:px-4 *:py-3"
              >
                <td className="font-semibold text-xl text-center">
                  {![1, 2, 3].includes(leader.rank) ? leader.rank : ""}
                  <div className="flex justify-center">
                    {leader.rank === 1 && (
                      <img
                        className="w-16 md:w-20"
                        src="/gold!st.jpg"
                        alt="gold"
                      />
                    )}
                    {leader.rank === 3 && (
                      <img
                        className="w-16 md:w-20"
                        src="/bronze3rd.jpg"
                        alt="platinum"
                      />
                    )}
                    {leader.rank === 2 && (
                      <img
                        className="w-16 md:w-20"
                        src="/silver2nd.jpg"
                        alt="bronze"
                      />
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-10 h-10 rounded-full border-2 border-teal-950"
                    />
                    <span>{leader.name}</span>
                  </div>
                </td>
                <td className="text-right">{leader.postedJobs}</td>
                <td className="text-right">{leader.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-5 text-sm text-center text-teal-900">
        🥇 Platinum (1st) • 🥈 Gold (2nd) • 🥉 Silver (3rd) • ⭐ Elite (Top 5) •
        🔰 Member (Rest)
      </div>
    </div>
  );
};

export default Leaderboard;
