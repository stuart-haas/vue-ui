type CustomHTMLElement = {
  clickOutsideEvent: (event: Event) => void;
} & HTMLElement;

export const ClickOutside = {
  beforeMount(el: CustomHTMLElement, binding: any) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target as HTMLElement))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: CustomHTMLElement) {
    document.body.removeEventListener('click', el.clickOutsideEvent);
  },
};

export default ClickOutside;
