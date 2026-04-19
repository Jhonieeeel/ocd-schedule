import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/OCD.svg"
            {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
        />
    );
}
