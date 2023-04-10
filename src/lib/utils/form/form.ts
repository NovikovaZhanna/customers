export function initializeFormValues<T>(
  values: T,
  form: React.MutableRefObject<any>
) {
  if (!form) return;

  Object.entries(values).forEach(([key, value]) => {
    if (!form.current) return;
    form.current[key].value = value;
  });
}

export const getFormValues = (form: HTMLFormElement | null) => {
  if (!form) {
    return null;
  }

  const formData = new FormData(form);

  return Object.fromEntries(formData);
};
