import {
  type FieldName,
  type FieldValues,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

type CreditTypesProps<T extends FieldValues> = {
  name: FieldName<T>;
  label: string;
  defaultValue?: { id: number; name: string }[];
  description?: string;
};

export function CreditTypes<T extends FieldValues>({
  name,
  label,
  defaultValue = [{ id: 0, name: "" }],
  description,
}: CreditTypesProps<T>) {
  const { control, getValues, reset, watch } = useFormContext();

  const { fields, append } = useFieldArray({
    name,
    control,
    keyName: "key",
  });

  const watchFieldArray = watch(name);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  useEffect(() => {
    if (defaultValue && controlledFields.length === 0) {
      defaultValue.forEach((field, index) => {
        append(field);
      });
    }
  }, [append, controlledFields, defaultValue, name]);

  // const calledOnce = useRef(false);

  // useEffect(() => {
  //   reset({ ...getValues(), credits: defaultValue });
  // }, [reset, defaultValue, getValues]);

  return (
    <div>
      {controlledFields.map((field, index) => (
        <div key={field.key}>
          <FormField
            control={control}
            name={`credits.${index}.id`}
            defaultValue={defaultValue[index]?.id}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && "sr-only")}>
                  Credit Type
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`credits.${index}.name`}
            defaultValue={defaultValue[index]?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(index !== 0 && "sr-only")}>
                  Amount
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2"
        onClick={() => append({ id: 0, name: "" })}
      >
        Add Credit Type
      </Button>
    </div>
  );
}
