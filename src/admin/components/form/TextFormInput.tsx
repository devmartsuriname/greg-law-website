import { type InputHTMLAttributes } from 'react';
import { FormControl, FormGroup, FormLabel, type FormControlProps } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

type FormInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
  containerClassName?: string;
  label?: string | React.ReactNode;
  labelClassName?: string;
  noValidate?: boolean;
};

const TextFormInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  containerClassName: containerClass,
  control,
  id,
  label,
  noValidate,
  labelClassName: labelClass,
  ...other
}: FormInputProps<TFieldValues> & FormControlProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Controller
      name={name}
      defaultValue={'' as any}
      control={control}
      render={({ field, fieldState }) => (
        <FormGroup className={containerClass}>
          {label &&
            (typeof label === 'string' ? (
              <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel>
            ) : (
              <>{label}</>
            ))}
          <FormControl id={id ?? name} {...other} {...field} isInvalid={Boolean(fieldState.error?.message)} />
          {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
        </FormGroup>
      )}
    />
  );
};

export default TextFormInput;
