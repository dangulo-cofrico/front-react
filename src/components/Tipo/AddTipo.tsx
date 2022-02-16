import React, { useState, ChangeEvent } from "react";
import TipoService from "../services/TipoService";
import ITutorialData from '../types/Tutorial';
const AddTutorial: React.FC = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [tutorial, setTutorial] = useState<ITutorialData>(initialTutorialState);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });
  };
  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };
    TipoService.create(data)
      .then((response: any) => {
        setTutorial({
          id: response.data.id,
          
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  const newTutorial = () => {
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };
  return ( ... );
};
export default AddTutorial;