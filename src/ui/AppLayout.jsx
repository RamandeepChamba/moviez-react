import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import styles from "./AppLayout.module.css";
import Footer from "./Footer";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {isLoading && <Loader />}
        {!isLoading && <Outlet />}
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
