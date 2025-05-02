"use client";

import { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { useAppContext } from "@/Providers/AppProviders";

export default function ForumPosts({ filter }) {
  const { currentUser, allPosts } = useAppContext();
  // const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [activeComments, setActiveComments] = useState({});

  const fetchComments = async (postId) => {
    try {
      const res = await fetch(`/api/forum-comments?postId=${postId}`);
      const data = await res.json();
      setComments((prev) => ({ ...prev, [postId]: data }));
    } catch (error) {
      console.error("Fetch comment error:", error);
    }
  };

  const handleToggleComments = async (postId) => {
    const isOpen = activeComments[postId];
    if (!isOpen) await fetchComments(postId);
    setActiveComments((prev) => ({ ...prev, [postId]: !isOpen }));
  };

  const handleCommentChange = (postId, value) => {
    setNewComments((prev) => ({ ...prev, [postId]: value }));
  };

  const handleCommentSubmit = async (postId) => {
    const text = newComments[postId]?.trim();
    if (!text) return;

    const commentData = {
      postId,
      text,
      commenter: {
        name: currentUser?.name,
        email: currentUser?.email,
        image: currentUser?.image,
      },
    };

    try {
      const res = await fetch("/api/forum-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        setNewComments((prev) => ({ ...prev, [postId]: "" }));
        fetchComments(postId);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const myPosts = allPosts?.filter((p) => p.postedId === currentUser?._id);

  return (
    <div className="space-y-6 px-4 py-6">
      {allPosts?.length === 0 && (
        <p className="text-center text-gray-500">No posts found.</p>
      )}

      {(filter === "myPosts" ? myPosts : allPosts)
        ?.sort((a, b) => b.postedAt - a.postedAt)
        .map((post) => (
          <div
            key={post._id}
            className="bg-gray-50 border rounded-xl p-4 space-y-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post?.image || "/fakeUser.jpg"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold">{post?.postedBy}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(post.postedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    •{" "}
                    {Math.floor(
                      (Date.now() - new Date(post.postedAt)) / 3600000
                    )}{" "}
                    hours ago
                  </p>
                </div>
              </div>
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                {post.type}
              </span>
            </div>

            {/* Title + Content */}
            <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
            <p className="text-gray-700">{post.content}</p>

            {/* Media */}
            {post.media && (
              <img
                src={post.media}
                alt="Post Media"
                className="w-full max-h-80 object-cover rounded-md border"
              />
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
              <button
                onClick={() => handleToggleComments(post._id)}
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <FaCommentAlt className="text-gray-400" />
                <span>{comments[post._id]?.length || 0} Comments</span>
              </button>
            </div>
            {/* Comment Section (Toggle) */}
            {activeComments[post._id] && (
              <div className="space-y-3 border-t pt-3">
                {/* Existing comments */}
                {comments[post._id]?.map((c, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <img
                      src={c.commenter?.image}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="avatar"
                    />
                    <div>
                      <p className="text-sm font-medium">{c.commenter?.name}</p>
                      <p className="text-sm text-gray-700">{c.text}</p>
                    </div>
                  </div>
                ))}

                {/* comment Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComments[post._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(post._id, e.target.value)
                    }
                    className="flex-grow px-3 py-2 border rounded-md text-sm"
                  />
                  <button
                    onClick={() => handleCommentSubmit(post._id)}
                    className="px-4 py-2 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-600"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
