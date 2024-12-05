import React from 'react';
import Image from 'next/image'; // Import the Image component from Next.js
function RecentlyPosted() {
  return ( 
    <>
        <div className="between-bannershead-wrap pt-5" style={{ width: "100%"}}>
            <Image src="/images/Nextpet-imgs/recently-posted-imgs/side1.png" alt="img" width={240} height={184} />
              <h1 style={{ marginLeft:'-200px'}}>Recently Posted</h1>

            <div style={{ position: 'relative',}}>
              <Image src="/images/Nextpet-imgs/recently-posted-imgs/side2.png" alt="img" style={{ position:'absolute', bottom:'10px', right: '0px' }} width={183} height={223}/>
            </div>
            
        </div>

    </>
  );
}
export default RecentlyPosted;
