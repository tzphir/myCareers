import Logo from '../assets/mock_company_logo.jpeg';
import React, { useState } from 'react';

const FullPostingDisplay = ( {  selectedPost } ) => {

    //console.log(jobPosting);
    return(<div>
        <h2>{selectedPost.title}</h2>
    </div>);
}

export default FullPostingDisplay;