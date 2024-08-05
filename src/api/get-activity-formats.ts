import { queryOptions } from "@tanstack/react-query";

// This would get the values from an API
function fetchActivityFormats() {
  return [
    { id: 1, format: "Live Activity" },
    { id: 2, format: "Journal-Based Activity" },
    { id: 3, format: "Manuscript Review" },
    { id: 4, format: "Internet Point-of-Care" },
    { id: 5, format: "Enduring Material" },
  ];
}

export const getActivityFormatsQueryOptions = () => {
  return queryOptions({
    queryKey: ["activityFormats"],
    queryFn: fetchActivityFormats,
  });
};
