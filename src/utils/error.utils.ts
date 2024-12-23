export const handleApiError = (error: any) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      return error.response.data.message || 'An error occurred';
    }
    console.error('Network Error:', error.message);
    return 'Network error. Please try again later.';
  };