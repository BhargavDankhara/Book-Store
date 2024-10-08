import Navbar from "../../components/Navbar";

const HomeScreen = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to the Book Store
        </h1>
      </div>
    </>
  );
};

export default HomeScreen;
