export const Focus = {
  mounted(el: HTMLElement) {
    const input =
      (el.querySelector('input:not([type="hidden"]') as HTMLElement) || el;
    input.focus();
  },
};

export default Focus;
