import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, type ZodType } from "zod";

import { SectionConfig, type Config } from "@/form-configs/standard";
import {
  ConditionalField,
  type Condition,
} from "@/components/conditional-field";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function evaluateCondition(
  condition: Condition,
  fieldValue: string
): boolean {
  const { value } = condition;
  const operator = condition?.operator || "eq";

  switch (operator) {
    case "eq":
      return fieldValue === value;
    case "neq":
      return fieldValue !== value;
    case "gt":
      return fieldValue > value;
    case "gte":
      return fieldValue >= value;
    case "lt":
      return fieldValue < value;
    case "lte":
      return fieldValue <= value;
    case "contains":
      return fieldValue.includes(value);
    case "notContains":
      return !fieldValue.includes(value);
    default:
      return false;
  }
}

export function createZodSchemaFromConfig(config: Config, form: keyof Config) {
  const fields = Object.entries(config[form].fields);

  const schemaObject: Record<string, ZodType> = {};

  fields.forEach(([fieldName, fieldConfig]) => {
    schemaObject[fieldName] = fieldConfig.validation || z.any();
  });

  // Create a base schema using the validation rules defined for each field.
  const baseSchema = z.object(schemaObject);

  return baseSchema.superRefine((data, ctx) => {
    fields.forEach(([fieldName, fieldConfig]) => {
      if ("element" in fieldConfig) {
        const element = fieldConfig.element as React.ReactElement;

        // We only need to refine on ConditionalFields, since validation rules
        // for non-conditional fields are defined in the base schema.
        if (element.type === ConditionalField) {
          const { conditions, mode, customValidation } =
            element.props as React.ComponentProps<typeof ConditionalField>;

          // Compare values in form data to the conditions defined on the
          // ConditionalField. Produces an array of booleans indicating whether
          // each condition is met. This means we can only check for equality.
          // For example, we can't say "show this field if another field's value
          // is *not* equal to foo".
          const conditionsMet = conditions.map((condition: Condition) =>
            evaluateCondition(condition, data[condition.field])
          );

          // Based on the mode, determine whether the field is required. If the
          // mode is "allOf", every value in conditionsMet must be the boolean
          // value true. If the mode is "anyOf", conditionsMet must contain at
          // least one boolean value true.
          const isRequired =
            mode === "allOf"
              ? conditionsMet.every(Boolean)
              : conditionsMet.some(Boolean);

          if (isRequired) {
            const customError = customValidation(data, fieldName);

            if (customError) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: customError,
                path: [fieldName],
              });
            }
          }
        }
      }
    });
  });
}

type DefaultValues<T extends SectionConfig> = {
  [K in keyof T["fields"]]: T["fields"][K]["defaultValue"];
};

export function getDefaultValuesFromConfig(config: Config, form: keyof Config) {
  const defaultValues: DefaultValues<Config[typeof form]> = {};

  Object.entries(config[form].fields).forEach(([name, field]) => {
    defaultValues[name] = field?.defaultValue ?? "";
  });

  return defaultValues;
}
