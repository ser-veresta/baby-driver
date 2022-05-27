import { faStar } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  city: {
    shop: string;
    description: string;
    rating: string;
  };
}
const Toastcomp: React.FC<Props> = ({ city }) => {
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
