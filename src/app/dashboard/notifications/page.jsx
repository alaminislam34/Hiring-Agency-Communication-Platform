import Notifications from "../components/notifications";

export default function Notification() {
  return (
    <div className="bg-[rgb(238,241,247)] w-full flex flex-col justify-center items-center">
      <div className="rounded-md py-6 px-9 flex flex-col justify-start items-start mt-12 bg-white">
        <h2 className="text-3xl text-black font-semibold">All Notifications</h2>
        <Notifications></Notifications>
      </div>
    </div>
  );
}
