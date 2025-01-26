import "./App.css";
// import { Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Artist from "@/views/Artist";
// import EditArtist from "./views/EditArtist";
import { ArtistProvider } from "./context/Artist";

function App() {
  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    }
  );
  return (
    <QueryClientProvider client={queryClient}>
      <ArtistProvider>
        <Artist />
        {/* <Routes>
          <Route path="/" element={<Artist />} />
          <Route path="/:artistId" element={<Artist />} />
          <Route path="/edit/artist/:id" element={<EditArtist />} />
        </Routes> */}
      </ArtistProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

// export default function App() {
//   return <h1>Patata</h1>
// }
