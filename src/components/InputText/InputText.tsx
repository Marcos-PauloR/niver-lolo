import React from "react";
import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import styles from "./InputText.module.css";

interface InputTextProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute | undefined;
  minValue?: string | number | undefined;
  maxValue?: string | number | undefined;
  withButton?: boolean;
  buttonClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const InputText: React.FC<InputTextProps> = ({
  name,
  label,
  control,
  rules,
  placeholder,
  type,
  minValue,
  maxValue,
  withButton,
  buttonClick,
}) => {
  return (
    <div className={styles.InputText}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.Input}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState: { error } }) => (
            <>
              <input
                {...field}
                className={styles.input}
                placeholder={placeholder}
                min={minValue}
                type={type}
                max={maxValue}
              ></input>
              {error && <span>{error.message}</span>}
            </>
          )}
        />
        {withButton ? (
          <button
            type="button"
            onClick={buttonClick}
            className={styles.ghostButton}
          >
            Adicionar
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default InputText;
