"use client";

type Props = {
  text: string;
  type: string;
  placeholder: string;
  name: string;
  required: boolean;
  className?: string;
};

export function Input({
  text,
  type = "text",
  placeholder,
  name,
  required,
  className = "",
}: Props) {
  return (
    <label className="flex flex-col gap-1">
      <p>{text}</p>
      <input
        className={"p-3 rounded border-2 outline-none w-full text-black" + className}
        placeholder={placeholder}
        type={type}
        name={name}
        required={required}
      />
    </label>
  );
}
