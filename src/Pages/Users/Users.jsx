import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { RxCopy } from "react-icons/rx";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../ApiServices/users";
import DeleteUser from "./DeleteUser";
import SearchBar from "../../Components/Search Bar/SearchBar";

function Users() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [itemsPerPage] = useState(5);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Phone number copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getUsers();
        setUserData(response.data || response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userData.length > 0) {
      const filtered = userData.filter((user) => {
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        return (
          user.email?.toLowerCase().includes(searchTerm) ||
          user.name?.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredUser(filtered);
    }
  }, [searchQuery, userData]);

  const pageCount = Math.ceil(filteredUser.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentUsers = filteredUser.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteUser = (userId) => {
    setUserData((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    if (currentUsers.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-[89vh] pt-3">
      <Helmet>
        <title>Users | Vertex</title>
      </Helmet>
      <div className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13">Menu / Users</p>
        <h3 className="font-bold mt-2 text-16">Users</h3>
      </div>
      <div className="bg-white rounded-md p-5 mt-3 mx-5">
        <SearchBar
          onclick={() => navigate("/Dashboard/AddUser")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={"Add New User"}
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
        ) : filteredUser.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No users match your search." : "No users found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-16 border-t border-b text-left cursor-pointer">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all users"
                        />
                        Name
                      </p>
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Phone
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      User Role
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Added Date
                    </th>
                    <th className="px-3 py-3 text-left border w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td 
                        className="px-3 py-3 border-t border-r text-gray-600 text-14" 
                        onClick={() => navigate(`/Dashboard/Users/${user.id}`)}
                      >
                        <p className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select user"
                          />
                          {user.name || "N/A"}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        <div className="flex items-center gap-2">
                          {user.phone || "N/A"}
                          {user.phone && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(user.phone);
                              }}
                              className="text-primary"
                              title="Copy phone number"
                              aria-label="Copy phone number"
                            >
                              <RxCopy size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        {user.role?.name || "N/A"}
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        {new Date(user.created_at).toLocaleDateString() || "N/A"}
                      </td>
                      <td className="px-3 py-3 border-t border-r">
                        <div className="flex justify-center items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/Dashboard/Users/EditUserInfo/${user.id}`, {
                                state: { user },
                              });
                            }}
                            className="text-primary hover:text-primary-dark"
                          >
                            <img
                              src="/assets/svgs/editIcon.svg"
                              alt="Edit"
                              className="w-6 h-6"
                            />
                          </button>
                          <DeleteUser
                            id={user.id}
                            onDelete={handleDeleteUser}
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
              containerClassName="flex items-center justify-end mt-5 "
              pageClassName="px-3 py-1 text-14 text-gray-400 rounded "
              activeClassName="bg-customOrange-lightOrange text-primary"
              previousLabel={<ChevronLeft className="w-5 h-5 text-primary" />}
              nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
              previousClassName={`px-3 py-1 rounded ${
                currentPage === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              nextClassName={`px-3 py-1 rounded ${
                currentPage === pageCount - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Users;