import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Edit = () => {
    const [question, setQuestion] = useState("")
    const [searchParam] = useSearchParams();
    
    return (
        <div>
            123456

            {(question || []).map((item, index) => {
            return (
              <div className="flex mb-4 items-center" key={index}>
                <p className="w-full text-grey-darkest">
                    Add another component to Tailwind Components
                </p>
              </div>
            );
          })}
        </div>
    );
};

export default Edit;