import Notifications from "../components/NotificationPage/Notifications";

export default function Notification() {
  return (
    <div className="w-full p-4">
      <div className="rounded-md py-6">
        <h2 className="text-3xl text-black font-semibold">All Notifications</h2>
        <Notifications></Notifications>
      </div>
    </div>
  );
}
