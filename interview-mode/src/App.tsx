import NestedCheckbox from "./components/NestedCheckbox/NestedCheckbox"
import "./App.css"
import { useState } from "react"
import FileExplorerExample from "../../machine-coding/FileExplorer/FileExplorerExample"

function App() {
    const inputConfig = {
        id: 1,
        label: "all bikes",
        checked: false,
        children: [
            {
                id: 2,
                label: "yamaha",
                checked: false,
                children: [

                ]

            },
            {
                id: 3,
                label: "royal enfield",
                checked: false,
                children: [
                    {
                        id: 4,
                        label: "classic 350",
                        checked: false,
                        children: [

                        ]

                    },
                    {
                        id: 5,
                        label: "guerilla 450",
                        checked: false,
                        children: [

                        ]

                    }
                ]

            }
        ]

    }

    const [config, setConfig] = useState(inputConfig);

    return (
        <>
            {/* promotion */}
            <h1>
                Nested Checkbox by Codewithkai
            </h1>


            {/* core code */}
            <div>
                {/* <NestedCheckbox
                    config={config}
                    onUpdate={setConfig}
                /> */}
                <FileExplorerExample />
            </div>
        </>
    )
}

export default App
