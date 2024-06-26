import { useRef, useState } from "react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
// Components
import BookmarksPopover from "./BookmarksPopover";
import { useOnClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
  // STATE 1
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([buttonRef, popoverRef], () => setIsOpen(false));

  return (
    <section>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>

      {isOpen && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
