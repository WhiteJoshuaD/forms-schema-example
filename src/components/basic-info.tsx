import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Separator } from "@/components/ui/separator";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  createZodSchemaFromConfig,
  getDefaultValuesFromConfig,
} from "@/lib/utils";
import { useConfig } from "@/components/config-provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getBasicInformationQueryOptions } from "@/api/get-basic-information";

const FORM_NAME = "basicInformation";

export function BasicInfo({ applicationId }: { applicationId?: number }) {
  const { data } = useSuspenseQuery(
    getBasicInformationQueryOptions(applicationId ?? 0)
  );
  const config = useConfig();
  const schema = createZodSchemaFromConfig(config, FORM_NAME);
  const defaultValues = getDefaultValuesFromConfig(config, FORM_NAME);
  const fields = Object.entries(config[FORM_NAME].fields);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),

    // Values from API will overwrite default values from config
    defaultValues: {
      ...defaultValues,
      ...(applicationId && data), // Only include data is applicationId is defined
    },
  });

  return (
    <div className="flex-1 space-y-20">
      <section>
        <h2 className="font-semibold">Activity Information</h2>
        <p className="text-sm text-muted-foreground mt-2 empty:hidden">
          {config.basicInformation.introText}
        </p>
        <Separator className="my-4" />
        <Form {...form}>
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit((data) => console.log(data))}
          >
            {fields.map(([key, field]) => (
              <div key={key}>{field.element}</div>
            ))}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
