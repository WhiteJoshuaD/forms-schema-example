import { useWatch } from "react-hook-form";

import { evaluateCondition } from "@/lib/utils";

type ComparisonOperator =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "contains"
  | "notContains";

export type Condition = {
  field: string;
  operator?: ComparisonOperator;
  value: string;
};

// TODO: Data is the type of form, which is infered from the schema
type CustomValidationFunction = (data: any, fieldName: string) => string | null;

export function ConditionalField({
  conditions,
  mode = "allOf",
  // This is a bit gross. This prop isn't used in the component, but only when
  // we use its props to figure out how to refine the schema.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  customValidation,
  children,
}: {
  conditions: Condition[];
  mode?: "allOf" | "anyOf";
  customValidation: CustomValidationFunction;
  children: React.ReactNode;
}) {
  const fieldsToWatch = conditions.map((c) => c.field);
  const values = useWatch({ name: fieldsToWatch });

  const shouldShow =
    mode === "anyOf"
      ? conditions.some((condition, index) =>
          evaluateCondition(condition, values[index])
        )
      : conditions.every((condition, index) =>
          evaluateCondition(condition, values[index])
        );

  return shouldShow ? <>{children}</> : null;
}
