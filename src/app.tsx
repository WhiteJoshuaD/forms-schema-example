import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplicationForm } from "@/components/application-form";
import { ConfigProvider } from "@/components/config-provider";
import { standardConfig } from "@/form-configs/standard";
import { texasChildrensConfig } from "@/form-configs/texas-childrens";

const queryClient = new QueryClient();

export default function App() {
  const [config, setConfig] = useState("standard");

  const activeConfig =
    config === "standard" ? standardConfig : texasChildrensConfig;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Select value={config} onValueChange={(val) => setConfig(val)}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Select an activity format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard">Standard Form</SelectItem>
            <SelectItem value="texas">Texas Children's</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConfigProvider config={activeConfig}>
            <ApplicationForm />
          </ConfigProvider>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
}
