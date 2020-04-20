export const getCopySvgInline = (icon: any) => {
  return `<svg viewBox="0 0 24 24"><path fill="currentColor" d="${icon.data}"/></svg>`;
}