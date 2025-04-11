import dbConnect, { collection } from "@/lib/dbConnect";
import ActionsButton from "./components/ActionsButton";
// import UsersTable from "./components/UsersTable";

const AllUsers = async () => {
  const userCollection = dbConnect(collection.user_collection);
  const users = await userCollection.find({}).toArray();
  return (
    <div className="p-4">
      <h1 className="text-xl md:text-2xl font-semibold my-4 lg:my-6">
        Total Users: {users.length}
      </h1>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table divide-y divide-gray-200 bg-white  shadow rounded-xl">
          <thead className=" ">
            <tr>
              <th className="uppercase tracking-wider">Name</th>
              <th className="uppercase tracking-wider">CreatedAt</th>
              <th className="uppercase tracking-wider">Email</th>
              <th className="uppercase tracking-wider">Role</th>
              <th className="uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users?.map(({ name, email, createdAt, role, _id }) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
