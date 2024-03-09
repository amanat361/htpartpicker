export function useClientPromise<T>(
  fn: (
    formData: FormData
  ) => Promise<{ success: true; data: T } | { success: false; error: string }>
) {
  return async (formData: FormData) => {
    try {
      const foo = await fn(formData);
      if (!foo.success) throw foo.error;
      return foo.data;
    } catch (error) {
      if (typeof error === "string") throw error;
      throw "The server is not available. Please try again later.";
    }
  };
}
