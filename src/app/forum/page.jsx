"use client";
import { useState } from "react";
import ButtonGroup from "./component/ButtonGroup";
import CreatePost from "./component/Createpost";
import ForumPosts from "./component/ForumPosts";
// import ForumNav from "./component/navbar";
import Topics from "./component/Topic";
import { useAppContext } from "@/Providers/AppProviders";

const ForumPage = () => {
  const { allPosts, allPostsRefetch } = useAppContext();
  const [filter, setFilter] = useState("");
  // const [allPosts, setAllPosts] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* <ForumNav /> */}

      <section className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-11/12 mx-auto pt-6">
          <div className="md:col-span-8">
            <CreatePost allPostsRefetch={allPostsRefetch} />
            <div className="mt-4">
              <ButtonGroup setFilter={setFilter} filter={filter} />
              <ForumPosts allPosts={allPosts} filter={filter} />
            </div>
          </div>

          <div className="md:col-span-4 mt-6 md:mt-0">
            <Topics posts={allPosts} allPostsRefetch={allPostsRefetch} />{" "}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumPage;
