export function useClientPromise<T>(
  fn: (
    formData: FormData
  ) => Promise<{ success: true; data: T } | { success: false; error: string }>
) {
  return async (formData: FormData) => {
    const foo = await fn(formData);
    if (!foo.success) throw foo.error;
    return foo.data;
  };
}
