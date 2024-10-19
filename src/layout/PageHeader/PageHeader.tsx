import Button from '@/components/button';
import Heading from '@/components/heading';
import useNavigateWithParams from '@/hooks/useNavigateWithParams';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';

interface PageHeaderProps {
  backText: string;
  title: string;
  onClick?: () => void;
}

const PageHeader = ({ backText, title, onClick }: PageHeaderProps) => {
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
        <Heading label={title} variant="h4" />
      </div>

      {onClick && <Button onClick={onClick} variant="danger" type="button" text="Delete" prependIcon={<IconTrash />} />}
    </div>
  );
};

export default PageHeader;
