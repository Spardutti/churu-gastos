import Button from '@/components/button';
import Textfield from '@/components/input/Textfield';
import { Controller, Path, useForm } from 'react-hook-form';

interface Inputs {
  type: string;
  value: string;
  label: string | undefined;
  name: string;
  placeholder: string | undefined;
}

interface FormProps<T> {
  inputs: Inputs[];
  submit: (data: T) => Promise<void>;
}

const Form = <T extends Record<string, string | number | {} | []>>({ inputs, submit }: FormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>();

  const onSubmit = async (data: T) => {
    await submit(data);
  };

  return (
    <form className="flex flex-col gap-4 flex-grow" onSubmit={handleSubmit(onSubmit)}>
      {inputs?.map(({ type, label, name, placeholder }, index) => {
        if (label) {
          return (
            <Controller
              key={index + name}
              name={name as Path<T>}
              control={control}
              render={({ field }) => (
                <Textfield type={type} label={label} name={field.name} value={field.value} placeholder={placeholder} />
              )}
            />
          );
        }
        return (
          <Controller
            key={index + name}
            name={name as Path<T>}
            control={control}
            render={({ field }) => (
              <Textfield type={type} name={field.name} value={field.value} placeholder={placeholder} />
            )}
          />
        );
      })}

      <div className="flex">
        <Button type="submit" text="Submit" />
      </div>
    </form>
  );
};

export default Form;
