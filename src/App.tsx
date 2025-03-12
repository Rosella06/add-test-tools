// import TitleBar from "./NavBar";
// import QueueList from "./QueueList/QueueList";
// import { Container } from "react-bootstrap";
// import ShelfList from "./ShelfList/ShelfList";


// const App: React.FC = () => {
//   return (
//     <div className="p-4">
//       <> 
//       <TitleBar />
//       <Container fluid>
//       <QueueList />
//         {/* <ShelfList /> */}
//       </Container>
//       </>
      
//     </div>
//   );
// };

// export default App;
import QueueList from "./QueueList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <QueueList />
    </div>
  );
};

export default App;
