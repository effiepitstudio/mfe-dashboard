import React from "react";

const FormWrapper: React.FC = () => {
  const FormApp = React.lazy(() => import("@mfe-form/App"));

  return (
    <React.Suspense fallback={<div> Loading form...</div>}>
      <FormApp />
    </React.Suspense>
  );
};

export default FormWrapper;
