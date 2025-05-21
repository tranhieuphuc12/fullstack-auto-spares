import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import DashboardClient from "@/app/components/Dashboard";

const AdminDashboard = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("adminToken")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_ADMIN!)
    );
    if (payload.role !== "admin") throw new Error();
  } catch {
    redirect("/admin/login");
  }



  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <DashboardClient />
    </div>
  );
};

export default AdminDashboard;
