import Button from '@/components/button';
import Heading from '@/components/heading';
import useNavigateWithParams from '@/hooks/useNavigateWithParams';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  backText: string;
  title: string;
  onClick?: () => void;
  subtitle?: string;
  children?: ReactNode;
}

const PageHeader = ({ backText, title, onClick, subtitle, children }: PageHeaderProps) => {
  const onNavigate = useNavigateWithParams();

  return (
    <div className="flex justify-between items-center w-full relative">
      <Button
        variant="ghost"
        type="button"
        text={backText}
        prependIcon={<IconArrowLeft />}
        onClick={() => onNavigate({ pathname: -1 })}
      />

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col gap-2 items-center">
          <Heading color="default" label={title} variant="h4" />
          {subtitle && <Heading color="light" label={subtitle} variant="h6" />}
        </div>
      </div>

      {onClick && <Button onClick={onClick} variant="danger" type="button" text="Delete" prependIcon={<IconTrash />} />}
      {children}
    </div>
  );
};

export default PageHeader;
