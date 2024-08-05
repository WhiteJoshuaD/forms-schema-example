import { queryOptions } from "@tanstack/react-query";

// This would get the values from an API
function fetchCreditTypes() {
  return [
    { id: 1, name: "AMA/PRA Category 1" },
    { id: 2, name: "AAFP Prescribed" },
    { id: 3, name: "AANC" },
    { id: 4, name: "Attendance without Credit" },
  ];
}

export const getCreditTypesQueryOptions = () => {
  return queryOptions({
    queryKey: ["creditTypes"],
    queryFn: fetchCreditTypes,
  });
};
