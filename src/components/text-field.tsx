import {
  type FieldName,
  type FieldValues,
  useFormContext,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type TextFieldProps<T extends FieldValues> = {
  name: FieldName<T>;
  label: string;
  type?: string;
  description?: string;
};

export function TextField<T extends FieldValues>(props: TextFieldProps<T>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input {...field} type={props.type || "text"} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
