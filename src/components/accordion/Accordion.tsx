import { ComponentProps, forwardRef, ReactNode } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';

// Define types for the props used in the components
interface AccordionItemProps extends ComponentProps<typeof Accordion.Item> {
  children: ReactNode;
  className?: string;
}

interface AccordionTriggerProps extends ComponentProps<typeof Accordion.Trigger> {
  children: ReactNode;
  className?: string;
}

interface AccordionContentProps extends ComponentProps<typeof Accordion.Content> {
  children: ReactNode;
  className?: string;
}

interface AccordionItemData {
  value: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionDemoProps {
  items: AccordionItemData[];
}

const AccordionDemo = ({ items }: AccordionDemoProps) => (
  <Accordion.Root
    className="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    {items.map((item) => (
      <AccordionItem key={item.value} value={item.value}>
        <AccordionTrigger>{item.trigger}</AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion.Root>
);

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={clsx(
        'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
);

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={clsx(
          'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={clsx(
        'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5">{children}</div>
    </Accordion.Content>
  ),
);

export default AccordionDemo;
