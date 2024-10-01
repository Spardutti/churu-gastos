import Alert from '@/components/alert';
import Button from '@/components/button';
import type { FormInputs } from '@/components/form/types';
import Select from '@/components/input/Select';
import Textfield from '@/components/input/Textfield';
import type { Path, FieldValues, UseFormReturn, DefaultValues } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AnyObjectSchema } from 'yup';
import clsx from 'clsx';
import Checkbox from '@/components/input/Checkbox';

interface FormProps<T extends FieldValues> {
  inputs: FormInputs[];
  submit: (data: T) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  response?: { type: 'success' | 'error'; message: string };
  schema: AnyObjectSchema;
  direction?: 'col' | 'row';
  className?: string;
}

const Form = <T extends FieldValues>({
  inputs,
  submit,
  submitLabel,
  isSubmitting,
  response,
  schema,
  className,
}: FormProps<T>) => {
  const formDefaultValues = inputs?.reduce((acc: { [key: string]: string | boolean }, input) => {
    if (input.inputType === 'checkbox') {
      return {
        ...acc,
        [input.name]: false,
      };
    }
    acc[input.name] = '';

    return acc;
  }, {});
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  }: UseFormReturn<T> = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues as DefaultValues<T>,
  });

  const onSubmit = async (data: T) => {
    await submit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx('flex flex-grow gap-4 items-center', className)}>
      {inputs.map((input, index) => {
        const { label, name, placeholder, inputType, min } = input;

        if (inputType === 'select') {
          return (
            <div key={index + name} className='self-stretch'>
              <Controller
                name={name as Path<T>}
                control={control}
                render={({ field }) => (
                  <Select
                    label={label}
                    options={input.options}
                    placeholder={placeholder}
                    value={field.value}
                    onChange={(selectedValue) => field.onChange(selectedValue)}
                  />
                )}
              />
              {errors[name]?.message && <p className="text-danger-main">{errors[name]?.message as React.ReactNode}</p>}
            </div>
          );
        }

        if (inputType === 'checkbox') {
          return (
            <div key={index + name}>
              <Controller
                name={name as Path<T>}
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label={input.label!}
                    defaultChecked={false}
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                )}
              />
              {errors[name]?.message && <p className="text-danger-main">{errors[name]?.message as React.ReactNode}</p>}
            </div>
          );
        }

        return (
          <div className="self-stretch" key={index + name}>
            <Controller
              name={name as Path<T>}
              control={control}
              render={({ field }) => (
                <Textfield
                  min={min}
                  type={inputType}
                  label={label}
                  value={field.value}
                  placeholder={placeholder}
                  onChange={field.onChange}
                />
              )}
            />
            {errors[name]?.message && <p className="text-danger-main">{errors[name]?.message as React.ReactNode}</p>}
          </div>
        );
      })}

      {response && (
        <div>
          <Alert type={response.type} message={response.message} />
        </div>
      )}

      <div className="flex justify-end items-end">
        <div>
          <Button variant="primary" type="submit" text={submitLabel} isLoading={isSubmitting} />
        </div>
      </div>
    </form>
  );
};

export default Form;
