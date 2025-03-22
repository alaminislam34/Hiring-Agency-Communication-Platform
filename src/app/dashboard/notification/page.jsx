import Notifications from "../components/notifications";
import DashboardLayout from "../DashboardLayout";

export default function Notification() {
  return (
    <DashboardLayout>
      <div className="max-w-md ml-15 flex flex-col justify-center mt-20">
        <h2 className="text-4xl text-green-500 font-bold">All Notifications</h2>
        <Notifications></Notifications>
      </div>
    </DashboardLayout>
  );
}
