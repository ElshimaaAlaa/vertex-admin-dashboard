import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../Components/Search Bar/SearchBar";
import { getPlans } from "../../../ApiServices/Plan";
import DeletePlan from "./DeletePlans";

function Plans() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [filteredPlan, setFilteredPlan] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await getPlans();
        setPlanData(response.data || response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (planData.length > 0) {
      const filtered = planData.filter((plan) => {
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        return (
          plan.name?.toLowerCase().includes(searchTerm) ||
          plan.sale_price?.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredPlan(filtered);
    }
  }, [searchQuery, planData]);

  const pageCount = Math.ceil(filteredPlan.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPlan = filteredPlan.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeletePlan = (planId) => {
    setPlanData((prevUser) => prevUser.filter((plan) => plan.id !== planId));
    if (currentPlan.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const togglePublishedStatus = async (planId) => {
    try {
      setPlanData(prev => prev.map(plan => 
        plan.id === planId ? {...plan, published: !plan.published} : plan
      ));
      
    } catch (error) {
      console.error("Failed to update published status:", error);
      setPlanData(prev => prev.map(plan => 
        plan.id === planId ? {...plan, published: !plan.published} : plan
      ));
    }
  };

  const togglePopularStatus = async (planId) => {
    try {
      setPlanData(prev => prev.map(plan => 
        plan.id === planId ? {...plan, is_most_popular: !plan.is_most_popular} : plan
      ));
    } catch (error) {
      console.error("Failed to update popular status:", error);
      setPlanData(prev => prev.map(plan => 
        plan.id === planId ? {...plan, is_most_popular: !plan.is_most_popular} : plan
      ));
    }
  };

  return (
    <div className="h-[89vh] pt-3">
      <Helmet>
        <title>Plans | Vertex</title>
      </Helmet>
      <div className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13">Subscriptions / Plans</p>
        <h3 className="font-bold mt-2 text-16">Plans</h3>
      </div>
      <div className="bg-white rounded-md p-5 mt-3 mx-5">
        <SearchBar
          onclick={() => navigate("/Dashboard/AddPlan")}
          value={searchQuery}
          onchange={(e) => setSearchQuery(e.target.value)}
          text={"Add New Plan"}
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
        ) : filteredPlan.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No plans match your search." : "No plans found."}
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
                        Title
                      </p>
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Duration
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Sale Price
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Duration Price
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Is Most Popular Plan?
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Publish
                    </th>
                    <th className="px-3 py-3 text-left border w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPlan.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50">
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        <p className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select user"
                          />
                          {plan.name || "N/A"}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        <p className="bg-customOrange-lightOrange text-primary rounded-md py-1 ps-2  w-28">
                          {plan.duration || 0}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        {plan.sale_price || 0}
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14 w-180">
                        {plan.duration_price || "unavailable"}
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14 w-300">
                        <button
                          onClick={() => togglePopularStatus(plan.id)}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                            plan.is_most_popular ? 'bg-primary' : 'bg-gray-300'
                          }`}
                          aria-label={`Toggle popular status for ${plan.name}`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                              plan.is_most_popular ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        <button
                          onClick={() => togglePublishedStatus(plan.id)}
                          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 focus:outline-none ${
                            plan.published ? 'bg-primary' : 'bg-gray-300'
                          }`}
                          aria-label={`Toggle publish status for ${plan.name}`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                              plan.published ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-3 py-3 border-t border-r">
                        <div className="flex justify-center items-center gap-1">
                          <DeletePlan
                            id={plan.id}
                            onDelete={handleDeletePlan}
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

export default Plans;