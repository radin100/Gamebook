import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useValues = (defaultVals) => {

    const [values, setValues] = useState(defaultVals);
    
    const onChange = (e) => {
            const key = e.target.name;
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            setValues(state => ({ ...state,  [key]: value}));
    }
    
    const navigation = useNavigate();

    return {
        values,
        onChange,
        navigation,
        setValues
    }
}

export default useValues;