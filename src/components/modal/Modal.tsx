import { useDisclosure } from '@mantine/hooks';
import { Modal as ModalMantine } from '@mantine/core';
import Button from '@/components/button';
import Heading from '@/components/heading';
interface ModalProps {
  text: string;
  title?: string;
  children: (props: { closeModal: () => void }) => React.ReactNode;
}

const Modal = ({ text, title, children }: ModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ModalMantine.Root opened={opened} onClose={close}>
        <ModalMantine.Overlay className="opacity-10" />

        <ModalMantine.Content>
          <ModalMantine.Header className="bg-main-card-background">
            <ModalMantine.Title>{title && <Heading label={title} variant="h2" />}</ModalMantine.Title>
            <ModalMantine.CloseButton className="hover:bg-main-primary-text" />
          </ModalMantine.Header>

          <ModalMantine.Body className="bg-main-card-background">{children({ closeModal: close })}</ModalMantine.Body>
        </ModalMantine.Content>
      </ModalMantine.Root>

      <Button type="button" variant="primary" text={text} onClick={open} />
    </>
  );
};

export default Modal;
