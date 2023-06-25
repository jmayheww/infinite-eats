import React from "react";

function Checkbox({ checked, onChange }) {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-accent focus:outline-none"
      />
    </label>
  );
}

export default Checkbox;
