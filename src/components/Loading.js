import { useContext } from "react";
import { ClockLoader } from "react-spinners";
import { AppDetails } from "../utils/AppContext";

export default function Loading() {
  const { loading } = useContext(AppDetails);

  return (
    <>
      {loading && (
        <div className="loading-container">
          <ClockLoader size={50} color="#e2e2e2" />
        </div>
      )}
    </>
  );
}
