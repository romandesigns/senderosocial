"use server";

export const createAccountAction = async (formData: FormData) => {
  console.log(formData);
  return { success: true };
};
