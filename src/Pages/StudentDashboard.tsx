import { useState } from 'react';
import { DashboardLayout } from '../Components/DashboardDesign';
import { StudentDashboardOverview } from '../Components/DashboardDesign/StudentDashboardOverview';
import { InterestSelectionModal } from '../Components/InterestSelectionModal';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useCheckMyInterestsQuery } from '../features/api';

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
        <StudentDashboardOverview />
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
