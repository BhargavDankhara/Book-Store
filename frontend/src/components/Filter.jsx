import PropTypes from "prop-types";

const Filter = ({ onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-5">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Filter Books</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="genre" className="block text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            name="genre"
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Adventure">Adventure</option>
            <option value="Romance">Romance</option>
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="block text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label htmlFor="availableCopies" className="block text-gray-700">
            Available Copies
          </label>
          <select
            id="availableCopies"
            name="availableCopies"
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
