import '../styles/App.css';

export default function MyFooter(){

    let date = new Date();
    let year = date.getFullYear();
    
    return(
        <section className='footer-container'>
            <p className='footer-content'>{`Made by N.W.P in ~ ${year}`}</p> 
        </section>
            
    )

}