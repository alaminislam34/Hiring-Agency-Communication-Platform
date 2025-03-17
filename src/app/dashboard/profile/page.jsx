import DashboardLayout from "../DashboardLayout";
import ProfileAddForm from "./components/ProfileAddForm";

export default function Profile() {
  return (
    <DashboardLayout>
      {/* <div className="ml-10">
        <h2>My Profile</h2>
        <p>Ready to jump in?</p>
      </div> */}
      <ProfileAddForm></ProfileAddForm>
    </DashboardLayout>
  );
}
