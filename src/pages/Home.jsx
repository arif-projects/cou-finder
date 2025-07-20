import Banner from "../components/Banner/Banner";
import BlogTipsSection from "../components/BlogTipsSection/BlogTipsSection";
import CampusMapSection from "../components/CampusMapSection/CampusMapSection";
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
      <BlogTipsSection />
      <CampusMapSection />
      <Footer />
    </div>
  );
};

export default Home;
