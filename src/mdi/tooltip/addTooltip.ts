export function addTooltip($part, render) {
  function handleMouseEnter() {
    $part.dispatchEvent(
      new CustomEvent('tooltip', {
        detail: {
          visible: true,
          rect: $part.getBoundingClientRect(),
          text: render()
        },
        bubbles: true,
        composed: true
      })
    );
  }

  function handleMouseLeave() {
    $part.dispatchEvent(
      new CustomEvent('tooltip', {
        detail: {
          visible: false
        },
        bubbles: true,
        composed: true
      })
    );
  }

  $part.addEventListener('mouseenter', handleMouseEnter);
  $part.addEventListener('mouseleave', handleMouseLeave);
}