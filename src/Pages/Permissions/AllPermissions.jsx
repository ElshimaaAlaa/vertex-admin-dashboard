import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPermissions } from "../../ApiServices/permissions";
import DeleteRole from "./DeleteRole";

function Roles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getPermissions(searchQuery);
        setRolesData(response || []);
      } catch (error) {
        console.error("Error fetching permission data:", error);
        setError(true);
        setRolesData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]); // Added searchQuery as dependency to refresh when searching

  const filteredRolesData = useMemo(() => {
    return rolesData.filter((role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rolesData, searchQuery]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const currentItems = useMemo(() => {
    return filteredRolesData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredRolesData, indexOfFirstItem, indexOfLastItem]);

  const pageCount = Math.ceil(filteredRolesData.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteSuccess = (deletedId) => {
    const updatedData = rolesData.filter((item) => item.id !== deletedId);
    setRolesData(updatedData);

    if (currentItems.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Check if role has specific permission
  const hasPermission = (role, permissionName) => {
    return role.permissions.some(perm => perm.name === permissionName);
  };

  return (
    <div className="bg-gray-100 flex flex-col h-[89vh]">
      <Helmet>
        <title>Roles | vertex</title>
      </Helmet>
      <section className="rounded-md p-5 mx-5 bg-white mt-5">
        <p className="text-12 text-gray-400">Permissions / Roles</p>
        <h1 className="mt-2 text-17 font-bold">Roles</h1>
      </section>
      <div className="bg-white rounded-md p-5 mx-5 my-3">
        <SearchBar
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
          text={"Add User Role"}
          value={searchQuery}
          onchange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(0);
          }}
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredRolesData.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No data match your search." : "No data found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 border-t border-b text-left cursor-pointer">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all categories"
                        />
                        User Role
                      </p>
                    </th>
                    <th className="px-6 py-3 border text-left">
                      Access Admin Panel
                    </th>
                    <th className="px-6 py-3 border text-left">Permissions</th>
                    <th className="px-6 py-3 border text-center w-12">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((role) => (
                    <tr key={role.id} className="border-t hover:bg-gray-50">
                      <td className="px-3 py-3 border-t text-14 border-r cursor-pointer">
                        <p className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select all categories"
                          />
                          {role.name}
                        </p>
                      </td>
                      <td className="text-left px-3 py-3">
                        {hasPermission(role, 'admin_access') ? (
                          <span className="text-green-500">Yes</span>
                        ) : (
                          <span className="text-red-500">No</span>
                        )}
                      </td>
                      <td className="text-left px-3 py-3 border-r border-l">
                        <div className="flex flex-wrap gap-2">
                          {role.permissions.map(permission => (
                            <span 
                              key={permission.id}
                              className="bg-gray-100 px-2 py-1 rounded text-xs"
                            >
                              {permission.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="text-left px-3 py-3">
                        <div className="flex justify-center items-center gap-2">
                          {/* Only show delete button if user has delete permission */}
                          {hasPermission(role, 'roles_delete') && (
                            <DeleteRole
                              id={role.id}
                              onDelete={handleDeleteSuccess}
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              forcePage={currentPage}
              containerClassName="flex items-center justify-end mt-5 text-gray-500"
              pageClassName="mx-1 px-3 py-1 rounded"
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-4 h-4 text-center" />}
              nextLabel={<ChevronRight className="w-4 h-4" />}
              previousClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
              nextClassName="mx-1 px-3 py-1 font-bold text-primary text-18"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Roles;