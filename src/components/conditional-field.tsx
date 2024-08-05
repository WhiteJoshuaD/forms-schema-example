import { useWatch } from "react-hook-form";

export function ConditionalField({
  conditions,
  mode = "allOf",
  children,
}: {
  conditions: [string, string][];
  mode?: "allOf" | "anyOf";
  children: React.ReactNode;
}) {
  const fieldsToWatch = conditions.map(([key]) => key);
  const values = useWatch({ name: fieldsToWatch });

  const shouldShow =
    mode === "anyOf"
      ? conditions.some((_, index) => {
          const fieldValue = values[index];
          return fieldValue === conditions[index][1];
        })
      : values.every((value, index) => {
          return value === conditions[index][1];
        });

  return shouldShow ? <>{children}</> : null;
}
