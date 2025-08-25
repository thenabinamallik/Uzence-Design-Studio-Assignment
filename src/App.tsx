import React, { useState } from "react";
import { InputField } from "./components/InputField/InputField";
import { DataTable } from "./components/DataTable/DataTable";

interface User {
  name: string;
  email: string;
  age: number;
}

const sampleData: User[] = [
  { name: "Alice", email: "alice@example.com", age: 25 },
  { name: "Bob", email: "bob@example.com", age: 30 },
  { name: "Charlie", email: "charlie@example.com", age: 22 },
];

export default function App() {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState<User[]>([]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Demo App</h1>

      {/* InputField Demo */}
      <InputField
        label="Username"
        placeholder="Enter your name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Type your username"
        variant="outlined"
      />

      {/* DataTable Demo */}
      <DataTable<User>
        data={sampleData}
        columns={[
          { key: "name", title: "Name", dataIndex: "name", sortable: true },
          { key: "email", title: "Email", dataIndex: "email" },
          { key: "age", title: "Age", dataIndex: "age", sortable: true },
        ]}
        selectable
        onRowSelect={setSelected}
      />

      {selected.length > 0 && (
        <div className="mt-4 text-sm text-gray-700">
          Selected users: {selected.map((u) => u.name).join(", ")}
        </div>
      )}
    </div>
  );
}
