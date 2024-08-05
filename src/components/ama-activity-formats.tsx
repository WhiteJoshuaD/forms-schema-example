import { useSuspenseQuery } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { getActivityFormatsQueryOptions } from "@/api/get-activity-formats";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type AmaActivityFormatsProps = Partial<{
  name: string;
  label: string;
  description: string;
}>;

export function AmaActivityFormats({
  label = "AMA Activity Format",
  description,
}: AmaActivityFormatsProps) {
  const { data: activityFormats } = useSuspenseQuery(
    getActivityFormatsQueryOptions()
  );

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="amaActivityFormat"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an activity format" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {activityFormats.map((activityFormat) => (
                <SelectItem
                  key={activityFormat.id}
                  value={activityFormat.id.toString()}
                >
                  {activityFormat.format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
