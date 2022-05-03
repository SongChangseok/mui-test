import React, { Suspense } from "react";
import ErrorBoundary from "./common/component/ErrorBoundary";
import { BackdropLoading } from "./common/component/Loading";
import MuiRouter from "./MuiRouter";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<BackdropLoading open={true} />}>
        <MuiRouter />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
