import { DashboardLayout } from "../Components/DashboardDesign/AllDashboardLayout"
import { StudentDashboardOverview } from "../Components/StudentDashboard/StudentDashboardOverview"


export const StudentDashboard = () => {
  return (
    <DashboardLayout userRole="Student">
      <StudentDashboardOverview />
    </DashboardLayout>
  )
}