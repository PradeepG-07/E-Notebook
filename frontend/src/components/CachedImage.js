import React, { useEffect, useState } from 'react';

const CachedImage = ({ src, alt }) => {
    const [cachedSrc, setCachedSrc] = useState(null);

    useEffect(() => {
        var img = new Image();
        img.onload = img.onerror = img.onabort = function () { }
        img.src = src;
        setCachedSrc(src)
    },[src])

    return <img src={cachedSrc || src} alt={alt} />;
};

export default CachedImage;
