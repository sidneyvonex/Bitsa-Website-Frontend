import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../Components/DashboardDesign';
import { StudentDashboardOverview } from '../Components/DashboardDesign/StudentDashboardOverview';
import { InterestSelectionModal } from '../Components/InterestSelectionModal';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useCheckMyInterestsQuery } from '../features/api';
import { StudentProfile } from './StudentDashboard/Profile';
import { MyProjects } from './StudentDashboard/MyProjects';
import { MyEvents } from './StudentDashboard/MyEvents';
import { StudentSettings } from './StudentDashboard/Settings';
import { MyBlogs } from './StudentDashboard/MyBlogs';

const StudentDashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const [interestsCompleted, setInterestsCompleted] = useState(false);

  // Check if user has selected interests
  const { data: interestsCheck, isLoading } = useCheckMyInterestsQuery(undefined, {
    skip: !user || user.role !== 'Student',
  });

  // Compute whether to show the modal based on current state
  const shouldShowModal = Boolean(
    user?.role === 'Student' &&
    !isLoading &&
    !interestsCompleted &&
    interestsCheck?.data &&
    !interestsCheck.data.hasInterests
  );

  const handleInterestModalClose = () => {
    // Prevent closing without selection on first login
    // User must select at least one interest
    // Do nothing - modal stays open until interests are selected
    console.log('Interest selection is required. Please select at least one interest.');
  };

  const handleInterestSelectionComplete = () => {
    setInterestsCompleted(true);
  };

  return (
    <>
      <DashboardLayout userRole="Student">
        <Routes>
          <Route index element={<StudentDashboardOverview />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="projects" element={<MyProjects />} />
          <Route path="events" element={<MyEvents />} />
          <Route path="blogs" element={<MyBlogs />} />
          <Route path="settings" element={<StudentSettings />} />
        </Routes>
      </DashboardLayout>

      {user && user.role === 'Student' && (
        <InterestSelectionModal
          isOpen={shouldShowModal}
          onClose={handleInterestModalClose}
          onComplete={handleInterestSelectionComplete}
        />
      )}
    </>
  );
};

export default StudentDashboard;
