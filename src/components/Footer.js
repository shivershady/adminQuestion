import React from 'react';

function Footer(props) {
    return (
        <div className="container mx-auto border-t-2 border-black mt-8 py-4">
            <div className="flex justify-between">
                <div className="grid grid-cols-2 w-1/3 gap-8">
                    <div>
                        <div className="flex space-x-2">
                            <b>Phone</b>
                            <p>+845651653156</p>
                        </div>
                        <div className="flex space-x-2">
                            <b>Phone</b>
                            <p>+845651653156</p>
                        </div>
                        <div className="flex space-x-2">
                            <b>Phone</b>
                            <p>+845651653156</p>
                        </div>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae debitis dolorem eligendi expedita fugiat quibusdam quis similique unde vitae voluptatum!</p>
                    </div>
                </div>
                <div className="flex justify-between w-1/3">
                    <div className="font-bold">lorem</div>
                    <div className="font-bold">lorem</div>
                    <div>lorem</div>
                </div>
            </div>
        </div>
    );
}

export default Footer;