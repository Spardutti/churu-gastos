import Alert from '@/components/alert';
import Button from '@/components/button';
import type { FormInputs } from '@/components/form/types';
import Select from '@/components/input/Select';
import Textfield from '@/components/input/Textfield';
import type { Path, FieldValues, UseFormReturn } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AnyObjectSchema } from 'yup';
import clsx from 'clsx';

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  }: UseFormReturn<T> = useForm<T>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: T) => {
    await submit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx('flex flex-grow gap-4', className)}>
      {inputs.map((input, index) => {
        const { label, name, placeholder, inputType, value } = input;

        if (inputType === 'select') {
          return (
            <div key={index + name}>
              <Controller
                name={name as Path<T>}
                control={control}
                render={({ field }) => (
                  <Select
                    label={label}
                    options={input.options}
                    placeholder={placeholder}
                    onChange={(e) => field.onChange(e)}
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
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={name}
                      className="h-4 w-4 text-primary-main border-gray-300 rounded"
                      onChange={(e) => field.onChange(e.target.checked)}
                      defaultChecked={value}
                    />
                    <label htmlFor={name} className="text-sm text-gray-900">
                      {label}
                    </label>
                  </div>
                )}
              />
              {errors[name]?.message && <p className="text-danger-main">{errors[name]?.message as React.ReactNode}</p>}
            </div>
          );
        }

        return (
          <div key={index + name}>
            <Controller
              name={name as Path<T>}
              control={control}
              render={({ field }) => (
                <Textfield
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
