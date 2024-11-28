import './App.css'
import useCustomMemo from './questions/useCustomMemo'
   
function App() {
    const memo = useCustomMemo(() => {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
            sum += i;
        }
        return sum;
    })


    return (
        <>
            <div>
                {memo()}
            </div>
        </>
    )
}

export default App
