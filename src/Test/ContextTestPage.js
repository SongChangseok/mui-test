import React from "react";
import ContextConsumerTest from "./ContextConsumerTest";
import { ContextProviderTest } from "./ContextProviderTest";

export default function ContextTestPage() {
  return (
    <ContextProviderTest>
      <ContextConsumerTest />
    </ContextProviderTest>
  );
}
