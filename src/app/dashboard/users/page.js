import dbConnect, { collection } from "@/lib/dbConnect";
import ActionsButton from "./components/ActionsButton";
// import UsersTable from "./components/UsersTable";

const AllUsers = async () => {
  const userCollection = dbConnect(collection.user_collection);
  const users = await userCollection.find({}).toArray();
  return (
    <div className="">
      <h1 className="">Total Users: {users.length}</h1>
      <div className="overflow-x-auto mt-6 rounded-xl border border-teal-600 shadow-xl">
        <table className="min-w-full table   bg-white">
          <thead className="">
            <tr className="*:uppercase *:tracking-wider">
              <th>Name</th>
              <th>CreatedAt</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users?.length > 0 ? (
              users?.map(({ name, email, createdAt, role, _id }) => (
                <tr key={_id} className=" transition">
                  <td className="text-sm">{name}</td>
                  <td className="text-sm">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                  <td className="text-sm">{email}</td>
                  <td className="text-sm capitalize">{role}</td>
                  <td className="text-sm space-x-2">
                    <ActionsButton id={_id.toString()} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-sm">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
