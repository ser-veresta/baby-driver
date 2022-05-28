import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { timeStampKey } from "../types/appTypes";

interface Props {
  city: timeStampKey | undefined;
}
const Toastcomp: React.FC<Props> = ({ city }) => {
  if (!city) return <h1>No Data</h1>;
  return (
    <div>
      <em>{city.shop}</em>
      <br />
      <p>Description:{city.description}</p>
      <br />
      <p>
        <FontAwesomeIcon className="text-amber-500" icon={faStar} />
        {city.rating}
      </p>
    </div>
  );
};

export default Toastcomp;
