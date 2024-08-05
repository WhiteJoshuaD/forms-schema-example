import { z } from "zod";

import { AmaActivityFormats } from "@/components/ama-activity-formats";
import { CreditTypes } from "@/components/credit-types";
import { TextField } from "@/components/text-field";

export type SectionConfig = {
  introText?: string;
  fields: Record<
    string,
    {
      defaultValue?: unknown;
      validation: z.ZodType;
      element: JSX.Element;
    }
  >;
};

export type Config = {
  basicInformation: SectionConfig;
  credits: SectionConfig;
};

export const basicInformation = {
  introText: "Please provide your details below.",
  fields: {
    name: {
      defaultValue: "",
      validation: z.string().min(1, "Required"),
      element: <TextField name="name" label="Activity Name" />,
    },
    amaActivityFormat: {
      defaultValue: "",
      validation: z.string().min(1, "Required"),
      element: <AmaActivityFormats />,
    },
    deliveryMethod: {
      defaultValue: "",
      validation: z.string().min(1, "Please select a delivery method"),
      element: <TextField name="deliveryMethod" label="Delivery Method" />,
    },
    location: {
      defaultValue: "",
      validation: z.string().optional(),
      element: <TextField name="location" label="Location" />,
    },
  },
};

export const credits = {
  introText: "",
  fields: {
    credits: {
      defaultValue: [{ id: 0, name: "" }],
      validation: z
        .array(z.object({ id: z.number(), name: z.string() }))
        .min(1, "Select at least one credit type."),
      element: <CreditTypes name="credits" label="Credit Name" />,
    },
  },
};

export const standardConfig: Config = {
  basicInformation,
  credits,
};
