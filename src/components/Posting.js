import Logo from '../assets/mock_company_logo.jpeg';

const Posting = (jobPosting) => {

    return(
        <div className='posting'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" className='star'>
                <rect width="24" height="24" fill="white"/>
                <path d="M11.5245 4.46353C11.6741 4.00287 12.3259 4.00287 12.4755 4.46353L13.9084 8.87336C13.9753 9.07937 14.1673 9.21885 14.3839 9.21885H19.0207C19.505 9.21885 19.7064 9.83866 19.3146 10.1234L15.5633 12.8488C15.3881 12.9761 15.3148 13.2018 15.3817 13.4078L16.8145 17.8176C16.9642 18.2783 16.437 18.6613 16.0451 18.3766L12.2939 15.6512C12.1186 15.5239 11.8814 15.5239 11.7061 15.6512L7.95488 18.3766C7.56303 18.6613 7.03578 18.2783 7.18546 17.8176L8.6183 13.4078C8.68524 13.2018 8.61191 12.9761 8.43667 12.8488L4.68544 10.1234C4.29358 9.83866 4.49497 9.21885 4.97933 9.21885H9.6161C9.83272 9.21885 10.0247 9.07937 10.0916 8.87336L11.5245 4.46353Z" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <img src={Logo} alt="Company Logo"/>
            <div className='major-info'>
                <h3 className='posting-title'>Posting 1</h3>
                <h5 className='posting-company'>Company A</h5>
            </div>
            <div className='minor-info'>
                <h5 className='posting-location'>Montreal, Canada</h5>
                <div className='minor-info row-2'>
                    <h5 className='posting-contract'>Part Time | </h5>
                    <h5 className='posting-term'>Winter 2025</h5>
                </div>
            </div>
            <div>
                <i className="bi bi-trash"></i>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash"  style={{ cursor: 'pointer' }}  viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </div>
        </div>
    )};

export default Posting;