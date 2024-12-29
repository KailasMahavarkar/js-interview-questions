import { createContext, useReducer } from "react";
import { formReducer } from "../reducer/formReducer";
import { FormContextType, FormProviderProps } from "../types";


const FormContext = createContext<FormContextType>({
    state: {},
    dispatch: () => { }
})

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(formReducer, {});

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};

export default FormContext