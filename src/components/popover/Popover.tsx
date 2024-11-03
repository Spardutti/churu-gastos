import { Popover as PopoverMantine } from '@mantine/core';
import type { ReactNode } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
}

const Popover = ({ trigger, content }: PopoverProps) => {
  return (
    <PopoverMantine position="top" withArrow shadow="md" withinPortal={false}>
      <PopoverMantine.Target>
        <div>{trigger}</div>
      </PopoverMantine.Target>
      <PopoverMantine.Dropdown className="bg-main-card-background">{content}</PopoverMantine.Dropdown>
    </PopoverMantine>
  );
};

export default Popover;
