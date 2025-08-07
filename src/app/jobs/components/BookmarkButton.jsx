import { BookmarkCheck, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

const BookmarkButton = ({ jobs }) => {
  const [bookmark, setBookmark] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmark");
      if (saved) {
        setBookmark(JSON.parse(saved));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
    }
  }, [bookmark]);

  const handleBookmark = () => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("bookmark")) || [];

      if (saved.includes(jobs._id)) {
        const updated = saved.filter((id) => id !== jobs._id);
        setBookmark(updated);
        localStorage.setItem("bookmark", JSON.stringify(updated));
      } else {
        const updated = [...saved, jobs._id];
        setBookmark(updated);
        localStorage.setItem("bookmark", JSON.stringify(updated));
      }
    }
  };

  const isBookmarked = bookmark.includes(jobs._id);

  return (
    <button
      onClick={handleBookmark}
      className={`${
        isBookmarked ? "text-teal-500" : "text-black"
      } flex items-center justify-center hover:text-teal-500 transition duration-300 cursor-pointer`}
    >
      {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
    </button>
  );
};

export default BookmarkButton;
