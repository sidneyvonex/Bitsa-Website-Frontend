import { useState } from 'react';
import { DashboardLayout } from '../Components/DashboardDesign';
import { StudentDashboardOverview } from '../Components/StudentDashboard/StudentDashboardOverview';
import { InterestSelectionModal } from '../Components/InterestSelectionModal';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useCheckMyInterestsQuery } from '../features/api';

const StudentDashboard = () => {
  const user = useAppSelector(selectCurrentUser);

  // Check localStorage for completion status - persists across sessions
  const [interestsCompleted, setInterestsCompleted] = useState(() => {
    const stored = localStorage.getItem('interestsCompleted');
    return stored === 'true';
  });

  // Check if user has selected interests
  const { data: interestsCheck, isLoading, error } = useCheckMyInterestsQuery(undefined, {
    skip: !user || user.role !== 'Student',
  });

  // Debug logging
  console.log(' StudentDashboard - User:', user);
  console.log(' StudentDashboard - Interests Check Response:', interestsCheck);
  console.log(' StudentDashboard - Is Loading:', isLoading);
  console.log(' StudentDashboard - Error:', error);

  // Handle both response formats: { success, data: { hasInterests } } or { hasInterests }
  // Default to false (show modal) if no data yet, but only after loading completes
  let hasInterests = false;

  if (interestsCheck) {
    hasInterests = interestsCheck.data?.hasInterests ?? interestsCheck.hasInterests ?? false;
  }

  // Compute whether to show the modal based on current state
  const shouldShowModal = Boolean(
    user?.role === 'Student' &&
    !isLoading &&
    !interestsCompleted &&
    interestsCheck &&  // Wait for response
    !hasInterests      // No interests selected
  );

  console.log(' StudentDashboard - Has Interests:', hasInterests);
  console.log(' StudentDashboard - Should Show Modal:', shouldShowModal);
  console.log(' StudentDashboard - Interests Completed:', interestsCompleted);

  const handleInterestModalClose = () => {
    // Prevent closing without selection on first login
    // User must select at least one interest
    // Do nothing - modal stays open until interests are selected
    console.log('Interest selection is required. Please select at least one interest.');
  };

  const handleInterestSelectionComplete = () => {
    setInterestsCompleted(true);
    // Persist to localStorage so it never shows again
    localStorage.setItem('interestsCompleted', 'true');
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
