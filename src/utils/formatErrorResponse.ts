export const formatErrorResponse = (error) => {
  // Check if the error response is in the expected format
  if (error && error.response && error.response.data) {
    const errorMessages = error.response.data;
    // Flatten the error messages into a single array
    return Object.values(errorMessages).flat();
  }
  // Return a generic error message if the format is not as expected
  return ['An unexpected error occurred.'];
};
