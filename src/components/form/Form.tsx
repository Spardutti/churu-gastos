import Alert from '@/components/alert';
import Button from '@/components/button';
import type { FormInputs } from '@/components/form/types';
import Select from '@/components/input/Select';
import Textfield from '@/components/input/Textfield';
import type { Path, FieldValues, UseFormReturn } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AnyObjectSchema } from 'yup';

interface FormProps<T extends FieldValues> {
  inputs: FormInputs[];
  submit: (data: T) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  response?: { type: 'success' | 'error'; message: string };
  schema: AnyObjectSchema;
}

const Form = <T extends FieldValues>({ inputs, submit, submitLabel, isSubmitting, response, schema }: FormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<T> = useForm<T>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: T) => {
    await submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-grow gap-4 flex-col">
      {inputs.map((input, index) => {
        const { label, name, placeholder, inputType } = input;

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

      <div className="flex justify-end">
        <Button variant="primary" type="submit" text={submitLabel} isLoading={isSubmitting} />
      </div>
    </form>
  );
};

export default Form;
