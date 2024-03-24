import React from "react";
import { useParams } from "react-router-dom";

const FlatInfoPage: React.FC = () => {
  const { flatId } = useParams();
  const [flatInfo, setFlatInfo] = React.useState<any>();

  React.useEffect(() => {
    const fetchData = async () => {
      return await fetch(`api/flat/${flatId}`).then((data) => data.json());
    };
    const response = fetchData().then((data) => {
      setFlatInfo(data[0]);
    });
  }, [flatId]);

  return <div>{flatInfo?.rentObject?.title}</div>;
};

export default FlatInfoPage;
