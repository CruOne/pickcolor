export const putToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};
