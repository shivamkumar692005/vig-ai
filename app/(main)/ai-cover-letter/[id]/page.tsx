import React from "react";

const CoverLetter = async ({ params }: { params: { id: string } }) => {
  const id = params.id; // No need to use await here
  console.log(id);
  return <div>CoverLetter: {id}</div>;
};

export default CoverLetter;