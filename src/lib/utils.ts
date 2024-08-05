import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z, type ZodType } from "zod";

import { SectionConfig, type Config } from "@/form-configs/standard";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createZodSchemaFromConfig(config: Config, form: keyof Config) {
  const schemaObject: Record<keyof Config[typeof form]["fields"], ZodType> = {};

  Object.entries(config[form].fields).forEach(([name, field]) => {
    schemaObject[name] = field.validation || z.any();
  });

  return z.object(schemaObject);
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
