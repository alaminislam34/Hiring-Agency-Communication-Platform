import Notifications from "./components/notifications";
import DashboardLayout from "./DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold">Howdy, Jerome!!</h1>
        <p>Ready to jump back in?</p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="bg-white flex justify-center gap-4 items-center p-4 shadow rounded">
            <div>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-blue-500 text-xl font-bold">22</p>
              <p>Applied Jobs</p>
            </div>
          </div>
          <div className="bg-white flex justify-center gap-4 items-center p-4 shadow rounded">
            <div>
              <svg
                className="w-6 h-6 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500 text-xl font-bold">9382</p>
              <p>Job Alerts</p>
            </div>
          </div>
          <div className="bg-white flex justify-center gap-4 items-center p-4 shadow rounded">
            <div>
              <svg
                className="w-6 h-6 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M16 10h.01M12 12h.01M12 20c-5.523 0-10-4.477-10-10S6.477 0 12 0s10 4.477 10 10-4.477 10-10 10z"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-yellow-500 text-xl font-bold">74</p>
              <p>Messages</p>
            </div>
          </div>
          <div className="bg-white flex justify-center gap-4 items-center p-4 shadow rounded">
            <div>
              <svg
                className="w-6 h-6 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-green-500 text-xl font-bold">32</p>
              <p>Shortlist</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Notifications></Notifications>
      </div>
    </DashboardLayout>
  );
}
