// "use client";
// import ButtonGroup from "./component/ButtonGroup";
// import CreatePost from "./component/Createpost";
// import ForumNav from "./component/navbar";
// import Topics from "./component/Topic";

// const ForumPage = () => {
//   return (
//     <div>
//       <ForumNav></ForumNav>
//       {/* feed container */}
//       <section>
//         <div className="grid grid-cols-12 gap-3 w-11/12 mx-auto pt-4">
//           {/* create post leftside */}
//           <div className="grid col-span-8">
//             <CreatePost></CreatePost>
//             <ButtonGroup></ButtonGroup>
//           </div>
//           {/* right side topic  */}
//           <div className="grid col-span-4">
//             <Topics></Topics>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ForumPage;

"use client";
import ButtonGroup from "./component/ButtonGroup";
import CreatePost from "./component/Createpost";
import ForumNav from "./component/navbar";
import Topics from "./component/Topic";

const ForumPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ForumNav />

      {/* Feed container */}
      <section className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-11/12 mx-auto pt-6">
          {/* Left side (Create Post + Button Group) */}
          <div className="md:col-span-8">
            <CreatePost />
            <div className="mt-4">
              <ButtonGroup />
            </div>
          </div>

          {/* Right side (Topics) */}
          <div className="md:col-span-4 mt-6 md:mt-0">
            <Topics />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForumPage;
