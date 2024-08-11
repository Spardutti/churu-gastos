import Button from '@/components/button';
import { FormInputs } from '@/components/form/types';
import Select from '@/components/input/Select';
import Textfield from '@/components/input/Textfield';
import { Controller, Path, useForm } from 'react-hook-form';

interface FormProps<T> {
  inputs: FormInputs[];
  submit: (data: T) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
}

const Form = <T extends Record<string, string | number | {} | []>>({
  inputs,
  submit,
  submitLabel,
  isSubmitting,
}: FormProps<T>) => {
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
      {inputs?.map((input, index) => {
        const { type, label, name, placeholder, inputType } = input;

        if (inputType === 'select') {
          const { options } = input;
          return (
            <Controller
              key={index + name}
              name={name as Path<T>}
              control={control}
              render={({ field }) => (
                <Select
                  label={label}
                  options={options}
                  placeholder={placeholder}
                  onChange={(e) => field.onChange({ id: e, name: field.name })}
                />
              )}
            />
          );
        }
        if (label) {
          return (
            <Controller
              key={index + name}
              name={name as Path<T>}
              control={control}
              render={({ field }) => (
                <Textfield
                  type={type}
                  label={label}
                  value={field.value}
                  placeholder={placeholder}
                  onChange={field.onChange}
                />
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
              <Textfield type={type} value={field.value} placeholder={placeholder} onChange={field.onChange} />
            )}
          />
        );
      })}

      <div className="flex justify-end">
        <Button type="submit" text={submitLabel} isLoading={isSubmitting} />
      </div>
    </form>
  );
};

export default Form;
