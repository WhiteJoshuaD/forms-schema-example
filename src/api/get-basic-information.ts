import { queryOptions } from "@tanstack/react-query";

// This would get the values from an API
function fetchBasicInformation(applicationId: number) {
  return {
    id: applicationId,
    name: "Grand Rounds 2025",
    amaActivityFormat: "3",
    deliveryMethod: "Live Event",
    // location: "Nashville, TN",
  };
}

export const getBasicInformationQueryOptions = (applicationId: number) => {
  return queryOptions({
    queryKey: ["basicInformation", applicationId],
    queryFn: () => fetchBasicInformation(applicationId),
  });
};
