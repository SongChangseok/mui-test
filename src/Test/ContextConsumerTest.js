import React, { useState } from "react";
import { useContextTest } from "./ContextProviderTest";

export default function ContextConsumerTest() {
  const { data, addData, removeData } = useContextTest();
  const [targetRecipe, setTargetRecipe] = useState();

  return (
    <div>
      {data.map((recipe, i) => (
        <span key={i} style={{ display: "block" }}>
          {recipe.name}
        </span>
      ))}
      <input
        type="text"
        onChange={(e) => setTargetRecipe({ name: e.target.value })}
      />
      <button onClick={() => addData(targetRecipe)}>Add</button>
      <button onClick={() => removeData(targetRecipe.name)}>Remove</button>
    </div>
  );
}
