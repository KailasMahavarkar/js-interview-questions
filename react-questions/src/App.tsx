import './App.css'
// import { FormWrapper } from './DynamicFormWithContext/DynamicFormContext';
import DynamicFormWithReducer from './DynamicFormWithReducer/DynamicFormWithReducer';

function App() {

    return (
        <>
            <DynamicFormWithReducer
                config={[
                    {
                        type: 'text',
                        key: 'name',
                        label: 'Name'
                    },
                    {
                        type: 'select',
                        key: 'city',
                        label: 'City',
                        children: [
                            { label: 'New York', value: 'NY' },
                            { label: 'Los Angeles', value: 'LA' },
                            { label: 'Chicago', value: 'CH' }
                        ]
                    },
                    {
                        type: 'select',
                        key: 'country',
                        label: 'Country',
                        children: [
                            { label: 'USA', value: 'USA' },
                            { label: 'Canada', value: 'CA' },
                            { label: 'India', value: 'IN' }
                        ]
                    },
                    {
                        type: 'radio',
                        key: 'occupation',
                        label: 'Occupation',
                        children: [
                            { label: 'Employed', value: 'employed' },
                            { label: 'Student', value: 'student' },
                            { label: 'Business', value: 'business' }
                        ],
                        multiple: true
                    }
                ]}

                onSubmit={(formData) => {
                    console.log(formData)
                }}
            />
        </>
    )
}

export default App
