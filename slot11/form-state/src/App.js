import React, { useState } from "react";

function App() {
  const [name, setName] = useState("Adam");
  const [age, setAge] = useState(35);
  return (
    <>
      <selection>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>My name is {name}.</p>
      </selection>
      <selection>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <p>My age is {age}.</p>
      </selection>
    </>
  );
}
