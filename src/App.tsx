import Hero from "./components/Hero";
import Sessions from "./components/Sessions";
import DemoSubmission from "./components/DemoSubmission";
import MailingList from "./components/MailingList";
import Archive from "./components/Archive";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Sessions />
      <DemoSubmission />
      <MailingList />
      <Archive />
      <Footer />
    </div>
  );
}

export default App;
