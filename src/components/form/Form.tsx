import Alert from '@/components/alert';
import Button from '@/components/button';
import { FormInputs } from '@/components/form/types';
import Select from '@/components/input/Select';
import Textfield from '@/components/input/Textfield';
import { Controller, Path, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObjectSchema } from 'yup';

interface FormProps<T> {
  inputs: FormInputs[];
  submit: (data: T) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
  response?: { type: 'success' | 'error'; message: string };
  schema: AnyObjectSchema;
}

const Form = <T extends Record<string, string | number | {} | []>>({
  inputs,
  submit,
  submitLabel,
  isSubmitting,
  response,
  schema,
}: FormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ resolver: yupResolver(schema) });

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
            <div key={index + name}>
              <Controller
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
              {errors && errors[name] && <p className="text-red-500">{errors[name]?.message as string}</p>}
            </div>
          );
        }

        if (label) {
          return (
            <div key={index + name}>
              <Controller
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
              {errors && errors[name] && <p className="text-red-500">{errors[name]?.message as string}</p>}
            </div>
          );
        }

        return (
          <div key={index + name}>
            <Controller
              key={index + name}
              name={name as Path<T>}
              control={control}
              render={({ field }) => (
                <Textfield type={type} value={field.value} placeholder={placeholder} onChange={field.onChange} />
              )}
            />
            {errors && errors[name] && <p className="text-red-500">{errors[name]?.message as string}</p>}
          </div>
        );
      })}
      {response && (
        <div>
          <Alert type={response.type} message={response?.message} />
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" text={submitLabel} isLoading={isSubmitting} />
      </div>
    </form>
  );
};

export default Form;
