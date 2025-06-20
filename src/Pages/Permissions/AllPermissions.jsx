import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../Components/Search Bar/SearchBar";
import { getPermissions } from "../../ApiServices/Permssions";
import DeleteRole from "./DeleteRole";
function Permisions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [roleData, setRoleData] = useState([]);
  const [filteredRole, setFilteredRole] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchRole = async () => {
      setIsLoading(true);
      try {
        const response = await getPermissions();
        setRoleData(response.data || response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    if (roleData.length > 0) {
      const filtered = roleData.filter((role) => {
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        return role.name?.toLowerCase().includes(searchTerm);
      });
      setFilteredRole(filtered);
    }
  }, [searchQuery, roleData]);

  const pageCount = Math.ceil(filteredRole.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentRole = filteredRole.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteRole = (planId) => {
    setRoleData((prevUser) => prevUser.filter((plan) => plan.id !== planId));
    if (currentRole.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const togglePublishedStatus = async (planId) => {
    try {
      setRoleData((prev) =>
        prev.map((plan) =>
          plan.id === planId ? { ...plan, published: !plan.published } : plan
        )
      );
    } catch (error) {
      console.error("Failed to update published status:", error);
      setRoleData((prev) =>
        prev.map((plan) =>
          plan.id === planId ? { ...plan, published: !plan.published } : plan
        )
      );
    }
  };

  const togglePopularStatus = async (planId) => {
    try {
      setRoleData((prev) =>
        prev.map((plan) =>
          plan.id === planId
            ? { ...plan, is_most_popular: !plan.is_most_popular }
            : plan
        )
      );
    } catch (error) {
      console.error("Failed to update popular status:", error);
      setRoleData((prev) =>
        prev.map((plan) =>
          plan.id === planId
            ? { ...plan, is_most_popular: !plan.is_most_popular }
            : plan
        )
      );
    }
  };

  return (
    <div className="h-[89vh] pt-3">
      <Helmet>
        <title>Plans | Vertex</title>
      </Helmet>
      <div className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13">Permissions / Roles</p>
        <h3 className="font-bold mt-2 text-16">Roles</h3>
      </div>
      <div className="bg-white rounded-md p-5 mt-3 mx-5">
        <SearchBar
          onclick={() => navigate("/Dashboard/AddRole")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={"Add New Role"}
          icon={
            <Plus
              className="text-white rounded-full border-2 border-white font-bold"
              size={20}
            />
          }
        />
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredRole.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No Role match your search." : "No Role found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-16 border-t border-b text-left">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all shops"
                        />
                        User Role
                      </p>
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Can Access Admin Panel
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Publish
                    </th>
                    <th className="px-3 py-3 text-left border w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRole.map((role) => (
                    <tr key={role.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        <p className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select user"
                          />
                          {role.name || "unavailable"}
                        </p>
                      </td>
                      <td className="px-2 py-2 border-t border-r text-gray-600 text-14 w-400">
                        <button
                          onClick={() => togglePopularStatus(role.id)}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                            role.can_access_panel ? "bg-primary" : "bg-gray-300"
                          }`}
                          aria-label={`Toggle popular status for ${role.name}`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                              role.can_access_panel
                                ? "translate-x-6"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-2 py-2 border-t border-r text-gray-600 text-14 w-400">
                        <button
                          onClick={() => togglePublishedStatus(role.id)}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                            role.publish ? "bg-primary" : "bg-gray-300"
                          }`}
                          aria-label={`Toggle publish status for ${role.name}`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                              role.publish ? "translate-x-6" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-3 py-3 border-t border-r">
                        <div className="flex justify-center items-center gap-1">
                          <DeleteRole
                            id={role.id}
                            onDelete={handleDeleteRole}
                          />
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
              containerClassName="flex items-center justify-end mt-5 space-x-1"
              pageClassName="px-3 py-1 text-14 text-gray-400 rounded "
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-5 h-5 text-primary" />}
              nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
              previousClassName={`px-3 py-1 rounded ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              nextClassName={`px-3 py-1 rounded ${
                currentPage === pageCount - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </>
        )}
      </div>
    </div>
  );
}
export default Permisions;