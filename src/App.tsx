import Hero from "./components/Hero";
import Sessions from "./components/Sessions";
import DemoSubmission from "./components/DemoSubmission";
import MailingList from "./components/MailingList";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Sessions />
      <DemoSubmission />
      <MailingList />
      <Footer />
    </div>
  );
}

export default App;
