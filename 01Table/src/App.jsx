import Table from "./components/Table"
import { lazy, Suspense } from "react"

const LazyTable = lazy(() => import('./components/Table'))


function App() {

  return (
    <>
      <Suspense fallback={"Lazy Loading.........."}>
        <LazyTable />
      </Suspense>
    </>
  )
}

export default App
