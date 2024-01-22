function getDragAfterElement(container: Element, y: number): HTMLElement | null {
  const draggableElements = [...container.querySelectorAll('.drag__wrapper:not(.blurred)')];
  const result = draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child } as { offset: number; element: HTMLElement };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null } as
      | { offset: number; element: HTMLElement }
      | { offset: number; element: null }
  );

  return result.element || null;
}

export default function dragTest(itemName: string): void {
  const draggable = document.querySelectorAll(`.${itemName}`);

  draggable.forEach((elem) => {
    elem.addEventListener('dragstart', () => {
      elem.classList.add('blurred');
    });

    elem.addEventListener('dragend', () => {
      elem.classList.remove('blurred');
    });
  });

  const containers = document.querySelectorAll('.drop__zone');
  containers.forEach((container) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (container as any).addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(container as Element, e.clientY);
      const current = document.querySelector('.blurred') as Node;
      if (afterElement === null) {
        container.appendChild(current);
      } else {
        container.insertBefore(current, afterElement);
      }
    });
  });
}
