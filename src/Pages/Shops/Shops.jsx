import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Search } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPaginate from "react-paginate";
import { getShops } from "../../ApiServices/Shop";
import DeleteShop from "./DeleteShops";

function Shops() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shopData, setShopData] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  useEffect(() => {
    const fetchShops = async () => {
      setIsLoading(true);
      try {
        const response = await getShops();
        setShopData(response.data || response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsLoading(false);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    if (shopData.length > 0) {
      const filtered = shopData.filter((shop) => {
        if (!searchQuery) return true;
        const searchTerm = searchQuery.toLowerCase();
        return (
          (shop.store_name?.toLowerCase().includes(searchTerm) ||
          shop.name?.toLowerCase().includes(searchTerm))
        );
      });
      setFilteredShops(filtered);
    }
  }, [searchQuery, shopData]);

  const pageCount = Math.ceil(filteredShops.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentShops = filteredShops.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleDeleteShop = (shopId) => {
    setShopData(prevShops => prevShops.filter(shop => shop.id !== shopId));
    if (currentShops.length === 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-[89vh] pt-5">
      <Helmet>
        <title>Shops | Vertex</title>
      </Helmet>
      <div className="bg-white p-5 mx-5 rounded-md">
        <p className="text-gray-400 text-13">Menu / Shops</p>
        <h3 className="font-bold mt-2 text-16">Shops</h3>
      </div>
      <div className="bg-white rounded-md p-3 mt-3 mx-5">
        <div className="relative w-full mt-3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5"
            color="#E0A75E"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-10 py-4 bg-muted/50 rounded-md text-sm focus:outline-none border-2 border-gray-200 bg-gray-50 placeholder:text-15 focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        {error ? (
          <div className="text-red-500 text-center mt-10">
            Failed to fetch data. Please try again.
          </div>
        ) : isLoading ? (
          <div className="text-gray-400 text-center mt-10">
            <ClipLoader color="#E0A75E" />
          </div>
        ) : filteredShops.length === 0 ? (
          <div className="text-gray-400 text-center mt-10">
            {searchQuery ? "No shops match your search." : "No shops found."}
          </div>
        ) : (
          <>
            <div className="border border-gray-200 rounded-lg mt-4 overflow-hidden">
              <table className="bg-white min-w-full table">
                <thead>
                  <tr>
                    <th className="px-3 py-3 text-16 border-t text-left">
                      <p className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4"
                          aria-label="Select all shops"
                        />
                        Shop Name
                      </p>
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Owner
                    </th>
                    <th className="px-3 py-3 text-16 text-left border">
                      Total Product
                    </th>
                    <th className="px-3 py-3 text-left border w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentShops.map((shop) => (
                    <tr
                      key={shop.id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-3 py-3 border-t border-r  text-gray-600 text-14">
                        <p className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4"
                            aria-label="Select shop"
                          />
                          {shop.store_name || "N/A"}
                        </p>
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        {shop.name || "N/A"}
                      </td>
                      <td className="px-3 py-3 border-t border-r text-gray-600 text-14">
                        {shop.product_count || "0"}
                      </td>
                      <td className="px-3 py-3 border-t border-r">
                        <DeleteShop id={shop.id} onDelete={() => handleDeleteShop(shop.id)} />
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
                pageClassName="px-3 py-1 text-14 text-gray-400 rounded-md"
                activeClassName="bg-customOrange-lightOrange text-primary"
                previousLabel={<ChevronLeft className="w-5 h-5 text-primary" />}
                nextLabel={<ChevronRight className="w-5 h-5 text-primary" />}
                previousClassName={`px-3 py-1 rounded ${
                  currentPage === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
                nextClassName={`px-3 py-1 rounded ${
                  currentPage === pageCount - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
                disabledClassName="opacity-50 cursor-not-allowed"
              />
          </>
        )}
      </div>
    </div>
  );
}
export default Shops;