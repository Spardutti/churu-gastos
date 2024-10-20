import { Pill as MantinePill } from '@mantine/core';
import clsx from 'clsx';
interface PillPros {
  size: 'sm' | 'md' | 'lg';
  label: string;
  variant: 'default' | 'danger';
}
const Pill = ({ size, label, variant }: PillPros) => {
  const variants = {
    default: 'bg-main-card-background text-main-secondary-text',
    danger: 'bg-main-card-background text-danger-main',
  };

  return (
    <MantinePill className={clsx(variants[variant])} size={size}>
      {label}
    </MantinePill>
  );
};

export default Pill;
