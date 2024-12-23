export const dateUtils = {
  formatDate: (date: Date | string): string => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  },

  formatDateDisplay: (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString();
  },

  isOver18: (birthDate: Date | string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1 >= 18;
    }
    
    return age >= 18;
  },

  isValidDateRange: (startDate: Date | string, endDate: Date | string): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end;
  }
};
