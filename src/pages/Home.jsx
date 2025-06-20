import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import LostItemSection from "../components/LostItem/LostItemSection";
import SuccessStats from "../components/SuccessStats/SuccessStats";
import UserReviews from "../components/UserReviews/UserReviews";
// src/pages/Home.jsx
const Home = () => {
  return (
    <div>
      <Banner />
      <LostItemSection />
      <SuccessStats />
      <UserReviews />
      <Footer />
    </div>
  );
};

export default Home;
