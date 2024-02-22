"use client";

import React, { useEffect } from "react";

export const ReportView: React.FC<{ id: string }> = ({ id }) => {
  useEffect(() => {
    fetch("/api/incr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
  }, [id]);

  return null;
};