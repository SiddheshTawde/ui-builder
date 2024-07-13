import { FC } from "react";

import { Button } from "@root/components/ui/button";
import { TrashIcon } from "@heroicons/react/24/outline";

export type DeleteElementProps = {
  id: string;
  removeElement: (id: string) => void;
};

export const DeleteElement: FC<{
  removeElement: (id: string) => void;
  id: string;
}> = ({ id, removeElement }) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-fit w-fit p-0"
      onClick={() => removeElement(id)}
    >
      <TrashIcon className="h-3 w-3" />
    </Button>
  );
};
