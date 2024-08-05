import { z } from "zod";

import { TextField } from "@/components/text-field";

import { standardConfig } from "@/form-configs/standard";

// Keep everything from the standard config but customize deliveryFormats field
const basicInformation = {
  ...standardConfig.basicInformation,
  introText: "Here is some custom intro text specifically for Texas Childrens.",
  fields: {
    ...standardConfig.basicInformation.fields,
    deliveryMethod: {
      validation: z.string().min(1, "Required"),
      element: (
        <TextField
          name="deliveryMethod"
          label="Super Special Delivery Method"
        />
      ),
    },
  },
};

export const texasChildrensConfig = {
  ...standardConfig,
  basicInformation,
};
