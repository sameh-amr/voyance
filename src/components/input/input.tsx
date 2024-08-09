const InputComponent = (props: {
  type: string;
  name: string;
  className: string;
  id: string;
  placeHolder: string;
  required: boolean;
  value: string;
  disabled: boolean;
  onChange?: (value: string) => void;
}) => {
  const {
    type,
    name,
    className,
    id,
    placeHolder,
    required,
    value,
    disabled,
    onChange,
  } = props;
  return (
    <input
      type={type ?? ""}
      name={name ?? ""}
      className={className ?? ""}
      value={value}
      id={id ?? ""}
      placeholder={placeHolder ?? ""}
      required={required}
      disabled={disabled}
      onChange={(e: any) => onChange && onChange(e.target.value)}
    />
  );
};

export default InputComponent;
