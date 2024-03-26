// import dependencies
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../Client";

const Individual = () => {
  const [clothingData, setClothingData] = useState({});

  let { id, Category } = useParams();

  const fetchClothingItem = async () => {
    let { data, error } = await supabase
      .from(Category)
      .select("*")
      .eq("id", id);
    setClothingData(data[0]);
  };

  useEffect(() => {
    fetchClothingItem();
  }, []);

  return (
    <div>
      {clothingData.productName} {clothingData.price}
    </div>
  );
};

export default Individual;
