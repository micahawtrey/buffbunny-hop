import Nav from "./Nav"
export default function ErrorElement() {
    return (
        <>
            <Nav />
            <div className='row'>
                <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark' style={{maxWidth: 275, height: "100vh"}}>
                </div>
                <div className='col text-center'>
                    <h1>Page not found!</h1>
                    <h3>Sorry, we couldn't find that page. Try going back to home!</h3>
                    <img src="/BUFFBunny_Hop_Logo-nobg.png" alt="A muscular bunny flexing above the company name" className='me-3' />
                </div>
                <div className='d-flex flex-column flex-shrink-0 p-3 text-white bg-dark' style={{maxWidth: 275, height: "100vh"}}>
                </div>
            </div>
        </>
    )
}
