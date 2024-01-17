import { Link } from "../ui/link";
import { Project } from "../ui/project";

export default function Page() {
  return (
    <div className="flex flex-grow h-full w-full bg-gray-100 flex-wrap p-4">
      <div className="flex flex-col w-full md:w-1/2 items-center">
        <Project
          title="selenider"
          href="https://ashbythorpe.github.io/selenider/"
        >
          An R package to facilitate high level browser automation, using
          Selenium and the Chrome Devtools Protocol.
        </Project>
        <Project
          title="financialDataAnalysis"
          href="https://github.com/ashbythorpe/financialDataAnalysis"
        >
          A website made using Shiny, to analyze, forecast and visualise
          financial data.
        </Project>
        <Project
          title="nestedmodels"
          href="https://ashbythorpe.github.io/nestedmodels/"
        >
          An R package, enhancing the tidymodels framework to support the
          modelling of nested data.
        </Project>
      </div>
      <div className="flex flex-col w-full md:w-1/2 items-center">
        <Project
          title="ashbythorpe.com"
          href="https://github.com/ashbythorpe/ashbythorpe.com"
        >
          This website! Made using React and Next.js. Includes a fully
          functional login and comment system.
        </Project>
        <Project
          title="selenium-r"
          href="https://ashbythorpe.github.io/selenium-r/"
        >
          Interface to Selenium from R.
        </Project>
      </div>
    </div>
  );
}
