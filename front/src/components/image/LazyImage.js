import { useEffect, useRef } from 'react'

const LazyImage = ({ webpSrc, imageSrc, alt, className, width, height, isSkeleton = false }) => {

    const imgRef = useRef(null) 

    useEffect(() => {
        const options = {}
        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {

                    const target = entry.target;
                    const previousSibling = target.previousSibling;

                    // console.log('is inter', entry.target.dataset.src, previousSibling);
                    
                    target.src = target.dataset.src;
                    previousSibling.srcset = previousSibling.dataset.srcset;

                    observer.unobserve(target)
                }
            })
        }
        const observer = new IntersectionObserver(callback, options)
        observer.observe(imgRef.current)

    }, [])

    return (
        <picture>
            <source data-srcset={webpSrc} type="image/webp" />
            <img data-src={imageSrc} ref={imgRef} src={isSkeleton ? require('../../assets/images/loading.gif') : ""} alt={alt} className={className} width={width} height={height}/>
        </picture>
    )
    
}

export default LazyImage;