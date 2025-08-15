import React from "react";
import MyForm from "./components/MyForm";
import FormEx4 from "./components/FormEx4";

const App = () => {
  const handleFormSubmit = (formData) => {
    console.log("Dữ liệu đã gửi:", formData);
  };

  return (
    <div className="App">
      <FormEx4 title="Đăng Ký Người Dùng" onSubmit={handleFormSubmit} />
    </div>
  );
};

export default App;
