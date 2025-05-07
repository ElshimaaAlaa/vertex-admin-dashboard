import React from "react";
import { Helmet } from "react-helmet";
function AllPermissions() {
  return (
    <div className="h-[89vh]">
      <Helmet>
        <title>Roles | Vertex</title>
      </Helmet>
      <section className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13">Permissions / Roles</p>
        <h3 className="font-bold mt-2 text-16">Roles</h3>
      </section>
      
    </div>
  );
}

export default AllPermissions;
