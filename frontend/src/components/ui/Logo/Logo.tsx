import React from 'react';

import './Logo.scss';

type LogoProps = {
  width?: string;
  height?: string;
}

const Logo = ({height = '49.796', width = '50.2'}: LogoProps) => (
  <svg width={width} height={height} viewBox="0 0 50.2 49.796"><g transform="translate(-278 -30)"><g transform="translate(278 30)">
    <path d="M7.35,27.249h0a14.585,14.585,0,1,1,15-25.01A25.572,25.572,0,0,0,7.292,25.52c0,.573.019,1.154.058,1.726Z" 
    transform="matrix(-0.966, -0.259, 0.259, -0.966, 43.148, 42.045)" fill="#8d9ad6"/>
    <path d="M14.583,27.249A14.584,14.584,0,0,1,7.35,0c-.038.562-.058,1.142-.058,1.727A25.575,25.575,0,0,0,22.348,25.012,14.54,14.54,0,0,1,14.583,27.249Z" 
    transform="matrix(0.966, -0.259, 0.259, 0.966, 13.885, 23.476)" fill="#7789e3"/>
    <path d="M7.35,27.249h0a14.585,14.585,0,1,1,15-25.01A25.572,25.572,0,0,0,7.292,25.52c0,.573.019,1.154.058,1.726Z" 
    transform="matrix(-0.035, 0.999, -0.999, -0.035, 28.012, 15.301)" fill="#b6bee5"/>
    <path d="M0,14.583A14.585,14.585,0,0,1,23.323,2.908c.007.245.011.49.011.737A25.529,25.529,0,0,1,7.428,27.293,14.579,14.579,0,0,1,0,14.583Z" 
    transform="translate(17.415 12.369)" fill="#97a2d8"/>
    <path d="M14.583,27.249A14.584,14.584,0,0,1,7.35,0c-.038.562-.058,1.142-.058,1.727A25.575,25.575,0,0,0,22.348,25.012,14.54,14.54,0,0,1,14.583,27.249Z" 
    transform="matrix(-0.966, -0.259, 0.259, -0.966, 43.148, 32.104)" 
    fill="#b9c2f1"/><circle cx="4.375" cy="4.375" r="4.375" transform="translate(23.248 21.119)" fill="#97a2d8"/></g></g>
  </svg>
);

const LogoWithName = () => (
  <div className='logo--name row-c'>
    <Logo />
    <span className='logo__name'>
      Budget Bot
    </span>
  </div>
)

export {
  Logo, 
  LogoWithName
}