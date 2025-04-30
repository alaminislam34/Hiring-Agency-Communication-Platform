"use client";
import { useState } from "react";
import ButtonGroup from "./component/ButtonGroup";
import CreatePost from "./component/Createpost";
import ForumPosts from "./component/ForumPosts";
import ForumNav from "./component/navbar";
import Topics from "./component/Topic";

const ForumPage = () => {
  const [filter, setFilter] = useState("all");
  const [allPosts, setAllPosts] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      <ForumNav />

      <section className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-11/12 mx-auto pt-6">
          <div className="md:col-span-8">
            <CreatePost />
            <div className="mt-4">
              <ButtonGroup setFilter={setFilter} />
              <ForumPosts filter={filter} setAllPosts={setAllPosts} />
            </div>
          </div>

          <div className="md:col-span-4 mt-6 md:mt-0">
            <Topics posts={allPosts} setFilter={setFilter} />{" "}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumPage;
