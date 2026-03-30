"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHotel } from "../api/create-hotel";

export function useCreateHotel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
  });
}
