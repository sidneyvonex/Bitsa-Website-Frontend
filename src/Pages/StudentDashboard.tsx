import { DashboardLayout } from "../Components/DashboardDesign/AllDashboardLayout"
import { Outlet } from "react-router-dom"


export const StudentDashboard = () => {
  return (
    <DashboardLayout userRole="Student">
      <Outlet />
    </DashboardLayout>
  )
}