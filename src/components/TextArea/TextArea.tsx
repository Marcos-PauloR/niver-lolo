import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  control,
  rules,
  placeholder,
}) => {
  return (
    <div className={styles.TextArea}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            <textarea
              {...field}
              className={styles.input}
              placeholder={placeholder}
              rows={6}
            />
            {error && <span>{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default TextArea;
