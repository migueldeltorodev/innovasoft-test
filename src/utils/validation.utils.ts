export const validationUtils = {
  isValidName: (name: string) => {
    return name.length > 0 && name.length <= 50;
  },

  isValidSurnames: (surnames: string) => {
    return surnames.length > 0 && surnames.length <= 100;
  },

  isValidId: (id: string) => {
    return id.length > 0 && id.length <= 20;
  },

  isValidPhone: (phone: string) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
    return phone.length <= 20 && phoneRegex.test(phone);
  },

  isValidAddress: (address: string) => {
    return address.length > 0 && address.length <= 200;
  },

  isValidReview: (review: string) => {
    return review.length <= 200;
  },

  isValidEmail: (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  isValidGender: (gender: string) => {
    return ['M', 'F'].includes(gender);
  },

  isValidDate: (date: string) => {
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  },

  isValidImage: (base64String: string) => {
    return base64String.startsWith('data:image');
  }
};
